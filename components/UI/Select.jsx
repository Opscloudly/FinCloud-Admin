"use client";
export default function Select({
  type,
  name,
  value,
  onChange,
  className,
  options = [],
  selectPointer = true,
}) {
  const inp_type = type || "text";
  const inp_class = className || "";

  return (
    <select
      type={inp_type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full text-Gray-input text-sm font-normal placeholder:text-Gray-500 bg-transparent focus:bg-white border border-Gray-200 focus:border-main-600 outline-none px-3 py-2 rounded-lg  ${inp_class}`}
    >
      {selectPointer && <option value="">Select</option>}

      {options?.map((item, i) => (
        <option key={i} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
