import InputFile from "@/components/UI/InputFile";

export default function HeroBanner({ formData, handleInput }) {
  return (
    <div className="grid grid-cols-11 gap-6">
      <div className="col-span-11 flex flex-col gap-y-5">
        {/* Input item */}
        <div className="flex flex-col gap-y-2">
          <InputFile
            name="hero_banner"
            src={formData.hero_banner.full_path}
            onChange={handleInput}
            label="Banner Image"
          />
        </div>
      </div>
    </div>
  );
}
