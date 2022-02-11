// deno-lint-ignore-file no-explicit-any
import User from "../model/User.ts";
import Repository from "./Repository.ts";

/**
 * User repository class.
 */
export default class UserRepository extends Repository<User> {

	private static instance: UserRepository;
	constructor() {
		super();
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

	convertTo(row: any): User {
		return new User(
			row.id,
			row.name,
			row.surname,
			row.pnr,
			row.email,
			row.password,
			// role_id
			row.username,
		);
	}

	convertFrom(model: User): unknown[] {
		return [
			model.id,
			model.firstName,
			model.lastName,
			model.socialSecurityNumber,
			model.email,
			model.password,
			0, // role_id
			model.username,
		];
	}

	/**
	 * Send a custom query to the database.
	 * @param query The query to execute.
	 * @returns The result of the query.
	 */
	public async query(query: string): Promise<User[]> {
		const result = await this.db.query(query);
		return result.rows.map(this.convertTo);
	}

	/**
	 * Get all users.
	 * @returns The result of the query.
	 */
	public async getAll(): Promise<User[]> {
		return await this.query("SELECT * FROM person");
	}

	/**
	 * Save a user.
	 * @param user The user to save.
	 */
	public async save({ firstName, lastName, socialSecurityNumber, email, password }: User) {
		await this.db.query(
			"INSERT INTO person (name, surname, pnr, email, password, role_id, username) VALUES " +
			this.toValues(firstName, lastName, socialSecurityNumber, email, password, 0, email),
		);
	}

	/**
	 * Find a user by email.
	 * @param id The id of the user to find.
	 * @returns The user with the given id.
	 */
	public async findById(id: number): Promise<User | undefined> {
		const result = await this.query("SELECT * FROM person WHERE id=" + id);
		return result.length > 0 ? result[0] : undefined;
	}

	/**
	 * Delete a user by id.
	 * @param id The id of the user to delete.
	 */
	public async delete(id: number) {
		await this.db.query("DELETE FROM person WHERE id=" + id);
	}

}