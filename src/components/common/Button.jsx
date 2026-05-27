export default function Button({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        bg-gradient-to-r
        from-blue-600
        to-cyan-500
        px-8 py-4
        rounded-2xl
        font-semibold
        transition-all
        hover:scale-105
        hover:shadow-2xl
        hover:shadow-cyan-500/30
        active:scale-95
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}