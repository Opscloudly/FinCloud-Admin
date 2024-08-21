import InputFile from "@/components/UI/InputFile";

export default function GallerySection({ formData, handleInput }) {
  return (
    <div className="grid grid-cols-11 gap-6">
      <div className="col-span-11 flex flex-col gap-y-5">
        <div className="flex flex-wrap gap-8">
          {/* Input item */}
          {formData?.gallery?.map((item, i) => (
            <div key={i} className="flex flex-col gap-y-2">
              <InputFile
                name={`gallery.${i}`}
                src={item.full_path}
                onChange={handleInput}
                label="Carousel Image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
