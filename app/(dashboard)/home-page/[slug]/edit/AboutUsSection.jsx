import { UploadIcon } from "@/components/Icons";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import InputFile from "@/components/UI/InputFile";
import InputFileMultiple from "@/components/UI/InputFileMultiple";
import Select from "@/components/UI/Select";
import Textarea from "@/components/UI/Textarea";

export default function AboutUsSection({
  formData,
  handleMultiInput,
  handleTranslateMultiInput,
  handleMultiInputNoLang,
  lang,
  setLang,
}) {
  const iconOptions = [
    { value: "SHIELD", label: "Shield" },
    { value: "STAR", label: "Star" },
    { value: "TROPHY", label: "Trophy" },
  ];
  return (
    <div className="grid grid-cols-11 gap-6">
      <div className="col-span-8 flex flex-col gap-y-12">
        {formData.about_us?.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-y-5 border border-Gray-200 p-4 rounded-lg shadow-lg"
          >
            {/* Input item */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="post_title"
                className="text-black text-sm font-medium "
              >
                Icon
              </label>
              <div>
                <Select
                  name={`about_us.icon.${i}`}
                  value={item.icon}
                  onChange={handleMultiInputNoLang}
                  options={iconOptions}
                />
              </div>
            </div>
            {/* Input item */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="post_title"
                className="text-black text-sm font-medium "
              >
                Title{" "}
                <span className="text-Gray-300 font-medium text-xs">
                  {lang == "en" ? "[EN]" : ""}
                </span>
              </label>
              <div>
                <Input
                  name={`about_us.title.${i}`}
                  value={item.title[lang]}
                  onChange={handleMultiInput}
                  onBlur={handleTranslateMultiInput}
                  placeholder="Type here.."
                />
              </div>
            </div>

            {/* Input item */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="post_title"
                className="text-black text-sm font-medium "
              >
                Content{" "}
                <span className="text-Gray-300 font-medium text-xs">
                  {lang == "en" ? "[EN]" : ""}
                </span>
              </label>
              <div>
                <Textarea
                  name={`about_us.content.${i}`}
                  value={item.content[lang]}
                  onChange={handleMultiInput}
                  onBlur={handleTranslateMultiInput}
                  placeholder="Type here.."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-3 flex flex-col gap-y-4">
        <div className="rounded-lg border border-Gray-200">
          <div className="px-3 py-4 border-b">
            <h4 className="text-lg font-medium text-black">Languages</h4>
          </div>
          <div className="px-3 py-4">
            <div>
              <label htmlFor="lang" className="text-sm font-medium text-black">
                Selected Language
              </label>
              <select
                onChange={(e) => setLang(e.target.value)}
                value={lang}
                className="block w-full mt-2 mb-1 px-2.5 py-2 text-sm font-normal border border-Gray-200 rounded-lg outline-none"
              >
                <option value="tr">Turkish</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
