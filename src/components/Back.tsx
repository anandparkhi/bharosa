import { useSettings } from "../lib/settings";
import { navigate } from "../lib/router";
import { ICONS, ROUTES } from "../constants";

export function Back() {
  const { t } = useSettings();
  return (
    <button type="button" className="back" onClick={() => navigate(ROUTES.HOME)}>
      <span aria-hidden="true">{ICONS.BACK}</span> {t("back")}
    </button>
  );
}
