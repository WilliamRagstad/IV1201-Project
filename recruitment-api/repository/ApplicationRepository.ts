// deno-lint-ignore-file no-explicit-any
import Application from "../model/Application.ts";
import Repository from "./Repository.ts";

/**
 * Application repository class.
 */
export default class ApplicationRepository extends Repository<Application> {
	private static instance: ApplicationRepository;
	constructor() {
		super();
	}

	/**
	 * Get the user repository singleton instance.
	 * @returns The singleton instance.
	 */
	public static getInstance(): ApplicationRepository {
		if (!ApplicationRepository.instance) {
			ApplicationRepository.instance = new ApplicationRepository();
		}
		return ApplicationRepository.instance;
	}

	async convertTo(row: any): Promise<Application> {
		// Fetch role from database
		return new Application(
            row[0],				//person_id
			row[1],				//name
			row[2],				//surname
			row[3],				//email
			row[4],				//competence_id
			row[5],				//years_of_experience
			row[6],				//from_date
			row[7],				//to_date
		);
	}

	convertFrom(model: Application): unknown[] {
		return [
			model.person_id,
			model.name,
			model.surname,
			model.email,
			model.competence_id,
			model.years_of_experience,
			model.from_date, 
			model.to_date,
		];
	}

	/**
	 * Send a custom query to the database.
	 * @param query The query to execute.
	 * @returns The result of the query.
	 */
	public async query(query: string): Promise<Application[]> {
		const result = await this.db.query(query);
		return Promise.all(result.rows.map(async (r) => await this.convertTo(r)));
	}


	/**
	 * Get all users.
	 * @returns The result of the query.
	 */
	public async getAll(): Promise<Application[]> {
		return await this.query(
            "SELECT person.person_id, person.name, person.surname, person.email, competence_profile.competence_id, competence_profile.years_of_experience, availability.from_date, availability.to_date "+
            "FROM person "+
            "INNER JOIN competence_profile "+
            "ON person.person_id = competence_profile.person_id "+
            "INNER JOIN availability "+
            "ON person.person_id = availability.person_id "+
            "ORDER BY person.person_id;"
          );
	}

    
}
