import { Back } from "../components/Back";
import { BigAction } from "../components/BigAction";
import { Speak } from "../components/Speak";
import { Steps } from "../components/Steps";
import { useSettings } from "../lib/settings";
import { getContacts, getMyName, telLink, waLink } from "../lib/storage";
import { navigate } from "../lib/router";
import { HELPLINES, ICONS, ROUTES } from "../constants";

/** Works fully offline. No AI. Autoplays the calming script. */
export function Emergency() {
  const { t } = useSettings();
  const contacts = getContacts();
  const me = getMyName();
  const reassurance = [t("emLine1"), t("emLine2"), t("emLine3")];
  const steps = [t("emStep1"), t("emStep2"), t("emStep3")];
  const script = [t("emTitle"), ...reassurance, ...steps].join(" ");
  const shareText = `${me ? `${me}: ` : ""}${t("emShareText")}`;

  return (
    <main>
      <Back />
      <h1>{t("emTitle")}</h1>
      <Speak text={script} autoplay />
      <div className="card" style={{ marginTop: "1rem" }}>
        {reassurance.map((line) => (
          <p key={line} className="calm">
            {line}
          </p>
        ))}
      </div>
      <Steps items={steps} />
      <div className="stack" style={{ marginTop: "1rem" }}>
        {contacts.length === 0 && (
          <BigAction kind="primary" icon={ICONS.ADD} label={t("emNoTrusted")} onClick={() => navigate(ROUTES.CIRCLE)} />
        )}
        {contacts.map(({ name, phone }) => (
          <div key={phone} className="stack">
            <BigAction kind="primary" icon={ICONS.CALL} label={t("emCallTrusted", { name })} href={telLink(phone)} />
            <BigAction
              icon={ICONS.WHATSAPP}
              label={t("emShareCase", { name })}
              href={waLink(phone, shareText)}
              external
            />
          </div>
        ))}
        <BigAction icon={ICONS.SHIELD} label={t("emCall1930")} href={`tel:${HELPLINES.CYBER}`} />
        <BigAction icon={ICONS.SIREN} label={t("emCall112")} href={`tel:${HELPLINES.POLICE}`} />
      </div>
    </main>
  );
}
