import { UploadIcon } from "@/components/Icons";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import InputFile from "@/components/UI/InputFile";
import InputFileMultiple from "@/components/UI/InputFileMultiple";
import Textarea from "@/components/UI/Textarea";

export default function JoinUsSection({
  formData,
  handleInput,
  handleTranslateInput,
  lang,
  setLang,
}) {
  const handleAddMoreItem = () => {
    const data__copy = [...formData.hero_carousel_images];
    data__copy.push({ path: "", full_path: "" });
    handleInputNoLang({
      target: { name: "hero_carousel_images", value: data__copy },
    });
  };
  return (
    <div className="grid grid-cols-11 gap-6">
      <div className="col-span-8 flex flex-col gap-y-5">
        {/* Input item */}
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="post_title"
            className="text-black text-sm font-medium "
          >
            Tagline{" "}
            <span className="text-Gray-300 font-medium text-xs">
              {lang == "en" ? "[EN]" : ""}
            </span>
          </label>
          <div>
            <Textarea
              name="join_us_tagline"
              value={formData.join_us_tagline[lang]}
              onChange={handleInput}
              onBlur={handleTranslateInput}
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
            Make Money Button Label{" "}
            <span className="text-Gray-300 font-medium text-xs">
              {lang == "en" ? "[EN]" : ""}
            </span>
          </label>
          <div>
            <Input
              name="join_us_make_money_label"
              value={formData.join_us_make_money_label[lang]}
              onChange={handleInput}
              onBlur={handleTranslateInput}
              placeholder="Type post title here..."
            />
          </div>
        </div>

        {/* Input item */}
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="post_title"
            className="text-black text-sm font-medium "
          >
            Need Money Button Label{" "}
            <span className="text-Gray-300 font-medium text-xs">
              {lang == "en" ? "[EN]" : ""}
            </span>
          </label>
          <div>
            <Input
              name="join_us_need_money_label"
              value={formData.join_us_need_money_label[lang]}
              onChange={handleInput}
              onBlur={handleTranslateInput}
              placeholder="Type post title here..."
            />
          </div>
        </div>
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
