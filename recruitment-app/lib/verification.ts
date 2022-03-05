import { useDeno } from "aleph/react";
import { SSROptions } from "aleph/types";
// import { getCookies } from "https://deno.land/std/http/cookie.ts";
// import { verifyJWT } from "~/lib/shared/auth/jwt.ts";

// Default JWT handler for SSR
let getUser = async () => undefined;

if (window.Deno != undefined) {
  // Server side
  const cwd = Deno.cwd();
  const app = cwd.endsWith("recruitment-app")
    ? cwd.substring(0, cwd.indexOf("recruitment-app"))
    : cwd;
  const { verifyJWT } = await import(`file://${app}/shared/auth/jwt.ts`);
  const { getCookies } = await import(`https://deno.land/std/http/cookie.ts`);
  getUser = async (req: any) => {
    try {
      return await verifyJWT(getCookies(req.headers).JWT).data;
    } catch (e: any) {
      return undefined;
    }
  };
}

/**
 * Import and export the `ssr` options from every page that requires access to the current user session.
 */
export const ssr: SSROptions = {
  props: async (req) => {
    console.log(req);
    return {
      $revalidate: 0, // revalidate props for every request
      user: await getUser(req), // Save JWT payload in user property
      serverTime: Date.now(),
    };
  },
  paths: async () => {
    return [];
  },
};
