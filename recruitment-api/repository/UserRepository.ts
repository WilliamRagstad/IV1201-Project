// deno-lint-ignore-file no-explicit-any
import User from "../model/User.ts";
import Repository from "./Repository.ts";
import RoleRepository from "./RoleRepository.ts";

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

	async convertTo(row: any): Promise<User> {
		// Fetch role from database
		const role = await this.roleRepository.findById(row.role_id);
		return new User(
			row.id,
			row.email,
			row.password,
			row.username,
			row.name,
			row.surname,
			row.pnr,
			role
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
	 * @returns The result of the query.
	 */
	public async query(query: string): Promise<User[]> {
		const result = await this.db.query(query);
		return Promise.all(result.rows.map(async (r) => await this.convertTo(r)));
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
	public async save(
		{ firstName, lastName, socialSecurityNumber, email, password, role }: User,
	) {
		await this.db.query(
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
		);
	}

	/**
	 * Find a user by email.
	 * @param id The id of the user to find.
	 * @returns The user with the given id.
	 */
	public async findById(id: number): Promise<User | undefined> {
		const result = await this.query("SELECT * FROM person WHERE person_id=" + id);
		return result.length > 0 ? result[0] : undefined;
	}

	/**
	 * Delete a user by id.
	 * @param id The id of the user to delete.
	 */
	public async delete(id: number) {
		await this.db.query("DELETE FROM person WHERE person_id=" + id);
	}
}
