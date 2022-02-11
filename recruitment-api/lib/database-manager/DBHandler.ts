import { Client } from "https://deno.land/x/postgres/mod.ts";
import { dbcreds } from "./DBCreds.ts";
import User from "../../model/User.ts";

const client = new Client(dbcreds);

export default {
  getCompetence: async () => {
    return await sendQuery("SELECT * FROM competence");
  },
  postUser: async (user: User) => {
    return await sendQuery(
      "INSERT INTO person (name, surname, pnr, email, password, role_id, username) VALUES ('" +
        user.firstName + "','" + user.lastName + "'," +
        user.socialSecurityNumber + ",'" + user.email + "','" + user.password +
        "'," + 2 + ",'" + user.email + "'" + ");",
    );
  },
  findUser: async (email: string) => {
    return await sendQuery("SELECT * FROM person WHERE email='"+email+"'");
  },
  verifyUser: async (email: string, password: string) =>  {
    return await sendQuery("SELECT * FROM person WHERE email='"+email+"' AND password='"+password+"'");
  },
  checkRole: async (email: string) => {
    return await sendQuery("SELECT role_id FROM person WHERE email='"+email+"'");
  },
};

async function sendQuery (query: string) {
  await client.connect();
  const result = await client.queryArray(query);
  console.log(result.rows);
  await client.end();
  return result;
}
