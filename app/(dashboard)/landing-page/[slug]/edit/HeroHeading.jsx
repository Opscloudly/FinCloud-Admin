import Input from "@/components/UI/Input";
import InputFile from "@/components/UI/InputFile";

export default function HeroHeading({
  formData,
  handleInput,
  handleTranslateInput,
}) {
  return (
    <div className="grid grid-cols-11 gap-6">
      <div className="col-span-11 flex flex-col gap-y-5">
        {/* Input item */}
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="post_title"
            className="text-black text-sm font-medium "
          >
            Heading{" "}
            <span className="text-Gray-300 font-medium text-xs">[TR]</span>
          </label>
          <div>
            <Input
              name="hero_title.tr"
              value={formData.hero_title.tr}
              onChange={handleInput}
              onBlur={handleTranslateInput}
              placeholder="Type here..."
            />
          </div>
        </div>
        {/* Input item */}
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="post_title"
            className="text-black text-sm font-medium "
          >
            Heading{" "}
            <span className="text-Gray-300 font-medium text-xs">[EN]</span>
          </label>
          <div>
            <Input
              name="hero_title.en"
              value={formData.hero_title.en}
              onChange={handleInput}
              onBlur={handleTranslateInput}
              placeholder="Type here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
