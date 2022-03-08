import { SSROptions } from "aleph/types";
// import { getCookies } from "https://deno.land/std/http/cookie.ts";
// import { verifyJWT } from "~/lib/shared/auth/jwt.ts";

function appRootPath() {
	const cwd = Deno.cwd();
    const app = cwd.endsWith("recruitment-app")
      ? cwd.substring(0, cwd.indexOf("recruitment-app"))
      : cwd;
	return app;
}

/**
 * Import and export the `ssr` options from every page that requires access to the current user session.
 */
export const ssr: SSROptions = {
  props: async (req) => {
    // console.log("Loading current user...");
    const { verifyJWT } = await import(`file://${appRootPath()}/shared/auth/jwt.ts`);
    const { getCookies } = await import(`https://deno.land/std/http/cookie.ts`);
    let payload = undefined;
    try {
      const jwt = await verifyJWT(getCookies(req.headers).JWT);
      payload = jwt.data;
    } catch { /* Ignore */ }
    // console.log("Current user:", payload);
    return {
      $revalidate: 0, // revalidate props for every request
      user: payload, // Save JWT payload in user property
      serverTime: Date.now(),
    };
  },
  paths: () => {
    return [];
  },
};
