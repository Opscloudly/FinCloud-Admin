import { LoaderIcon } from "../Icons";
import Loader from "./Loader";

export default function Button({ label, onClick, className, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative flex justify-center items-center gap-x-2 text-black font-medium capitalize min-w-[157px] h-10 rounded-md hover:bg-opacity-85 transition-all duration-200 ease-in-out ${className}`}
    >
      {disabled && <Loader className="loading-sm absolute right-2" />}
      <span>{label}</span>
    </button>
  );
}
