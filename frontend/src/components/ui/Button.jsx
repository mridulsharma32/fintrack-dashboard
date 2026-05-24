export default function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-mint text-white hover:bg-teal-800",
    secondary: "bg-white text-ink border border-black/10 hover:bg-black/5",
    danger: "bg-coral text-white hover:bg-red-700",
  };

  return (
    <button
      className={`focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
