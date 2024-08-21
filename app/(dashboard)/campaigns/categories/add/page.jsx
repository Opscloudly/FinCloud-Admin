"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { ArrowLeftLong } from "@/components/Icons";
import Link from "next/link";
import HOC from "@/components/HOC/HOC";
import Axios from "@/axios/Axios";
import { UtilityContext } from "@/contexts/UtilityContext";
import { useRouter } from "next/navigation";
import Textarea from "@/components/UI/Textarea";
import InputFile from "@/components/UI/InputFile";

export default function BlogCategoryAddForm() {
  const router = useRouter();
  const { dispatchNotification } = useContext(UtilityContext);
  const headingCardRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [actionButtonActive, setActionButtonActive] = useState(false);
  const [lang, setLang] = useState("tr");

  const initInput = {
    name: { en: "", tr: "" },
    image: { path: "", full_path: "" },
    meta_title: { en: "", tr: "" },
    meta_keyword: { en: "", tr: "" },
    meta_description: { en: "", tr: "" },
    remarks: "",
  };
  const [formData, setFormData] = useState(initInput);

  const handleInput = ({ target: { name, value } }) => {
    setFormData((prev) => {
      return { ...prev, [name]: { ...prev[name], [lang]: value } };
    });
  };

  const handleInputNoLang = ({ target: { name, value } }) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleTranslateInput = async ({ target: { name, value } }) => {
    try {
      if (lang != "tr") {
        return;
      }
      const translateData = new FormData();
      translateData.append("text", value);
      const {
        data: { status, data: enContent, message },
      } = await Axios.post("translate", translateData);
      if (status) {
        setFormData((prev) => {
          return { ...prev, [name]: { ...prev[name], en: enContent } };
        });
      } else {
        console.log(message);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const parseFormData = () => {
    const languagableInputs = [
      "name",
      "meta_title",
      "meta_description",
      "meta_keyword",
    ];
    const fileInputs = ["image"];
    const data = new FormData();
    for (const item in formData) {
      if (languagableInputs.includes(item)) {
        if (formData[item].en && formData[item].tr) {
          data.append(`${item}[en]`, formData[item].en);
          data.append(`${item}[tr]`, formData[item].tr);
        }
        continue;
      }
      if (fileInputs.includes(item)) {
        if (formData[item].path) {
          data.append(item, formData[item].path);
        }
        continue;
      }
      if (formData[item]) {
        data.append(item, formData[item]);
      }
    }
    return data;
  };

  const handleSubmit = async () => {
    try {
      setActionButtonActive(true);
      const form_data = parseFormData();
      const {
        data: { status, message },
      } = await Axios.post("campaigns/categories", form_data, {
        headers: { "Content-Type": "application/json" },
      });
      if (status) {
        dispatchNotification({
          status: true,
          msg: message,
          type: "success",
        });
        router.push("/campaigns/categories");
      } else {
        console.log(message);
        dispatchNotification({
          status: true,
          msg: message,
          type: "danger",
        });
      }
    } catch (e) {
      console.log(e.message);
      dispatchNotification({
        status: true,
        msg: "Something went wrong in client side",
        type: "danger",
      });
    } finally {
      setActionButtonActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    /* Clear on unmount */
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (headingCardRef.current) {
      const offsetTop = headingCardRef.current.getBoundingClientRect().top;
      setIsSticky(offsetTop <= 0);
    }
  };

  return (
    <HOC type="dashboard">
      <section ref={headingCardRef} className="flex flex-col gap-y-6">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isSticky ? "stick-to-top" : ""
          }`}
        >
          <div className="flex gap-x-2">
            <h2 className="flex text-black text-[28px] leading-[32px] font-medium">
              <Link
                href="/campaigns/categories"
                className="hover:-translate-x-1 transition-transform duration-150"
              >
                <ArrowLeftLong className="text-black" />
              </Link>
              <span>Add Category</span>
            </h2>
          </div>
          <div>
            <Button
              label="Save"
              disabled={actionButtonActive}
              onClick={handleSubmit}
              className="bg-main-600"
            />
          </div>
        </div>
        <div className="grid grid-cols-11 gap-6">
          <div className="col-span-8 flex flex-col gap-y-5">
            {/* Input item */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="post_title"
                className="text-black text-sm font-medium "
              >
                Category Name{" "}
                <span className="text-Gray-300 font-medium text-xs">
                  {lang == "en" ? "[EN]" : ""}
                </span>
              </label>
              <div>
                <Input
                  name="name"
                  value={formData.name[lang]}
                  onChange={handleInput}
                  onBlur={handleTranslateInput}
                  placeholder="Type category name here..."
                />
              </div>
            </div>

            {/* Input item */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="post_title"
                className="text-black text-sm font-medium "
              >
                Remarks
              </label>
              <div>
                <Textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputNoLang}
                  placeholder="Type remarks here..."
                />
              </div>
            </div>

            {/* Input item */}
            <div className="flex flex-col gap-y-2">
              <InputFile
                name="image"
                src={formData.image.full_path}
                onChange={handleInputNoLang}
              />
            </div>

            {/* Input item */}
            <div className="flex flex-col gap-y-5 p-4 border border-Gray-200 rounded-lg">
              <h4 className="text=lg font-medium text-black">SEO Options</h4>
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="post_title"
                  className="text-black text-sm font-medium "
                >
                  Meta Title{" "}
                  <span className="text-Gray-300 font-medium text-xs">
                    {lang == "en" ? "[EN]" : ""}
                  </span>
                </label>
                <div>
                  <Input
                    name="meta_title"
                    value={formData.meta_title[lang]}
                    onChange={handleInput}
                    onBlur={handleTranslateInput}
                    placeholder="Add meta title"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="post_title"
                  className="text-black text-sm font-medium "
                >
                  Meta Keyword{" "}
                  <span className="text-Gray-300 font-medium text-xs">
                    {lang == "en" ? "[EN]" : ""}
                  </span>
                </label>
                <div>
                  <Input
                    name="meta_keyword"
                    value={formData.meta_keyword[lang]}
                    onChange={handleInput}
                    onBlur={handleTranslateInput}
                    placeholder="Add meta keyword"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="post_title"
                  className="text-black text-sm font-medium "
                >
                  Meta Description{" "}
                  <span className="text-Gray-300 font-medium text-xs">
                    {lang == "en" ? "[EN]" : ""}
                  </span>
                </label>
                <div>
                  <Input
                    name="meta_description"
                    value={formData.meta_description[lang]}
                    onChange={handleInput}
                    onBlur={handleTranslateInput}
                    placeholder="add meta description"
                  />
                </div>
              </div>
            </div>

            {/* Input item */}
          </div>
          <div className="col-span-3 flex flex-col gap-y-4">
            <div className="rounded-lg border border-Gray-200">
              <div className="px-3 py-4 border-b">
                <h4 className="text-lg font-medium text-black">Languages</h4>
              </div>
              <div className="px-3 py-4">
                <div>
                  <label
                    htmlFor="lang"
                    className="text-sm font-medium text-black"
                  >
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
                {/* <div>
                  <button
                    type="button"
                    className="flex items-center py-1.5 group transition-all duration-200 ease-out"
                  >
                    <PlusIcon className="text-main-700 group-hover:text-main-800" />
                    <span className="text-main-700 text-sm font-medium group-hover:text-main-800">
                      Add Translation
                    </span>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </HOC>
  );
}
