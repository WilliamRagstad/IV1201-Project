/**
 * SimpleUser DTO
 */
export default class EmailPassword {
  email: string;
  password: string;

  constructor(
    email: string,
    password: string,
  ) {
    this.email = email;
    this.password = password;
  }
}
