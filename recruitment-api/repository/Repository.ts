import DatabaseHandler from "../config/DatabaseHandler.ts";
import { Transaction } from "https://deno.land/x/postgres/mod.ts";

/**
 * Base repository class.
 * All other repositories should extend this class.
 */
export default abstract class Repository<TModel> {
  db: DatabaseHandler;
  constructor() {
    this.db = DatabaseHandler.getInstance();
  }

  /**
   * Convert a database row to a model object.
   * @param row The row to convert to the model `T`.
   * @param transaction The transaction to execute other database calls in.
   */
  // deno-lint-ignore no-explicit-any
  abstract convertTo(row: any, transaction: Transaction): TModel | Promise<TModel>;
  /**
   * Convert a model object to a database row.
   * @param row The model object to convert to a database row.
   */
  abstract convertFrom(model: TModel): unknown;
  /**
   * Get all the model objects from the database.
   */
  toValues(...row: unknown[]) {
    return "(" +
      row.map((v: unknown) => {
        if (typeof(v) === "string") return `'${v}'`;
        return v;
      }).join(", ") +
      ")";
  }
  /**
   * Send a custom query to the database.
   * @param query The query to send to the database.
   */
  query?(query: string, transaction: Transaction): Promise<TModel[]>;
  /**
   * Get all the model objects from the database.
   */
  getAll?(transaction: Transaction): Promise<TModel[]>;
  /**
   * Save a model object to the database.
   * @param model The model object to save to the database.
   */
  save?(model: TModel, transaction: Transaction): Promise<void> | void;
  // abstract find(model: T): Promise<T>;
  /**
   * Find a model object by its id.
   * @param id The id of the model object to find.
   */
  findById?(id: string, transaction: Transaction): Promise<TModel | undefined>;
  /**
   * Delete a model object from the database.
   * @param id The id of the model object to delete.
   */
  delete?(id: string, transaction: Transaction): Promise<void> | void;
}
