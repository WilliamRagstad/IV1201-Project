// deno-lint-ignore-file no-explicit-any
import User from "../model/User.ts";
import Repository from "./Repository.ts";
import RoleRepository from "./RoleRepository.ts";
import { Transaction } from "https://deno.land/x/postgres/mod.ts";

/**
 * User repository class.
 */
export default class UserRepository extends Repository<User> {
  roleRepository: RoleRepository;
  private static instance: UserRepository;
  constructor() {
    super();
    this.roleRepository = RoleRepository.getInstance();
  }

  /**
   * Get the user repository singleton instance.
   * @returns The singleton instance.
   */
  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  async convertTo(row: any, transaction: Transaction): Promise<User> {
    // Fetch role from database
    const role = await this.roleRepository.findById(row.role_id, transaction);
    return new User(
      row.id,
      row.email,
      row.password,
      row.username,
      row.name,
      row.surname,
      row.pnr,
      role,
    );
  }

  convertFrom(model: User): unknown[] {
    if (!model.role) throw new Error("Role is required");

    return [
      model.id,
      model.firstName,
      model.lastName,
      model.socialSecurityNumber,
      model.email,
      model.password,
      model.role?.id, // role_id integer NOT NULL
      model.username,
    ];
  }

  /**
   * Send a custom query to the database.
   * @param query The query to execute.
   * @returns The result of the query converted to the given model type.
   */
  public async query(query: string, transaction: Transaction): Promise<User[]> {
    const result = await this.db.query(query, transaction);
    return Promise.all(result.rows.map(async (r) => await this.convertTo(r, transaction)));
  }

  /**
   * Get all users.
   * @returns The result of the query.
   */
  public async getAll(transaction: Transaction): Promise<User[]> {
    return await this.query("SELECT * FROM person", transaction);
  }

  /**
   * Save a user.
   * @param user The user to save.
   */
  public async save(
    { firstName, lastName, socialSecurityNumber, email, password, role }: User,
    transaction: Transaction,
  ) {
	  await this.query(
      "INSERT INTO person (name, surname, pnr, email, password, role_id, username) VALUES " +
        this.toValues(
          firstName,
          lastName,
          socialSecurityNumber,
          email,
          password,
          role?.id ?? 2, // integer NOT NULL, default 2
          email,
        ),
      transaction,
    );
  }

  /**
   * Find a user by email.
   * @param id The id of the user to find.
   * @returns The user with the given id.
   */
  public async findById(id: string, transaction: Transaction): Promise<User | undefined> {
    const result = await this.query(
      "SELECT * FROM person WHERE person_id=" + id, transaction
    );
    return result.length > 0 ? result[0] : undefined;
  }

  /**
     * Update password for user with specified email.
     * @param email The email of the user.
     * @param password The new password to save.
     * @returns Whether or not the password could be updated.
     */
   public async updatePassword(email: string, password: string, transaction: Transaction) {
    await this.query(
      "UPDATE person SET password='" + password + "' WHERE email='" + email + "'", transaction
    );
  }

  /**
   * Delete a user by id.
   * @param id The id of the user to delete.
   */
  public async delete(id: string, transaction: Transaction) {
    await this.query("DELETE FROM person WHERE person_id=" + id, transaction);
  }
}
