"use client";
export default function InputWithAddon({
  type,
  name,
  value,
  onChange,
  onBlur,
  className,
  placeholder,
  leftAddon = false,
  rightAddon = false,
}) {
  const inp_type = type || "text";
  const inp_class = className || "";

  return (
    <div className="relative">
      {leftAddon && (
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center w-10 px-3 border-r border-Gray-200">
          <span class="text-gray-500 sm:text-sm">{leftAddon}</span>
        </div>
      )}

      <input
        type={inp_type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full text-Gray-input text-sm font-normal placeholder:text-Gray-500 bg-transparent focus:bg-white border border-Gray-200 focus:border-main-600 outline-none py-2 rounded-lg ${
          leftAddon ? "pl-12" : "pl-3"
        } ${rightAddon ? "pr-12" : "pr-3"}  ${inp_class}`}
        placeholder={placeholder || ""}
      />
      {rightAddon && (
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center border-l w-10 border-Gray-200">
          <span class="text-gray-500 sm:text-sm">{rightAddon}</span>
        </div>
      )}
    </div>
  );
}
