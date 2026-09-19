import { useEffect, useState, type ComponentType } from "react";
import { TopBar } from "./components/TopBar";
import { matchRoute, usePath } from "./lib/router";
import { useSettings } from "./lib/settings";
import { ROUTES, type Route } from "./constants";
import { Home } from "./screens/Home";
import { Emergency } from "./screens/Emergency";
import { Check } from "./screens/Check";
import { Verify } from "./screens/Verify";
import { Circle } from "./screens/Circle";
import { Learn } from "./screens/Learn";
import { Paid } from "./screens/Paid";

const SCREENS: Record<Route, ComponentType> = {
  [ROUTES.HOME]: Home,
  [ROUTES.EMERGENCY]: Emergency,
  [ROUTES.CHECK]: Check,
  [ROUTES.VERIFY]: Verify,
  [ROUTES.PAID]: Paid,
  [ROUTES.CIRCLE]: Circle,
  [ROUTES.LEARN]: Learn
};

function useOnline() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true),
      off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return online;
}

export default function App() {
  const path = usePath();
  const { t } = useSettings();
  const online = useOnline();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);
  const Screen = SCREENS[matchRoute(path)];
  return (
    <div className="app">
      <TopBar />
      {!online && (
        <p className="result amber" role="status">
          {t("offline")}
        </p>
      )}
      <Screen />
    </div>
  );
}
