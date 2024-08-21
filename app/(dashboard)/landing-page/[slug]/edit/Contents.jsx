import Input from "@/components/UI/Input";
import InputFile from "@/components/UI/InputFile";
import Textarea from "@/components/UI/Textarea";

export default function Contents({ formData, handleInput, handleFileInput }) {
  return (
    <div className="grid grid-cols-11 gap-6">
      <div className="col-span-11 flex flex-col gap-y-14">
        {formData.contents?.map((item, i) => (
          <div
            key={i}
            className="border border-Gray-100 rounded-lg shadow-md p-6 flex flex-col gap-y-6"
          >
            {/* Input item */}
            <div className="flex flex-col gap-y-2">
              <InputFile
                name={`contents.image.${i}`}
                src={item.image?.full_path}
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
                  <span className="text-Gray-300 font-medium text-xs">
                    [TR]
                  </span>
                </label>
                <div>
                  <Input
                    name={`contents.heading.tr.${i}`}
                    value={item.heading.tr}
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
                  <span className="text-Gray-300 font-medium text-xs">
                    [EN]
                  </span>
                </label>
                <div>
                  <Input
                    name={`contents.heading.en.${i}`}
                    value={item.heading.en}
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
                  <span className="text-Gray-300 font-medium text-xs">
                    [TR]
                  </span>
                </label>
                <div>
                  <Textarea
                    name={`contents.title.tr.${i}`}
                    value={item.title.tr}
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
                  <span className="text-Gray-300 font-medium text-xs">
                    [EN]
                  </span>
                </label>
                <div>
                  <Textarea
                    name={`contents.title.en.${i}`}
                    value={item.title.en}
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
                  <span className="text-Gray-300 font-medium text-xs">
                    [TR]
                  </span>
                </label>
                <div>
                  <Textarea
                    name={`contents.content.tr.${i}`}
                    value={item.content.tr}
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
                  <span className="text-Gray-300 font-medium text-xs">
                    [EN]
                  </span>
                </label>
                <div>
                  <Textarea
                    name={`contents.content.en.${i}`}
                    value={item.content.en}
                    onChange={handleInput}
                    className="h-[220px]"
                    placeholder="Type here..."
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
