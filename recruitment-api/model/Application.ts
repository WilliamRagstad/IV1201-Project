import { Optional } from "https://deno.land/x/knight@2.0.3/mod.ts";
import Availability from "./Availability.ts";
import Competence from "./Competence.ts";

export default class Application {
    person_id: number;
    name: string;
    surname: string;
    email: string;
    @Optional()
    competence?: Competence[];
    @Optional()
    availability?: Availability[];

    constructor(
        person_id: number,
        name: string,
        surname: string,
        email: string,
        competence: Competence[],
        availability: Availability[],
    ){
        this.person_id = person_id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.competence = competence;
        this.availability = availability;
    }
}


