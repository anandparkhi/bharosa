/** Numbered steps — only used where the content is a real sequence. */
export function Steps({ items }: { items: string[] }) {
  return (
    <>
      {items.map((text, i) => (
        <div key={i} className="step">
          <span className="n" aria-hidden="true">
            {i + 1}
          </span>
          <span>{text}</span>
        </div>
      ))}
    </>
  );
}
