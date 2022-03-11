// deno-lint-ignore-file no-explicit-any
import { Service } from "https://deno.land/x/knight@2.2.1/mod.ts";
import LoggingService from "./LoggingService.ts";

export type ValidationRule =
  & (
    | { type: "string" }
    | { type: "number" }
    | { type: "boolean" }
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
export type ValidationResult = {
  isValid: true;
} | {
  isValid: false;
  errors: string[];
};

export default Service(
  class ValidationService {
    private log = LoggingService.instance().logger;

    public validateRule(data: any, rule: ValidationRule): ValidationResult {
      if (rule.required && data === undefined) {
        return {
          isValid: false,
          errors: ["Required field is missing"],
        };
      }
      switch (rule.type) {
        case "string":
          if (typeof data !== "string") {
            return { isValid: false, errors: ["must be a string"] };
          }
          break;
        case "number":
          if (typeof data !== "number") {
            return { isValid: false, errors: ["must be a number"] };
          }
          break;
        case "boolean":
          if (typeof data !== "boolean") {
            return { isValid: false, errors: ["must be a boolean"] };
          }
          break;
        case "array":
          if (typeof data !== "object" || !Array.isArray(data)) {
            return { isValid: false, errors: ["must be an array"] };
          } else if (rule.elements) {
            const errors: string[] = [];
            for (let i = 0; i < data.length; i++) {
              const result = this.validateRule(data[i], rule.elements);
              if (!result.isValid) {
                errors.push(`element ${i}: ${result.errors.join(", ")}`);
              }
            }
            return { isValid: errors.length === 0, errors };
          }
          break;
        case "object":
          if (typeof data !== "object" || Array.isArray(data)) {
            return { isValid: false, errors: ["must be an object"] };
          } else if (rule.schema) {
            const errors: string[] = [];
            for (const key of Object.keys(rule.schema)) {
              const result = this.validateRule(data[key], rule.schema[key]);
              if (!result.isValid) {
                errors.push(`property ${key}: ${result.errors.join(", ")}`);
              }
            }
            return { isValid: errors.length === 0, errors };
          }
          break;
        case "enum":
          if (!rule.values.includes(data)) {
            return {
              isValid: false,
              errors: ["must be one of " + rule.values],
            };
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
          this.log.error(`Unknown validation rule type: ${(rule as any).type}`);
          return { isValid: false, errors: ["Unknown validation rule type"] };
      }
      return { isValid: true };
    }

    public validate(
      data: Record<string, any>,
      schema: ValidationSchema,
    ): ValidationResult {
      const errors: string[] = [];
      for (const key in schema) {
        const rule = schema[key];
        if (key in data) {
          const value = data[key];

          if (rule.required && value === undefined) {
            errors.push(`${key} is required`);
          }

          const result = this.validateRule(value, rule);
          if (!result.isValid) {
            errors.push(`${key}: ${result.errors.join(", ")}`);
          }
        } else if (rule.required) {
          errors.push(`${key} is required`);
        }
      }
      if (errors.length > 0) {
        this.log.warn(errors);
        return { isValid: false, errors };
      }
      return { isValid: true };
    }
  },
);
