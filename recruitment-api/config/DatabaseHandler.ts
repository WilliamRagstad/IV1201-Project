import { Client } from "https://deno.land/x/postgres/mod.ts";

/**
 * Database base handler, used to send queries and
 * manage the communication with the database.
 */
export default class DatabaseHandler {
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
    if (!this.client.connected) await this.client.connect();
  }

  /**
   * Disconnect from the database and delete all non-persistent data.
   */
  public async disconnect() {
    if (this.client.connected) await this.client.end();
  }

  /**
   * Send a query to the database.
   * @param query The query to send to the database.
   * @returns The result of the query.
   */
  public query(query: string) {
    return this.client.queryArray(query);
  }
}
