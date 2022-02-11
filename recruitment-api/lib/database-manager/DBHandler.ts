import { Client } from "https://deno.land/x/postgres/mod.ts";
import { dbcreds } from "./DBCreds.ts";
import User from "../../model/User.ts";

const client = new Client(dbcreds);

export default {
  /**
   * Sends a query to retrieve all the users competence data.
   * @returns the rows from the table competence. 
   */
  getCompetence: async () => {
    return await sendQuery("SELECT * FROM competence");
  },
  /**
   * Submits the user.
   * @param user The user to be submitted in the form of a User DTO. 
   * @returns Success
   */
  postUser: async (user: User) => {
    return await sendQuery(
      "INSERT INTO person (name, surname, pnr, email, password, role_id, username) VALUES ('" +
        user.firstName + "','" + user.lastName + "'," +
        user.socialSecurityNumber + ",'" + user.email + "','" + user.password +
        "'," + 2 + ",'" + user.email + "'" + ");",
    );
  },
  /**
   * Finds a user based on the email.
   * @param email The users email.
   * @returns The table row for user.
   */
  findUser: async (email: string) => {
    return await sendQuery("SELECT * FROM person WHERE email='" + email + "'");
  },
  /**
   * Finds a user based on email and password. 
   * @param email The users email.
   * @param password The users password. 
   * @returns The table row for user.
   */
  verifyUser: async (email: string, password: string) => {
    return await sendQuery(
      "SELECT * FROM person WHERE email='" + email + "' AND password='" +
        password + "'",
    );
  },
  /**
   * Finds a user's role based on email.
   * @param email The users email.
   * @returns The role_id of the user.
   */
  checkRole: async (email: string) => {
    return await sendQuery(
      "SELECT role_id FROM person WHERE email='" + email + "'",
    );
  },
};

async function sendQuery(query: string) {
  await client.connect();
  const result = await client.queryArray(query);
  console.log(result.rows);
  await client.end();
  return result;
}
