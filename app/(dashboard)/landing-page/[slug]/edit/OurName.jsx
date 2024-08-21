import Input from "@/components/UI/Input";
import InputFile from "@/components/UI/InputFile";
import Textarea from "@/components/UI/Textarea";

export default function OurName({ formData, handleInput, handleFileInput }) {
  return (
    <div className="grid grid-cols-11 gap-6">
      <div className="col-span-11 flex flex-col gap-y-5">
        {/* Input item */}
        <div className="flex flex-col gap-y-2">
          <InputFile
            name="on_image"
            src={formData.on_image.full_path}
            onChange={handleFileInput}
            label="Image"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
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
                name="on_heading.tr"
                value={formData.on_heading.tr}
                onChange={handleInput}
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
                name="on_heading.en"
                value={formData.on_heading.en}
                onChange={handleInput}
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
              Title{" "}
              <span className="text-Gray-300 font-medium text-xs">[TR]</span>
            </label>
            <div>
              <Textarea
                name="on_title.tr"
                value={formData.on_title.tr}
                onChange={handleInput}
                className="h-[90px]"
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
              Title{" "}
              <span className="text-Gray-300 font-medium text-xs">[EN]</span>
            </label>
            <div>
              <Textarea
                name="on_title.en"
                value={formData.on_title.en}
                onChange={handleInput}
                className="h-[90px]"
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
              Content{" "}
              <span className="text-Gray-300 font-medium text-xs">[TR]</span>
            </label>
            <div>
              <Textarea
                name="on_content.tr"
                value={formData.on_content.tr}
                onChange={handleInput}
                className="h-[220px]"
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
              Content{" "}
              <span className="text-Gray-300 font-medium text-xs">[EN]</span>
            </label>
            <div>
              <Textarea
                name="on_content.en"
                value={formData.on_content.en}
                onChange={handleInput}
                className="h-[220px]"
                placeholder="Type here..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
