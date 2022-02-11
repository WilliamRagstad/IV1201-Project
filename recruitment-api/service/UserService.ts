import User from "../model/User.ts";
import UserRepository from "../repository/UserRepository.ts";

/**
 * User service class.
 */
export default class UserService {
  private static instance: UserService;
  userRepository: UserRepository;
  constructor() {
    this.userRepository = UserRepository.getInstance();
  }

  /**
   * Get the user service singleton instance.
   * @returns The singleton instance.
   */
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * Save a user to the database.
   * @param user Save a user to the database.
   */
  async saveUser(user: User) {
    await this.userRepository.save(user);
  }

  /**
   * Find a user by email from the database.
   * @param user The user email to find.
   * @returns The user with the given email.
   */
  async findUserByEmail({ email }: User): Promise<User | undefined> {
    const result = await this.userRepository.query(
      "SELECT * FROM person WHERE email='" + email + "'",
    );
    return result.length > 0 ? result[0] : undefined;
  }

  /**
   * Verify a user by email and password against the database.
   * @param email Email of the user to verify.
   * @param password Password of the user to verify.
   * @returns If the user exists and the password is correct.
   */
  async verifyUser(email: string, password: string) {
    const user = await this.findUserByEmail({ email } as User);
    if (user) {
      return user.password === password;
    }
    return false;
  }
}
