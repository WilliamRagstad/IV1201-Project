import {
  create,
  getNumericDate,
  Header,
  Payload,
  verify,
} from "https://deno.land/x/djwt@v2.4/mod.ts";

const encoder = new TextEncoder();
const keyBuf = encoder.encode("IV1201-Project-Key");

/**
 * Creates a Crypto Key to use for creating and verifying JWTs.
 */
const key: CryptoKey = await crypto.subtle.importKey(
  "raw",
  keyBuf,
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign", "verify"],
);

/**
 * The header containing the algorithm and type.
 */
const header: Header = {
  alg: "HS256",
  typ: "JWT",
};

/**
 * Creates a payload for each type of user, which lasts 30 minutes.
 * @param role_id Recruiter or Applicant
 * @returns The Payload
 */
const payloader = (data: any): Payload => {
  return {
    iss: "iv1201-jwt",
    exp: getNumericDate(60 * 30),
    data: data,
  };
};

/**
 * Verifies a JWT against a crypto key.
 * @param token The token containing the JWT
 * @returns The payload of the token.
 */
export async function verifyJWT(token: string): Promise<Payload> {
  return verify(token, key);
}

/**
 * Creates a JWT with a payload based on the users role.
 * @param payload The payload of the JWT.
 * @returns A new JWT.
 */
export async function createJWT(payload: any): Promise<string> {
  return create(header, payloader(payload), key);
}
