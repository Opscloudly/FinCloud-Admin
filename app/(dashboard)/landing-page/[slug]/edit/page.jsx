"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Textarea from "@/components/UI/Textarea";
import {
  ArrowLeftLong,
  PlusIcon,
  TurkeyFlagIcon,
  UploadIcon,
} from "@/components/Icons";
import Link from "next/link";
import TextareaEditor from "@/components/UI/TextareaEditor";
import HOC from "@/components/HOC/HOC";
import GlobalGallery from "@/components/ImageLibray/GlobalGallery";
import Image from "next/image";
import Axios from "@/axios/Axios";
import { UtilityContext } from "@/contexts/UtilityContext";
import { useRouter } from "next/navigation";
import HeroBanner from "./HeroBanner";
import InputFile from "@/components/UI/InputFile";
import HeroHeading from "./HeroHeading";
import HeroSubHeading from "./HeroSubHeading";
import FeaturedOn from "./FeaturedOn";
import Partners from "./Partners";
import JoinUs from "./JoinUs";
import OurName from "./OurName";
import Contents from "./Contents";

const SUBMIT_FIELDS = {
  banner: ["hero_banner"],
  heading: ["hero_title"],
  subheading: ["hero_subtitle"],
  featured: ["featured_on"],
  join_us: ["join_us"],
  our_name: ["on_heading", "on_title", "on_content", "on_image"],
  partners: ["partners"],
  contents: ["contents"],
};
const SLUGs = Object.keys(SUBMIT_FIELDS);

export default function BlogAddForm({ params: { slug } }) {
  const router = useRouter();
  const { dispatchNotification } = useContext(UtilityContext);
  const headingCardRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [actionButtonActive, setActionButtonActive] = useState(false);
  const [lang, setLang] = useState("tr");

  const initInput = {
    hero_banner: { path: null, full_path: null },
    hero_title: { tr: "", en: "" },
    hero_subtitle: { tr: "", en: "" },
    featured_on: [{ path: "", full_path: "" }],
    partners: [{ path: "", full_path: "" }],
    join_us: [{ tr: "", en: "" }],
    on_heading: { tr: "", en: "" },
    on_title: { tr: "", en: "" },
    on_content: { tr: "", en: "" },
    on_image: { path: "", full_path: "" },
    contents: [
      {
        id: null,
        heading: { tr: "", en: "" },
        title: { tr: "", en: "" },
        content: { tr: "", en: "" },
        image: { path: "", full_path: "" },
      },
    ],
  };
  const [formData, setFormData] = useState(initInput);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { status, data },
        } = await Axios.get(`landing-page/${slug}/edit`);
        if (status) {
          populateFormFields(data);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  const populateFormFields = (data) => {
    const editableData = {};
    for (const item in initInput) {
      editableData[item] = data[item];
    }
    setFormData(editableData);
  };

  const handleInput = ({ target: { name, value } }) => {
    const [field, lang] = name.split(".");
    setFormData((prev) => {
      return { ...prev, [field]: { ...prev[field], [lang]: value } };
    });
  };

  const handleInputNoLang = ({ target: { name, value } }) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleArrayFileInput = ({ target: { name, value } }) => {
    const [field, i] = name.split(".");
    const copyFormData = [...formData[field]];
    copyFormData[i] = value;
    setFormData((prev) => {
      return { ...prev, [field]: copyFormData };
    });
  };

  const handleArrayInput = ({ target: { name, value } }) => {
    const [field, lang, i] = name.split(".");

    const copyFormData = [...formData[field]];
    const selectedItem = copyFormData[i];
    selectedItem[lang] = value;
    copyFormData[i] = selectedItem;

    setFormData((prev) => {
      return { ...prev, [field]: copyFormData };
    });
  };

  const handleMultiInput = ({ target: { name, value } }) => {
    const [field, attr, lang, i] = name.split(".");

    const copyFormData__array = [...formData[field]];
    const selectedItem__object = copyFormData__array[i];
    const targetFiledValueLangObj = selectedItem__object[attr];
    targetFiledValueLangObj[lang] = value;
    selectedItem__object[attr] = targetFiledValueLangObj;
    copyFormData__array[i] = selectedItem__object;

    setFormData((prev) => {
      return { ...prev, [field]: copyFormData__array };
    });
  };

  const handleMultiFileInput = ({ target: { name, value } }) => {
    const [field, attr, i] = name.split(".");

    const copyFormData = [...formData[field]];
    const selectedItem = copyFormData[i];
    selectedItem[attr] = value;
    copyFormData[i] = selectedItem;
    setFormData((prev) => {
      return { ...prev, [field]: copyFormData };
    });
  };

  const parseFormData = () => {
    const languagableInputs = [
      "hero_title",
      "hero_subtitle",
      "ournname_heading",
      "ourname_title",
      "ourname_content",
      "on_heading",
      "on_title",
      "on_content",
    ];
    const imageInput = ["hero_banner", "on_image"];
    const arrayFileInput = ["featured_on", "partners"];
    const arrayLangInput = ["join_us"];
    const data = new FormData();

    for (const item of SUBMIT_FIELDS[slug]) {
      if (imageInput.includes(item)) {
        if (formData[item]?.path) {
          data.append(item, formData[item]?.path);
        }
        continue;
      }
      if (languagableInputs.includes(item)) {
        data.append(`${item}[en]`, formData[item].en);
        data.append(`${item}[tr]`, formData[item].tr);
        continue;
      }
      if (arrayFileInput.includes(item)) {
        for (const file of formData[item]) {
          if (file?.path) {
            data.append(`${item}[]`, file.path);
          }
        }
        continue;
      }
      if (arrayLangInput.includes(item)) {
        for (const itemObj of formData[item]) {
          if (itemObj?.en && itemObj?.tr) {
            data.append(`${item}_tr[]`, itemObj.tr);
            data.append(`${item}_en[]`, itemObj.en);
          }
        }
        continue;
      }
      if (formData[item]) {
        data.append(item, formData[item]);
      }
    }
    return data;
  };

  const parseContentFormData = () => {
    const languagableInputs = ["heading", "title", "content"];
    const imageInput = ["image"];
    const data = new FormData();

    for (const item of SUBMIT_FIELDS.contents) {
      for (const fd of formData[item]) {
        for (const i in fd) {
          if (languagableInputs.includes(i)) {
            data.append(`${i}[tr][]`, fd[i].tr);
            data.append(`${i}[en][]`, fd[i].en);
            continue;
          }
          if (imageInput.includes(i)) {
            data.append(`${i}[]`, fd[i].path);
            continue;
          }
          data.append(`${i}[]`, fd[i]);
        }
      }
    }
    return data;
  };

  const handleSubmit = async () => {
    try {
      setActionButtonActive(true);
      const form_data =
        slug == "contents" ? parseContentFormData() : parseFormData();
      form_data.append("_method", "PUT");
      const {
        data: { status, message },
      } = await Axios.post(`landing-page/update/${slug}`, form_data, {
        headers: { "Content-Type": "application/json" },
      });
      if (status) {
        dispatchNotification({
          status: true,
          msg: message,
          type: "success",
        });
        router.push("/landing-page");
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

  const handleTranslateInput = async ({ target: { name, value } }) => {
    try {
      const [field, lang] = name.split(".");
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
          return { ...prev, [field]: { ...prev[field], en: enContent } };
        });
      } else {
        console.log(message);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAddMoreItem = () => {
    let multipleItemAttr = null;
    let pushElement = null;
    switch (slug) {
      case "featured":
        multipleItemAttr = "featured_on";
        pushElement = { path: "", full_path: "" };
        break;

      case "partners":
        multipleItemAttr = "partners";
        pushElement = { path: "", full_path: "" };
        break;

      case "join_us":
        multipleItemAttr = "join_us";
        pushElement = { tr: "", en: "" };
        break;

      case "contents":
        multipleItemAttr = "contents";
        pushElement = {
          id: null,
          heading: { tr: "", en: "" },
          title: { tr: "", en: "" },
          content: { tr: "", en: "" },
          image: { path: "", full_path: "" },
        };
        break;
    }
    if (!multipleItemAttr) return;

    const data__copy = [...formData[multipleItemAttr]];
    data__copy.push(pushElement);
    setFormData((prev) => {
      return { ...prev, [multipleItemAttr]: data__copy };
    });
  };

  if (!SLUGs.includes(slug)) {
    return null;
  }
  const hasAddMoreBtn = [
    "featured",
    "partners",
    "join_us",
    "contents",
  ].includes(slug);
  return (
    <HOC type="dashboard">
      <section ref={headingCardRef} className="flex flex-col gap-y-6">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isSticky ? "stick-to-top" : ""
          }`}
        >
          <div className="flex items-center gap-x-4">
            <h2 className="flex text-black text-[28px] leading-[32px] font-medium">
              <Link
                href="/landing-page"
                className="hover:-translate-x-1 transition-transform duration-150"
              >
                <ArrowLeftLong className="text-black" />
              </Link>
              <span className="capitalize">
                Edit {slug.split("_").join(" ")}
              </span>
            </h2>
            {hasAddMoreBtn && (
              <Button
                label="Add more"
                onClick={handleAddMoreItem}
                className="bg-Gray-500 text-white"
              />
            )}
          </div>
          <div>
            <Button
              label="Update"
              disabled={actionButtonActive}
              onClick={handleSubmit}
              className="bg-main-600"
            />
          </div>
        </div>
        {/* content */}
        {slug === "banner" && (
          <HeroBanner formData={formData} handleInput={handleInputNoLang} />
        )}
        {slug === "heading" && (
          <HeroHeading
            formData={formData}
            handleInput={handleInput}
            handleTranslateInput={handleTranslateInput}
          />
        )}
        {slug === "subheading" && (
          <HeroSubHeading
            formData={formData}
            handleInput={handleInput}
            handleTranslateInput={handleTranslateInput}
          />
        )}
        {slug === "featured" && (
          <FeaturedOn formData={formData} handleInput={handleArrayFileInput} />
        )}
        {slug === "partners" && (
          <Partners formData={formData} handleInput={handleArrayFileInput} />
        )}
        {slug === "join_us" && (
          <JoinUs formData={formData} handleInput={handleArrayInput} />
        )}
        {slug === "our_name" && (
          <OurName
            formData={formData}
            handleInput={handleInput}
            handleFileInput={handleInputNoLang}
          />
        )}
        {slug === "contents" && (
          <Contents
            formData={formData}
            handleInput={handleMultiInput}
            handleFileInput={handleMultiFileInput}
          />
        )}
        {/* content end */}
      </section>
    </HOC>
  );
}
