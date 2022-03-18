// deno-lint-ignore-file no-explicit-any
import Application from "../model/Application.ts";
import Availability from "../model/Availability.ts";
import Competence from "../model/Competence.ts";
import User from "../model/User.ts";
import Repository from "./Repository.ts";
import { Transaction } from "https://deno.land/x/postgres/mod.ts";

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

  convertTo(row: any): Application {
    const user = new User(
      row.person_id,
      row.email,
      row.password,
      row.username,
      row.name,
      row.surname,
      row.pnr,
      undefined,
    );
    const competence = [
      new Competence(
        row.competence_id,
        Number.parseFloat(row.years_of_experience),
      ),
    ];
    const availability = [
      new Availability(new Date(row.from_date), new Date(row.to_date)),
    ];
    return new Application(
      user,
      competence,
      availability,
    );
  }

  convertFrom(_model: Application): unknown[] {
    throw "Not implemented";
  }

  /**
   * Send a custom query to the database.
   * @param query The query to execute.
   * @returns The result of the query.
   */
  public async query(query: string, transaction: any): Promise<Application[]> {
    const result = await this.db.query(query, transaction);
    const middleStage = await Promise.all(
      result.rows.map(async (r) => await this.convertTo(r)),
    );
    return middleStage.reduce((acc: Application[], app: Application) => {
      const existing = acc.find((a: any) => a.user.id === app.user.id);
      if (existing) {
        // There is only one competence and availability when first fetching from the database.
        if (
          !existing.competences.some((c: Competence) =>
            c.id == app.competences[0].id
          )
        ) {
          existing.competences.push(app.competences[0]);
        }
        if (
          !existing.availability.some((a: Availability) =>
            (a.start_date.getTime() ==
              app.availability[0].start_date.getTime()) &&
            (a.end_date.getTime() == app.availability[0].end_date.getTime())
          )
        ) {
          existing.availability.push(app.availability[0]);
        }
      } else {
        acc.push(app);
      }
      return acc;
    }, []);
  }

  /**
   * Get all applications.
   * @returns The result of the query.
   */
  public async getAll(transaction: Transaction): Promise<Application[]> {
    return await this.query(
      "SELECT person.person_id, person.email, person.password, person.name, person.surname, person.pnr, competence_profile.competence_id, competence_profile.years_of_experience, availability.from_date, availability.to_date " +
        "FROM person " +
        "INNER JOIN competence_profile " +
        "ON person.person_id = competence_profile.person_id " +
        "INNER JOIN availability " +
        "ON person.person_id = availability.person_id " +
        "ORDER BY person.person_id;",
      transaction,
    );
  }

  /**
   * Get an application by its id.
   * @param id The id of the application.
   * @returns The result of the query.
   */
  public async findById(id: string, transaction: Transaction): Promise<Application | undefined> {
	 const results = await this.query(
	  "SELECT person.person_id, person.email, person.password, person.name, person.surname, person.pnr, competence_profile.competence_id, competence_profile.years_of_experience, availability.from_date, availability.to_date " +
		"FROM person " +
		"INNER JOIN competence_profile " +
		"ON person.person_id = competence_profile.person_id " +
		"INNER JOIN availability " +
		"ON person.person_id = availability.person_id " +
		"WHERE person.person_id = " + id + ";",
	  transaction
	);
	return results.length > 0 ? results[0] : undefined;
  }
}
