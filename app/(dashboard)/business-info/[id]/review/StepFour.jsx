import FileAsInput from "@/components/UI/InputFileInline";
import Input from "@/components/UI/Input";
import TextareaEditor from "@/components/UI/TextareaEditor";
import { useState } from "react";
import Select from "@/components/UI/Select";

export default function StepFour({ data }) {
  return (
    <div className="rounded-lg border border-Gray-200">
      <div className="p-4">
        <h2 className="text-xl font-semibold pb-6 text-Gray-900">
          Business Details
        </h2>
        <div className="flex flex-col gap-y-4 divide-y-2 border border-Gray-200 rounded-lg">
          {data?.business_details?.map((item, i) => (
            <div key={i} className="flex flex-col gap-y-4  p-4">
              {/* Input item */}
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="post_title"
                  className="text-Gray-700 text-sm font-medium"
                >
                  Detail List:
                </label>
                <div>
                  <p className="font-semibold text-Gray-900">
                    {item.menu_title?.en}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="post_title"
                    className="text-Gray-700 text-sm font-medium "
                  >
                    Description:{" "}
                    <span className="text-Gray-300 font-medium text-xs">
                      TR
                    </span>
                  </label>
                  <div className="border border-Gray-200 p-2 rounded-lg text-Gray-900">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description?.tr }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="post_title"
                    className="text-Gray-700 text-sm font-medium "
                  >
                    Description:{" "}
                    <span className="text-Gray-300 font-medium text-xs">
                      EN
                    </span>
                  </label>
                  <div className="border border-Gray-200 p-2 rounded-lg text-Gray-900">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description?.en }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
