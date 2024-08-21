"use client";
export default function Textarea({
  name,
  value,
  onChange,
  onBlur,
  className,
  placeholder,
}) {
  const inp_class = className || "";

  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`h-[156px] w-full text-Gray-input text-sm font-normal placeholder:text-Gray-500 bg-transparent focus:bg-white border border-Gray-200 focus:border-main-600 outline-none px-3 py-2 rounded-lg  ${inp_class}`}
      placeholder={placeholder || ""}
    />
  );
}
