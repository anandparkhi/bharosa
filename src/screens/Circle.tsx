import { useState } from "react";
import { Back } from "../components/Back";
import { useSettings } from "../lib/settings";
import {
  normalizePhone,
  getContacts,
  getMyName,
  saveContacts,
  saveMyName,
  telLink,
  type Contact
} from "../lib/storage";
import { ICONS, MAX_CONTACTS, PHONE_PLACEHOLDER } from "../constants";

export function Circle() {
  const { t } = useSettings();
  const [contacts, setContacts] = useState<Contact[]>(getContacts);
  const [me, setMe] = useState(getMyName);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const normalized = normalizePhone(phone);
  const duplicate = contacts.some((c) => c.phone === normalized);
  const valid = name.trim().length > 0 && normalized !== null && !duplicate;

  const update = (next: Contact[]) => {
    if (!saveContacts(next)) {
      setStatus(t("storageError"));
      return false;
    }
    setContacts(next);
    setStatus(t("saved"));
    return true;
  };
  const add = () => {
    if (!valid) return;
    if (!normalized || !update([...contacts, { name: name.trim(), phone: normalized }])) return;
    setName("");
    setPhone("");
    setStatus(t("saved"));
  };
  const remove = (index: number) => update(contacts.filter((_, i) => i !== index));
  const changeMe = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setMe(target.value);
    if (!saveMyName(target.value)) setStatus(t("storageError"));
  };

  return (
    <main>
      <p className="status" role="status" aria-live="polite">
        {status}
      </p>
      <Back />
      <h1>{t("circleTitle")}</h1>
      <p className="lead">{t("circleLead")}</p>
      <p className="help">{t("circlePrivacy")}</p>

      <label htmlFor="me">{t("yourName")}</label>
      <input id="me" type="text" maxLength={80} value={me} onChange={changeMe} autoComplete="name" />

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
          <input
            id="n"
            type="text"
            maxLength={80}
            value={name}
            onChange={({ target }) => setName(target.value)}
            autoComplete="off"
          />
          <label htmlFor="p">{t("phone")}</label>
          <input
            id="p"
            maxLength={24}
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
          {phone && (
            <p className="help">
              {duplicate ? t("duplicateContact") : normalized ? `+${normalized}` : t("invalidPhone")}
            </p>
          )}
        </>
      )}
    </main>
  );
}
