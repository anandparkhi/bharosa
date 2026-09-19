import { useEffect, useState } from "react";
import { ROUTES, type Route } from "../constants";

/** Real paths (not hash) so the Android share-target (/check?text=…) and deep links work. */
export function navigate(path: Route) {
  history.pushState(null, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
export function usePath() {
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    const onChange = () => setPath(location.pathname);
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);
  return path;
}
export const matchRoute = (path: string): Route =>
  (Object.values(ROUTES).find((r) => r !== ROUTES.HOME && path.startsWith(r)) as Route | undefined) ?? ROUTES.HOME;
