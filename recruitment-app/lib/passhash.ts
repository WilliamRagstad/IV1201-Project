import { createHash } from "https://deno.land/std@0.77.0/hash/mod.ts";

/**
 * App specific password salt used to hash passwords
 */
const salt = "IV1201_PASSWORD_SALT_1EX048D6A35";

/**
 * Function to hash specified password.
 * @param password The password to hash.
 * @returns the hashed password.
 */
export function hashPassword(password: string) {
  const hash = createHash("sha256");
  hash.update(password + salt);
  return hash.toString();
}
