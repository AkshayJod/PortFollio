// Prefix files from /public with the base path (needed on GitHub Pages).
export const asset = (path: string) =>
  /^(https?:)?\/\//.test(path) ? path : `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${path.replace(/^\//, "")}`;
