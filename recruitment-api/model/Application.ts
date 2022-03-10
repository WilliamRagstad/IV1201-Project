import Competence from "./Competence.ts";
import Availability from "./Availability.ts";
import User from "./User.ts";

/**
 * Application DTO
 */
export default class Application {
    user: User;
    competences: Competence[];
    availability: Availability[];

    constructor(
        user: User,
        competences: Competence[],
        availability: Availability[],
    ){
        this.user = user;
        this.competences = competences;
        this.availability = availability;
    }
}


