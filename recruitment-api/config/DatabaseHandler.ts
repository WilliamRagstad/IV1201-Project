import { Client, Transaction } from "https://deno.land/x/postgres/mod.ts";
import LoggingService from "../service/LoggingService.ts";

/**
 * Database base handler, used to send queries and
 * manage the communication with the database.
 */
export default class DatabaseHandler {
  private log = LoggingService.instance().logger;
  private static instance: DatabaseHandler;
  private client: Client;

  private constructor() {
    this.client = new Client(Deno.env.get("DATABASE_URL"));
  }

  /**
   * Get the database singleton instance.
   * @returns The singleton instance used to communicate with the database.
   */

  public static getInstance(): DatabaseHandler {
    if (!DatabaseHandler.instance) {
      DatabaseHandler.instance = new DatabaseHandler();
    }
    return DatabaseHandler.instance;
  }

  /**
   * Connect to the database.
   */
  public async connect() {
    if (!this.client.connected) {
      this.log.info("Connecting to database...");
      try {
        await this.client.connect();
        this.log.success("Successfully connected to database");
      } catch (error) {
        this.log.error("Failed to connect to database");
        this.log.error(error);
        throw error;
      }
    }
  }

  /**
   * Disconnect from the database and delete all non-persistent data.
   */
  public async disconnect() {
    if (this.client.connected) {
      this.log.info("Disconnecting from database...");
      await this.client.end();
    }
  }

  public async useTransaction<T>(
    name: string,
    callback: (
      transaction: Transaction,
    ) => T | undefined | Promise<T | undefined>,
    onError?: (error: unknown) => T | undefined,
  ): Promise<T | undefined> {
    const transaction = this.client.createTransaction(name + this.uniqueId());
    await transaction.begin();
    try {
      const result = await callback(transaction);
      await transaction.commit();
      return result;
    } catch (error: unknown) {
      transaction.rollback();
      if (onError) return onError(error);
      return undefined;
    }
  }

  /**
   * Send a query to the database.
   * @param query The query to send to the database.
   * @returns The result of the query.
   */
  public query(query: string, transaction: Transaction) {
    return transaction.queryObject(query);
  }

  /* Helper functions */
  private uniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }
}
