import { Client } from "https://deno.land/x/postgres/mod.ts";
import { dbcreds } from "./DBCreds.ts";
import User from "../../model/User.ts";

const client = new Client(dbcreds);

export default {
    getCompetence: async () => {
        await client.connect();
        const result = await client.queryArray("SELECT * FROM competence");
        console.log(result.rows); 
        await client.end();    
    },
    postUser: async (user: User) => {
        await client.connect();
        const result = await client.queryArray("INSERT INTO person (person_id, name, surname, pnr, email, password, role_id, username) VALUES ("+Math.random()+","+user.firstName+","+user.lastName+","+user.socialSecurityNumber+","+user.email+","+user.password+","+0+","+user.email+");");
        console.log(result.rows); 
        await client.end();
    }
}


