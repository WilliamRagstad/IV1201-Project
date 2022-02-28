import { Optional } from "https://deno.land/x/knight@2.1.0/mod.ts";

/**
 * Competence DTO
 */
export default class Competence {
  id: number;
  years_of_experience: number;

  constructor(
    id: number,
    years_of_experience: number,
  ) {
    this.id = id;
    this.years_of_experience = years_of_experience;
  }
}
