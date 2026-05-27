export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        glass
        rounded-3xl
        p-8
        card-hover
        border border-white/10
        ${className}
      `}
    >
      {children}
    </div>
  );
}