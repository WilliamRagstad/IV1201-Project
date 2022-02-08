import DBHandler from "../lib/database-manager/DBHandler.ts";

/**
 * User DTO
 */
export default class User {
	email: string;
	firstName: string;
	lastName: string;
	socialSecurityNumber: number;
	country: string;
	password: string;
	city?: string;
	phone?: number;
	static optionals = ["city", "phone"];

	constructor(firstName: string, lastName: string, socialSecurityNumber: number, country: string, password: string, city: string, phone: number, email: string) {
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.socialSecurityNumber = socialSecurityNumber;
		this.country = country;
		this.password = password;
		this.city = city;
		this.phone = phone;
	}
	PostUser():void {
        DBHandler.postUser(this);
    }
}

/**
 * Competence Application DTO
 */
export class CompetenceApplication {
    competence1?: boolean;
    competence2?: boolean;
    competence3?: boolean;

    constructor(competence1: boolean, competence2: boolean, competence3: boolean){
        this.competence1 = competence1;
        this.competence2 = competence2;
        this.competence3 = competence3;
    }

    submitApplication():void {
        //connect to database and insert application
    }
}