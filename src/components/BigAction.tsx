import type { ReactNode } from "react";

type Props = {
  icon: string;
  label: ReactNode;
  sub?: ReactNode;
  kind?: "emergency" | "primary";
  onClick?: () => void;
  href?: string;
  external?: boolean;
};

/** The app's core control: full-width, ≥80px, icon + label + optional sub-line. Renders <a> for tel:/wa.me links. */
export function BigAction({ icon, label, sub, kind, onClick, href, external }: Props) {
  const className = `big ${kind ?? ""}`;
  const inner = (
    <>
      <span className="icon" aria-hidden="true">
        {icon}
      </span>
      <span>
        {label}
        {sub && <small>{sub}</small>}
      </span>
    </>
  );
  return href ? (
    <a className={className} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <button type="button" className={className} onClick={onClick}>
      {inner}
    </button>
  );
}
