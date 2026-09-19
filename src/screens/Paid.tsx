import { Back } from "../components/Back";
import { BigAction } from "../components/BigAction";
import { Speak } from "../components/Speak";
import { Steps } from "../components/Steps";
import { useSettings } from "../lib/settings";
import { navigate } from "../lib/router";
import { HELPLINES, ICONS, ROUTES } from "../constants";

export function Paid() {
  const { t } = useSettings();
  const steps = [t("paidStep1"), t("paidStep2"), t("paidStep3"), t("paidStep4")];
  return (
    <main>
      <Back />
      <h1>{t("paidTitle")}</h1>
      <p className="lead">{t("paidLead")}</p>
      <Speak text={[t("paidTitle"), t("paidLead"), ...steps].join(" ")} autoplay />
      <Steps items={steps} />
      <div className="stack" style={{ marginTop: "1rem" }}>
        <BigAction kind="primary" icon={ICONS.SHIELD} label={t("emCall1930")} href={`tel:${HELPLINES.CYBER}`} />
        <BigAction icon={ICONS.BANK} label={t("paidCallBank")} onClick={() => navigate(ROUTES.VERIFY)} />
      </div>
    </main>
  );
}
