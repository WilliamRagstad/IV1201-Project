import { create, verify, Payload, Header, getNumericDate } from "https://deno.land/x/djwt@v2.4/mod.ts";

const encoder = new TextEncoder()
var keyBuf = encoder.encode("IV1201-Project-Key-Buf");

var key = await crypto.subtle.importKey(
  "raw",
  keyBuf,
  {name: "HMAC", hash: "SHA-256"},
  true,
  ["sign", "verify"],
)

let payloader = (title:string) => {
  let payload:Payload = {
    iss: "iv1201-api",
    exp: getNumericDate(new Date("2025-07-01")),
    user: title,
  }
  return payload
}

const header: Header = {
  alg: "HS256",
  typ: "JWT",
};

export async function  verifyJWT(token:string){
    return verify(token, key);
}

export async function createJWT(name:string){
    return create(header, payloader(name), key);
}