import { BigAction } from "../components/BigAction";
import { useSettings } from "../lib/settings";
import { navigate } from "../lib/router";
import { HOME_ACTIONS } from "../constants";

export function Home() {
  const { t } = useSettings();
  return (
    <main>
      <h1>{t("homeTitle")}</h1>
      <p className="lead">{t("tagline")}</p>
      <div className="stack">
        {HOME_ACTIONS.map(({ route, icon, labelKey, subKey, ...rest }) => (
          <BigAction
            key={route}
            icon={icon}
            label={t(labelKey)}
            sub={t(subKey)}
            kind={"kind" in rest ? rest.kind : undefined}
            onClick={() => navigate(route)}
          />
        ))}
      </div>
      <p className="tiny" style={{ marginTop: "1.5rem" }}>
        {t("poweredNote")}
      </p>
    </main>
  );
}
