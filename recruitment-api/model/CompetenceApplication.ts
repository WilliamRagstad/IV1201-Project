import { Optional } from "https://deno.land/x/knight@2.0.2/mod.ts";

/**
 * Competence Application DTO
 */
export class CompetenceApplication {
  @Optional()
  competence1?: boolean;
  @Optional()
  competence2?: boolean;
  @Optional()
  competence3?: boolean;

  constructor(
    competence1: boolean,
    competence2: boolean,
    competence3: boolean,
  ) {
    this.competence1 = competence1;
    this.competence2 = competence2;
    this.competence3 = competence3;
  }
}
