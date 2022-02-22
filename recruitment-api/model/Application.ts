export default class Application {
    person_id: number;
    name: string;
    surname: string;
    email: string;
    competence_id: number;
    years_of_experience: string;
    from_date: string;
    to_date: string;

    constructor(
        person_id: number,
        name: string,
        surname: string,
        email: string,
        competence_id: number,
        years_of_experience: string,
        from_date: string,
        to_date: string,
    ){
        this.person_id = person_id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.competence_id = competence_id;
        this.years_of_experience = years_of_experience;
        this.from_date = from_date;
        this.to_date = to_date;
    }
}


