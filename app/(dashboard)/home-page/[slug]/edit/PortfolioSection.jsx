import { UploadIcon } from "@/components/Icons";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import InputFile from "@/components/UI/InputFile";
import InputFileMultiple from "@/components/UI/InputFileMultiple";
import InputWithAddon from "@/components/UI/InputWithAddon";
import Select from "@/components/UI/Select";
import Textarea from "@/components/UI/Textarea";

export default function PortfolioSection({
  formData,
  handleInput,
  handleTranslateInput,
  handleMultiInput,
  handleTranslateMultiInput,
  handleMultiInputNoLang,
  lang,
  setLang,
}) {
  return (
    <div className="grid grid-cols-11 gap-6">
      <div className="col-span-8 flex flex-col gap-y-12">
        {formData.portfolio?.map((item, i) => (
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
                Heading{" "}
                <span className="text-Gray-300 font-medium text-xs">
                  {lang == "en" ? "[EN]" : ""}
                </span>
              </label>
              <div>
                <Input
                  name={`portfolio.heading.${i}`}
                  value={item.heading[lang]}
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
                Subheading{" "}
                <span className="text-Gray-300 font-medium text-xs">
                  {lang == "en" ? "[EN]" : ""}
                </span>
              </label>
              <div>
                <Input
                  name={`portfolio.subheading.${i}`}
                  value={item.subheading[lang]}
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
                Details{" "}
                <span className="text-Gray-300 font-medium text-xs">
                  {lang == "en" ? "[EN]" : ""}
                </span>
              </label>
              <div>
                <Textarea
                  name={`portfolio.details.${i}`}
                  value={item.details[lang]}
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
                Link Label{" "}
                <span className="text-Gray-300 font-medium text-xs">
                  {lang == "en" ? "[EN]" : ""}
                </span>
              </label>
              <div>
                <Input
                  name={`portfolio.link_label.${i}`}
                  value={item.link_label[lang]}
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
                Link URL{" "}
                <span className="text-Gray-300 font-medium text-xs">
                  {lang == "en" ? "[EN]" : ""}
                </span>
              </label>
              <div>
                <Input
                  name={`portfolio.link_href.${i}`}
                  value={item.link_href}
                  onChange={handleMultiInputNoLang}
                  placeholder="https://www.example.com"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-3 flex flex-col gap-y-4">
        {/* Language item */}
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
        {/* Item #01 */}
        <div className="rounded-lg border border-Gray-200">
          <div className="px-3 py-4 border-b">
            <h4 className="text-lg font-medium text-black">Main Section</h4>
          </div>
          <div className="flex flex-col gap-y-4 px-3 py-4">
            {/* Input item */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="post_title"
                className="text-black text-sm font-medium "
              >
                Heading{" "}
                <span className="text-Gray-300 font-medium text-xs">
                  {lang == "en" ? "[EN]" : ""}
                </span>
              </label>
              <div>
                <Textarea
                  name={`portfolio_heading`}
                  value={formData.portfolio_heading[lang]}
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
                Subheading{" "}
                <span className="text-Gray-300 font-medium text-xs">
                  {lang == "en" ? "[EN]" : ""}
                </span>
              </label>
              <div>
                <Textarea
                  name={`portfolio_subheading`}
                  value={formData.portfolio_subheading[lang]}
                  onChange={handleInput}
                  onBlur={handleTranslateInput}
                  placeholder="Type here.."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
