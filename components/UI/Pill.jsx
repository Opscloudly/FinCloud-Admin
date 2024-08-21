export default function Pill({ label, className }) {
  return (
    <span
      className={`py-0.5 px-2 rounded-2xl text-xs capitalize font-medium leading-[19px] ${className}`}
    >
      {label}
    </span>
  );
}
