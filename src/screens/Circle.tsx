import { useState } from "react";
import { Back } from "../components/Back";
import { useSettings } from "../lib/settings";
import { cleanPhone, getContacts, getMyName, saveContacts, saveMyName, telLink, type Contact } from "../lib/storage";
import { ICONS, MAX_CONTACTS, MIN_PHONE_DIGITS, PHONE_PLACEHOLDER } from "../constants";

export function Circle() {
  const { t } = useSettings();
  const [contacts, setContacts] = useState<Contact[]>(getContacts);
  const [me, setMe] = useState(getMyName);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const valid = name.trim().length > 0 && cleanPhone(phone).length >= MIN_PHONE_DIGITS;

  const update = (next: Contact[]) => {
    setContacts(next);
    saveContacts(next);
  };
  const add = () => {
    if (!valid) return;
    update([...contacts, { name: name.trim(), phone: cleanPhone(phone) }]);
    setName("");
    setPhone("");
    setStatus(t("saved"));
  };
  const remove = (index: number) => update(contacts.filter((_, i) => i !== index));
  const changeMe = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setMe(target.value);
    saveMyName(target.value);
  };

  return (
    <main>
      <Back />
      <h1>{t("circleTitle")}</h1>
      <p className="lead">{t("circleLead")}</p>

      <label htmlFor="me">{t("yourName")}</label>
      <input id="me" type="text" value={me} onChange={changeMe} autoComplete="name" />

      {contacts.length === 0 && (
        <p className="card" style={{ marginTop: "1rem" }}>
          {t("circleEmpty")}
        </p>
      )}
      {contacts.map(({ name: cName, phone: cPhone }, i) => (
        <div key={cPhone} className="card" style={{ marginTop: ".75rem" }}>
          <p className="calm">{cName}</p>
          <p>+{cPhone}</p>
          <div className="row">
            <a className="btn fill" href={telLink(cPhone)}>
              <span aria-hidden="true">{ICONS.CALL}</span> {t("emCallTrusted", { name: cName })}
            </a>
            <button className="btn quiet" onClick={() => remove(i)}>
              {t("remove")}
            </button>
          </div>
        </div>
      ))}

      {contacts.length < MAX_CONTACTS && (
        <>
          <label htmlFor="n">{t("name")}</label>
          <input id="n" type="text" value={name} onChange={({ target }) => setName(target.value)} autoComplete="off" />
          <label htmlFor="p">{t("phone")}</label>
          <input
            id="p"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
            placeholder={PHONE_PLACEHOLDER}
          />
          <div className="row" style={{ marginTop: ".75rem" }}>
            <button className="btn fill" onClick={add} disabled={!valid}>
              {t("save")}
            </button>
          </div>
          <p className="status" role="status" aria-live="polite">
            {status}
          </p>
        </>
      )}
    </main>
  );
}
