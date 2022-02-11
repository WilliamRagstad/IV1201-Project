// deno-lint-ignore-file no-explicit-any
import Role from "../model/Role.ts";
import Repository from "./Repository.ts";

/**
 * Role repository class.
 */
export default class RoleRepository extends Repository<Role> {
  private static instance: RoleRepository;
  constructor() {
    super();
  }

  /**
   * Get the role repository singleton instance.
   * @returns The singleton instance.
   */
  public static getInstance(): RoleRepository {
    if (!RoleRepository.instance) {
      RoleRepository.instance = new RoleRepository();
    }
    return RoleRepository.instance;
  }

  convertTo(row: any) {
    return new Role(
      row.role_id,
      row.name
    );
  }

  convertFrom(model: Role): unknown[] {
    return [
      model.id,
      model.name
    ];
  }

  /**
   * Send a custom query to the database.
   * @param query The query to execute.
   * @returns The result of the query.
   */
  public async query(query: string): Promise<Role[]> {
    const result = await this.db.query(query);
    return result.rows.map(this.convertTo);
  }

  /**
   * Get all users.
   * @returns The result of the query.
   */
  public async getAll(): Promise<Role[]> {
    return await this.query("SELECT * FROM role");
  }
  /**
   * Find a user by email.
   * @param id The id of the user to find.
   * @returns The user with the given id.
   */
  public async findById(id: number): Promise<Role | undefined> {
    const result = await this.query("SELECT * FROM role WHERE role_id=" + id);
    return result.length > 0 ? result[0] : undefined;
  }
}
