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
import HOC from "@/components/HOC/HOC";
import Axios from "@/axios/Axios";
import { UtilityContext } from "@/contexts/UtilityContext";
import { useRouter } from "next/navigation";
import FeaturedOnSection from "./FeaturedOnSection";
import PartnersSection from "./PartnersSection";
import HeroSection from "./HeroSection";
import AboutUsSection from "./AboutUsSection";
import OpportunitySection from "./OpportunitySection";
import JoinUsSection from "./JoinUsSection";
import PortfolioSection from "./PortfolioSection";
import GallerySection from "./GallerySection";
import NewsletterSection from "./NewsletterSection";

const SUBMIT_FIELDS = {
  hero: [
    "hero_subheading",
    "hero_carousel_images",
    "number_of_transactions",
    "number_of_campaigns",
    "number_of_countries",
  ],
  about_us: ["about_us"],
  opportunity: ["opportunity_heading", "opportunity_subheading"],
  join_us: [
    "join_us_tagline",
    "join_us_make_money_label",
    "join_us_need_money_label",
  ],
  portfolio: ["portfolio_heading", "portfolio_subheading", "portfolio"],
  gallery: ["gallery"],
  featured_on: ["featured_on"],
  partners: ["partners"],
  newsletter: ["newsletter_heading", "newsletter_subheading"],
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
    hero_heading: { tr: "", en: "" },
    hero_subheading: { tr: "", en: "" },
    hero_carousel_images: [{ path: "", full_path: "" }],
    number_of_transactions: "",
    number_of_campaigns: "",
    number_of_countries: "",

    about_us: [
      {
        id: null,
        title: { tr: "", en: "" },
        content: { tr: "", en: "" },
        icon: "",
      },
    ],

    opportunity_heading: { tr: "", en: "" },
    opportunity_subheading: { tr: "", en: "" },

    join_us_tagline: { tr: "", en: "" },
    join_us_make_money_label: { tr: "", en: "" },
    join_us_need_money_label: { tr: "", en: "" },

    portfolio_heading: { tr: "", en: "" },
    portfolio_subheading: { tr: "", en: "" },
    portfolio: [
      {
        id: null,
        heading: { tr: "", en: "" },
        subheading: { tr: "", en: "" },
        details: { tr: "", en: "" },
        link_label: { tr: "", en: "" },
        link_href: "",
      },
    ],

    gallery: [{ path: "", full_path: "" }],
    featured_on: [{ path: "", full_path: "" }],
    partners: [{ path: "", full_path: "" }],

    newsletter_heading: { tr: "", en: "" },
    newsletter_subheading: { tr: "", en: "" },
  };
  const [formData, setFormData] = useState(initInput);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { status, data },
        } = await Axios.get(`home-page/${slug}/edit`);
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
    setFormData((prev) => {
      return { ...prev, [name]: { ...prev[name], [lang]: value } };
    });
  };

  const handleMultiInput = ({ target: { name, value } }) => {
    const [field, attr, i] = name.split(".");

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

  const handleArrayInput = ({ target: { name, value } }) => {
    const [field, i] = name.split(".");

    const copyFormData = [...formData[field]];
    const selectedItem = copyFormData[i];
    selectedItem[lang] = value;
    copyFormData[i] = selectedItem;

    setFormData((prev) => {
      return { ...prev, [field]: copyFormData };
    });
  };

  const handleInputNoLang = ({ target: { name, value } }) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleMultiInputNoLang = ({ target: { name, value } }) => {
    const [field, attr, i] = name.split(".");

    const copyFormData__array = [...formData[field]];
    const selectedItem__object = copyFormData__array[i];
    selectedItem__object[attr] = value;
    copyFormData__array[i] = selectedItem__object;

    setFormData((prev) => {
      return { ...prev, [field]: copyFormData__array };
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
      "hero_heading",
      "hero_subheading",
      "opportunity_heading",
      "opportunity_subheading",
      "join_us_tagline",
      "join_us_make_money_label",
      "join_us_need_money_label",
      "portfolio_heading",
      "portfolio_subheading",
      "newsletter_heading",
      "newsletter_subheading",
      "title",
      "content",
      "heading",
      "subheading",
      "details",
      "category",
      "link_label",
    ];
    const imageInput = [
      "hero_carousel_images",
      "gallery",
      "featured_on",
      "partners",
      "image",
    ];
    const arrayInput = [
      "hero_carousel_images",
      "gallery",
      "featured_on",
      "partners",
    ];
    const arrayOfObjectInput = ["portfolio", "about_us"];

    const data = new FormData();

    for (const item of SUBMIT_FIELDS[slug]) {
      /*  Plain Array items - Image|Lang|text */
      if (arrayInput.includes(item)) {
        for (const el of formData[item]) {
          if (imageInput.includes(item)) {
            if (el?.path) {
              data.append(`${item}[]`, el.path);
            }
          } else if (languagableInputs.includes(item)) {
            data.append(`${item}[en]`, el.en);
            data.append(`${item}[tr]`, el.tr);
          } else {
            data.append(`${item}[]`, el);
          }
        }
        continue;
      }

      /*  Array of Object items - Image|Lang|text */
      if (arrayOfObjectInput.includes(item)) {
        for (const i in formData[item]) {
          for (const el in formData[item][i]) {
            if (imageInput.includes(el)) {
              if (formData[item][i][el].path) {
                data.append(`${el}[]`, formData[item][i][el].path);
              }
            } else if (languagableInputs.includes(el)) {
              data.append(`${el}[en][]`, formData[item][i][el].en);
              data.append(`${el}[tr][]`, formData[item][i][el].tr);
            } else {
              data.append(`${el}[]`, formData[item][i][el]);
            }
          }
        }
        continue;
      }

      /* Plain image input */
      if (imageInput.includes(item)) {
        if (formData[item]?.path) {
          data.append(item, formData[item]?.path);
        }
        continue;
      }

      /* Plain lang input */
      if (languagableInputs.includes(item)) {
        data.append(`${item}[en]`, formData[item].en);
        data.append(`${item}[tr]`, formData[item].tr);
        continue;
      }
      data.append(`${item}`, formData[item]);
    }
    return data;
  };

  const handleSubmit = async () => {
    try {
      setActionButtonActive(true);
      const form_data = parseFormData();
      form_data.append("_method", "PUT");
      const {
        data: { status, message },
      } = await Axios.post(`home-page/update/${slug}`, form_data, {
        headers: { "Content-Type": "application/json" },
      });
      if (status) {
        dispatchNotification({
          status: true,
          msg: message,
          type: "success",
        });
        router.push("/home-page");
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

  const handleTranslateMultiInput = async ({ target: { name, value } }) => {
    try {
      if (lang != "tr") {
        return;
      }
      const [field, attr, i] = name.split(".");
      const translateData = new FormData();
      translateData.append("text", value);
      const {
        data: { status, data: enContent, message },
      } = await Axios.post("translate", translateData);
      if (status) {
        const copyFormData__array = [...formData[field]];
        const selectedItem__object = copyFormData__array[i];
        const targetFiledValueLangObj = selectedItem__object[attr];
        targetFiledValueLangObj.en = enContent;
        selectedItem__object[attr] = targetFiledValueLangObj;
        copyFormData__array[i] = selectedItem__object;

        setFormData((prev) => {
          return { ...prev, [field]: copyFormData__array };
        });
      } else {
        console.log(message);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAddMoreItem = () => {
    let pushElement = null;
    let multiAttrItem = null;
    switch (slug) {
      case "about_us":
        multiAttrItem = "about_us";
        pushElement = {
          id: null,
          title: { tr: "", en: "" },
          content: { tr: "", en: "" },
          icon: "",
        };
        break;

      case "portfolio":
        multiAttrItem = "portfolio";
        pushElement = {
          id: null,
          heading: { tr: "", en: "" },
          subheading: { tr: "", en: "" },
          details: { tr: "", en: "" },
          link_label: { tr: "", en: "" },
          link_href: "",
        };
        break;

      case "gallery":
        multiAttrItem = "gallery";
        pushElement = { path: "", full_path: "" };
        break;

      case "featured_on":
        multiAttrItem = "featured_on";
        pushElement = { path: "", full_path: "" };
        break;

      case "partners":
        multiAttrItem = "partners";
        pushElement = { path: "", full_path: "" };
        break;
    }

    const data__copy = [...formData[multiAttrItem]];
    data__copy.push(pushElement);
    setFormData((prev) => {
      return { ...prev, [multiAttrItem]: data__copy };
    });
  };

  if (!SLUGs.includes(slug)) {
    return null;
  }
  const hasAddMoreBtn = [
    "about_us",
    "portfolio",
    "featured_on",
    "partners",
    "gallery",
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
                href="/home-page"
                className="hover:-translate-x-1 transition-transform duration-150"
              >
                <ArrowLeftLong className="text-black" />
              </Link>
              <span className="capitalize">
                Edit {slug.split("_").join(" ")} Section
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
        {slug === "hero" && (
          <HeroSection
            formData={formData}
            handleInput={handleInput}
            handleInputNoLang={handleInputNoLang}
            handleTranslateInput={handleTranslateInput}
            handleArrayFileInput={handleArrayFileInput}
            lang={lang}
            setLang={setLang}
          />
        )}

        {slug === "about_us" && (
          <AboutUsSection
            formData={formData}
            handleMultiInput={handleMultiInput}
            handleMultiInputNoLang={handleMultiInputNoLang}
            handleTranslateMultiInput={handleTranslateMultiInput}
            lang={lang}
            setLang={setLang}
          />
        )}

        {slug === "opportunity" && (
          <OpportunitySection
            formData={formData}
            handleInput={handleInput}
            handleTranslateInput={handleTranslateInput}
            lang={lang}
            setLang={setLang}
          />
        )}

        {slug === "join_us" && (
          <JoinUsSection
            formData={formData}
            handleInput={handleInput}
            handleTranslateInput={handleTranslateInput}
            lang={lang}
            setLang={setLang}
          />
        )}

        {slug === "portfolio" && (
          <PortfolioSection
            formData={formData}
            handleInput={handleInput}
            handleTranslateInput={handleTranslateInput}
            handleMultiInput={handleMultiInput}
            handleMultiInputNoLang={handleMultiInputNoLang}
            handleTranslateMultiInput={handleTranslateMultiInput}
            lang={lang}
            setLang={setLang}
          />
        )}

        {slug === "gallery" && (
          <GallerySection
            formData={formData}
            handleInput={handleArrayFileInput}
          />
        )}

        {slug === "featured_on" && (
          <FeaturedOnSection
            formData={formData}
            handleInput={handleArrayFileInput}
          />
        )}
        {slug === "partners" && (
          <PartnersSection
            formData={formData}
            handleInput={handleArrayFileInput}
          />
        )}

        {slug === "newsletter" && (
          <NewsletterSection
            formData={formData}
            handleInput={handleInput}
            handleTranslateInput={handleTranslateInput}
            lang={lang}
            setLang={setLang}
          />
        )}
      </section>
    </HOC>
  );
}
