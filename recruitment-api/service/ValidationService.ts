// deno-lint-ignore-file no-explicit-any
import { Service } from "https://deno.land/x/knight@2.2.1/mod.ts";
import LoggingService from "./LoggingService.ts";

export type ValidationRule =
  & (
    | { type: "string" }
    | { type: "symbol" }
    | { type: "number" }
    | { type: "bigint" }
    | { type: "boolean" }
    | { type: "function" }
    | { type: "array"; elements: ValidationRule }
    | { type: "object"; schema: ValidationSchema }
    | { type: "enum"; values: string[] }
    | { type: "null" }
    | { type: "undefined" }
    | { type: "any" }
  )
  & { required?: boolean };
export type ValidationSchema = {
  [key: string]: ValidationRule;
};
export type ValidationResult =
  & ({
    isValid: true;
  } | {
    isValid: false;
    errors: string[];
  })
  & { casted?: any };

export default Service(
  class ValidationService {
    private log = LoggingService.instance().logger;

    private cast(data: any, rule: ValidationRule): any {
      switch (rule.type) {
        case "string":
          if (typeof data === "object") {
            return JSON.stringify(data);
          }
          return data.toString();
        case "symbol":
          if (typeof data === "symbol") {
            return data;
          } else if (typeof data === "string") {
            return Symbol(data);
          }
          throw new Error(`Cannot cast ${typeof data} to symbol`);
        case "number":
          if (typeof data === "number") {
            return data;
          } else if (typeof data === "string" && !isNaN(Number(data))) {
            return Number(data);
          }
          throw new Error(`Cannot cast ${typeof data} to number`);
        case "bigint":
          if (typeof data === "bigint") {
            return data;
          } else if (typeof data === "string") {
            return BigInt(data);
          }
          throw new Error(`Cannot cast ${typeof data} to bigint`);
        case "boolean":
          if (typeof data === "boolean") {
            return data;
          } else if (typeof data === "string") {
            return data === "true";
          }
          throw new Error(`Cannot cast ${typeof data} to boolean`);
        case "function":
          if (typeof data === "function") {
            return data;
          }
          throw new Error(`Cannot cast ${typeof data} to function`);
        case "array":
          if (Array.isArray(data)) {
            return data.map((value) => this.cast(value, rule.elements));
          }
          throw new Error(`Cannot cast ${typeof data} to array`);
        case "object":
          if (typeof data === "object") {
            return data;
          }
          throw new Error(`Cannot cast ${typeof data} to object`);
        case "enum":
          if (rule.values.includes(data)) {
            return data;
          }
          throw new Error(`Cannot cast ${typeof data} to enum`);
        case "null":
          return null;
        case "undefined":
          return undefined;
        case "any":
          return data;
        default:
          this.log.error(
            `Invalid cast data to rule type ${(rule as any).type} for ${
              JSON.stringify(data)
            } (${typeof data})`,
          );
          return { isValid: false, errors: ["Invalid cast"] };
      }
    }

    public validateRule(
      data: any,
      rule: ValidationRule,
      tryCast = false,
    ): ValidationResult {
      if (rule.required && rule.type !== "undefined" && data === undefined) {
        return {
          isValid: false,
          errors: ["Required field is missing"],
        };
      }
	  // Try to cast the data to the rule type
      const castedValue = (() => {
        if (tryCast) {
          try {
            return this.cast(data, rule);
          } catch (castError) {
			this.log.warn(`Failed to cast ${JSON.stringify(data)} to ${rule.type}`, castError);
		  }
        }
        return data;
      })();
	  const wasCasted = castedValue !== data;
      switch (rule.type) {
        case "string":
          if (typeof castedValue !== "string") {
            return { isValid: false, errors: ["must be a string"] };
          }
          break;
        case "symbol":
          if (typeof castedValue !== "symbol") {
            return { isValid: false, errors: ["must be a symbol"] };
          }
          break;
        case "number":
          if (typeof castedValue !== "number") {
            return { isValid: false, errors: ["must be a number"] };
          }
          break;
        case "bigint":
          if (typeof castedValue !== "bigint") {
            return { isValid: false, errors: ["must be a bigint"] };
          }
          break;
        case "boolean":
          if (typeof castedValue !== "boolean") {
            return { isValid: false, errors: ["must be a boolean"] };
          }
          break;
        case "array": {
          if (typeof castedValue !== "object" || !Array.isArray(castedValue)) {
            return { isValid: false, errors: ["must be an array"] };
          } else if (!rule.elements) {
            return {
              isValid: false,
              errors: ["Missing validation rule for array elements"],
            };
          }
          const errors: string[] = [];
          for (let i = 0; i < castedValue.length; i++) {
            const result = this.validateRule(castedValue[i], rule.elements, tryCast);
            if (!result.isValid) {
              errors.push(`element ${i}: ${result.errors.join(", ")}`);
            }
          }
          return { isValid: errors.length === 0, errors, casted: wasCasted ? castedValue : undefined };
        }
        case "object":
          if (typeof castedValue !== "object" || Array.isArray(castedValue)) {
            return { isValid: false, errors: ["must be an object"] };
          } else if (!rule.schema) {
            return { isValid: false, errors: ["Missing schema"] };
          }
          // const errors: string[] = [];
          // for (const key of Object.keys(rule.schema)) {
          //   const result = this.validateRule(data[key], rule.schema[key], tryCast);
          //   if (!result.isValid) {
          //     errors.push(`property ${key}: ${result.errors.join(", ")}`);
          //   }
          // }
          return this.validate(castedValue, rule.schema, tryCast);
        case "enum":
          if (!rule.values.includes(castedValue)) {
            return {
              isValid: false,
              errors: ["must be one of " + rule.values],
            };
          }
          break;
        case "function":
          if (typeof castedValue !== "function") {
            return { isValid: false, errors: ["must be a function"] };
          }
          break;
        case "null":
          if (data !== null) {
            return { isValid: false, errors: ["must be null"] };
          }
          break;
        case "undefined":
          if (data !== undefined) {
            return { isValid: false, errors: ["must be undefined"] };
          }
          break;
        case "any":
          break; // Always valid
        default:
          this.log.error(
            `Unknown validation rule type ${(rule as any).type} for ${
              JSON.stringify(data)
            } (${typeof data})`,
          );
          return { isValid: false, errors: ["Unknown validation rule type"] };
      }
      return { isValid: true, casted: wasCasted ? castedValue : undefined };
    }

    public validate(
      data: Record<string, any>,
      schema: ValidationSchema,
      tryCast = false,
    ): ValidationResult {
      this.log.debug("Validating data:", JSON.stringify(data));
      const errors: string[] = [];
	  let wasCasted = false;
      for (const key in schema) {
        const rule = schema[key];
        if (key in data) {
          const value = data[key];

          if (rule.required && value === undefined) {
            errors.push(`${key} is required`);
          }

          const result = this.validateRule(value, rule, tryCast);
          if (!result.isValid) {
            errors.push(`${key}: ${result.errors.join(", ")}`);
          }
		  if (tryCast && result.casted !== undefined) {
			data[key] = result.casted;
			wasCasted = true;
		  }
        } else if (rule.required) {
          errors.push(`${key} is required`);
        }
      }
      if (errors.length > 0) {
        this.log.warn(errors);
        return { isValid: false, errors };
      }
      this.log.success("Validation successful");
      return { isValid: true, casted: wasCasted ? data : undefined };
    }
  },
);
