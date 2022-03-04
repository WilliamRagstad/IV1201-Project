import { create, verify, Payload, Header, getNumericDate } from "https://deno.land/x/djwt@v2.4/mod.ts";

const encoder = new TextEncoder()
const keyBuf = encoder.encode("IV1201-Project-Key-Buf");

/**
 * Creates a Crypto Key to use for creating and verifying JWTs. 
 */
const key = await crypto.subtle.importKey(
  "raw",
  keyBuf,
  {name: "HMAC", hash: "SHA-256"},
  true,
  ["sign", "verify"],
)

/**
 * Creates a payload for each type of user, which lasts 30 minutes. 
 * @param role_id Recruiter or Applicant
 * @returns The Payload 
 */
const payloader = (role_id:number) => {
  let payload:Payload = {
    iss: "iv1201-api",
    exp: getNumericDate(60*30),
    user: role_id,
  }
  return payload
}

/**
 * The header containing the algorithm and type. 
 */
const header: Header = {
  alg: "HS256",
  typ: "JWT",
};

/**
 * Verifies a JWT against a crypto key. 
 * @param token The token to be verified
 * @returns The payload of the token.
 */
export async function  verifyJWT(token:string){
    return verify(token, key);
}
/**
 * Creates a JWT with a payload based on the users role.
 * @param role_id The id of the role. 
 * @returns A JWT. 
 */
export async function createJWT(role_id:number){
    return create(header, payloader(role_id), key);
}