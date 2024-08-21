import Input from "@/components/UI/Input";
import InputFile from "@/components/UI/InputFile";
import Textarea from "@/components/UI/Textarea";

export default function JoinUs({
  formData,
  handleInput,
  handleTranslateInput,
}) {
  return (
    <div className="grid grid-cols-11 gap-6">
      <div className="col-span-11 flex flex-col gap-y-8">
        {formData.join_us?.map((item, i) => (
          <div
            key={i}
            className="flex w-full gap-5 border rounded-lg px-4 py-2.5"
          >
            {/* Input item */}
            <div className="flex flex-col w-full gap-y-2">
              <label
                htmlFor="post_title"
                className="text-black text-sm font-medium "
              >
                Turkish
              </label>
              <div>
                <Textarea
                  name={`join_us.tr.${i}`}
                  value={item.tr}
                  onChange={handleInput}
                  placeholder="Type here..."
                />
              </div>
            </div>
            {/* Input item */}
            <div className="flex flex-col w-full gap-y-2">
              <label
                htmlFor="post_title"
                className="text-black text-sm font-medium "
              >
                English
              </label>
              <div>
                <Textarea
                  name={`join_us.en.${i}`}
                  value={item.en}
                  onChange={handleInput}
                  placeholder="Type here..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
