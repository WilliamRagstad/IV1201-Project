import User from "../model/User.ts";
import UserRepository from "../repository/UserRepository.ts";
import LoggingService from "./LoggingService.ts";
import { Transaction } from "https://deno.land/x/postgres/mod.ts";
import { Service } from "https://deno.land/x/knight@2.2.1/mod.ts";

/**
 * User service class.
 */
export default Service(
  class UserService {
    private log = LoggingService.instance().logger;
    userRepository: UserRepository;
    constructor() {
      this.userRepository = UserRepository.getInstance();
    }

    /**
     * Save a user to the database.
     * @param user Save a user to the database.
     */
    async saveUser(user: User): Promise<boolean> {
      this.log.debug("Save user transaction started");
      const wasSuccessful = await this.userRepository.db.useTransaction<boolean>(
        "transaction_user_save",
        async (t) => {
          await this.userRepository.save(user, t);
          return true;
        },
      ) ?? false;
      if (wasSuccessful) {
        this.log.success("Transaction successful, user saved");
      } else {
        this.log.error("Transaction failed, database rollback");
      }
      return wasSuccessful;
    }

    /**
     * Find a user by email from the database.
     * @param user The user email to find.
     * @returns The user with the given email.
     */
    async findUserByEmail(
      { email }: User,
      transaction: Transaction,
    ): Promise<User | undefined> {
      const result = await this.userRepository.query(
        "SELECT * FROM person WHERE email='" + email.toLowerCase() + "'",
        transaction,
      );
      return result.length > 0 ? result[0] : undefined;
    }

    /**
     * Verify a user by email and password against the database.
     * @param email Email of the user to verify.
     * @param password Password of the user to verify.
     * @returns The user if the email and password was matched, else false.
     */
    async verifyUser(email: string, password: string) {
      this.log.debug("Verify user transaction started");
      const user = await this.userRepository.db.useTransaction<User>(
        "transaction_user_verify",
        async (t) =>
          await this.findUserByEmail(
            { email: email.toLowerCase() } as User,
            t,
          ),
      );
      if (user && user.password === password) {
        this.log.success("User was successfully verified");
        return user;
      }
      this.log.warn("Could not verify user");
      return false;
    }
  },
);
