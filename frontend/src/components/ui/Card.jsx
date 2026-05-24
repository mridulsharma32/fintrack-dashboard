export default function Card({ children, className = "" }) {
  return <section className={`rounded-lg border border-black/5 bg-white shadow-soft ${className}`}>{children}</section>;
}
