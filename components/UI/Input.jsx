"use client";
export default function Input({
  type,
  name,
  value,
  onChange,
  onBlur,
  className,
  placeholder,
}) {
  const inp_type = type || "text";
  const inp_class = className || "";

  return (
    <input
      type={inp_type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-full text-Gray-input text-sm font-normal placeholder:text-Gray-500 bg-white focus:bg-white border border-Gray-200 focus:border-main-600 outline-none px-3 py-2 rounded-lg  ${inp_class}`}
      placeholder={placeholder || ""}
    />
  );
}
