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
}