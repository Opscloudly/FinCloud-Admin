import { UploadIcon } from "@/components/Icons";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import InputFile from "@/components/UI/InputFile";
import InputFileMultiple from "@/components/UI/InputFileMultiple";

export default function HeroSection({
  formData,
  handleInput,
  handleTranslateInput,
  handleArrayFileInput,
  handleInputNoLang,
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
            Subheading{" "}
            <span className="text-Gray-300 font-medium text-xs">
              {lang == "en" ? "[EN]" : ""}
            </span>
          </label>
          <div>
            <Input
              name="hero_subheading"
              value={formData.hero_subheading[lang]}
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
            Number of Transaction
          </label>
          <div>
            <Input
              name="number_of_transactions"
              type="number"
              value={formData.number_of_transactions}
              onChange={handleInputNoLang}
              placeholder="Enter number.."
            />
          </div>
        </div>

        {/* Input item */}
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="post_title"
            className="text-black text-sm font-medium "
          >
            Number of Campaigns
          </label>
          <div>
            <Input
              name="number_of_campaigns"
              type="number"
              value={formData.number_of_campaigns}
              onChange={handleInputNoLang}
              placeholder="Enter number.."
            />
          </div>
        </div>

        {/* Input item */}
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="post_title"
            className="text-black text-sm font-medium "
          >
            Number of Countries
          </label>
          <div>
            <Input
              name="number_of_countries"
              type="number"
              value={formData.number_of_countries}
              onChange={handleInputNoLang}
              placeholder="Enter number.."
            />
          </div>
        </div>

        {/* File input group */}
        <div className="flex flex-col gap-y-6 p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-black text-lg font-medium">Carousel Images</h2>
            <Button
              label="Add more"
              onClick={handleAddMoreItem}
              className="bg-Gray-500 text-white"
            />
          </div>
          <div className="flex flex-wrap gap-8">
            {/* Input item */}
            {formData?.hero_carousel_images?.map((item, i) => (
              <div key={i} className="flex flex-col gap-y-2">
                <InputFile
                  name={`hero_carousel_images.${i}`}
                  src={item.full_path}
                  onChange={handleArrayFileInput}
                  label={`Item #${i + 1}`}
                />
              </div>
            ))}
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
