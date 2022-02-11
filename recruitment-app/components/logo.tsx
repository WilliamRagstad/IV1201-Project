import React from "react";

/**
 * Creates a logo to use in the webpage.
 * @param size The size of the logo.
 * @returns The created logo.
 */
export default function Logo({ size = 75 }: { size?: number }) {
  return <img src="/logo.svg" height={size} title="Aleph.js" />;
}
