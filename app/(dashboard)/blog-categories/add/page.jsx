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

export default function BlogCategoryAddForm() {
  const router = useRouter();
  const { dispatchNotification } = useContext(UtilityContext);
  const headingCardRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [actionButtonActive, setActionButtonActive] = useState(false);
  const [lang, setLang] = useState("tr");

  const initInput = {
    category: { en: "", tr: "" },
    status: true,
  };
  const [formData, setFormData] = useState(initInput);

  const handleInput = ({ target: { name, value } }) => {
    setFormData((prev) => {
      return { ...prev, [name]: { ...prev[name], [lang]: value } };
    });
  };

  const handleCheckboxInput = ({ target: { name, checked } }) => {
    setFormData((prev) => {
      return { ...prev, [name]: checked };
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
    const languagableInputs = ["category"];
    const switchInput = ["status"];
    const data = new FormData();
    for (const item in formData) {
      if (switchInput.includes(item)) {
        data.append(item, Number(formData[item]));
        continue;
      }
      if (languagableInputs.includes(item)) {
        data.append(`${item}[en]`, formData[item].en);
        data.append(`${item}[tr]`, formData[item].tr);
        continue;
      }
      data.append(item, formData[item]);
    }
    return data;
  };

  const handleSubmit = async () => {
    try {
      setActionButtonActive(true);
      const form_data = parseFormData();
      const {
        data: { status, message },
      } = await Axios.post("blog/categories", form_data, {
        headers: { "Content-Type": "application/json" },
      });
      if (status) {
        dispatchNotification({
          status: true,
          msg: message,
          type: "success",
        });
        router.push("/blog-categories");
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
                href="/blog-categories"
                className="hover:-translate-x-1 transition-transform duration-150"
              >
                <ArrowLeftLong className="text-black" />
              </Link>
              <span>Add Category for Blog</span>
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
                Category Title{" "}
                <span className="text-Gray-300 font-medium text-xs">
                  {lang == "en" ? "[EN]" : ""}
                </span>
              </label>
              <div>
                <Input
                  name="category"
                  value={formData.category[lang]}
                  onChange={handleInput}
                  onBlur={handleTranslateInput}
                  placeholder="Type category title here..."
                />
              </div>
            </div>

            {/* Input item */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="post_title"
                className="text-black text-sm font-medium "
              >
                Status
              </label>
              <div>
                <input
                  type="checkbox"
                  name="status"
                  className="toggle toggle-success"
                  checked={formData.status}
                  onChange={handleCheckboxInput}
                />
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
