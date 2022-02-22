import { Optional } from "https://deno.land/x/knight@2.0.3/mod.ts";

/**
 * Competence DTO
 */
export default class Competence {
  competence_id: number;
  years_of_experience: number;

  constructor(
    competence_id: number,
    years_of_experience: number,
  ) {
    this.competence_id = competence_id;
    this.years_of_experience = years_of_experience;
  }
}
