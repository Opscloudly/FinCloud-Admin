"use client";
export default function InputDate({
  name,
  value,
  onChange,
  onBlur,
  className,
  placeholder,
}) {
  const inp_class = className || "";

  return (
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-full text-Gray-input text-sm font-normal placeholder:text-Gray-500 bg-transparent focus:bg-white border border-Gray-200 focus:border-main-600 outline-none px-3 py-2 rounded-lg  ${inp_class}`}
      placeholder={placeholder || ""}
    />
  );
}
