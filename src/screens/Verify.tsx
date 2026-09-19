import { Back } from "../components/Back";
import { useSettings } from "../lib/settings";
import directory from "../data/directory.json";
import { ICONS } from "../constants";

type Localised = Record<string, string>;
type Entry = { id: string; name: Localised; numbers: string[]; site: string; note: Localised };

export function Verify() {
  const { t, lang } = useSettings();
  const pick = (l: Localised) => l[lang] || l.en;
  return (
    <main>
      <Back />
      <h1>{t("verifyTitle")}</h1>
      <p className="lead">{t("verifyLead")}</p>
      {(directory as Entry[]).map(({ id, name, numbers, site, note }) => (
        <section key={id} className="card" aria-labelledby={`d-${id}`}>
          <h2 id={`d-${id}`} style={{ marginTop: 0 }}>
            {pick(name)}
          </h2>
          {pick(note) && <p>{pick(note)}</p>}
          <div className="row">
            {numbers.map((n) => (
              <a key={n} className="btn fill" href={`tel:${n.replace(/\s/g, "")}`}>
                <span aria-hidden="true">{ICONS.CALL}</span> {t("callNumber", { n })}
              </a>
            ))}
            {site && (
              <a className="btn" href={site} target="_blank" rel="noreferrer">
                {t("openSite")}
              </a>
            )}
          </div>
        </section>
      ))}
      <p className="tiny" style={{ marginTop: "1rem" }}>
        {t("verifyNote")}
      </p>
    </main>
  );
}
