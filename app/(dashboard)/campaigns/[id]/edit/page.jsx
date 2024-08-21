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
import { useParams, useRouter } from "next/navigation";
import InputFile from "@/components/UI/InputFile";
import Select from "@/components/UI/Select";
import InputFileMultiple from "@/components/UI/InputFileMultiple";
import InputDate from "@/components/UI/InputDate";
import InputWithAddon from "@/components/UI/InputWithAddon";

export default function CampaignAddForm() {
  const { id } = useParams();
  const router = useRouter();
  const { dispatchNotification } = useContext(UtilityContext);
  const headingCardRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [actionButtonActive, setActionButtonActive] = useState(false);
  const [lang, setLang] = useState("tr");

  const initInput = {
    title: { en: "", tr: "" },
    description: { en: "", tr: "" },
    media: [],
    start_date: "",
    end_date: "",
    minimum_goal: "",
    maximum_goal: "",
    usage_of_fund: "",
    return_of_investment: "",
    city: "",
    remarks: "",

    category: "",
    featured_image: { path: null, full_path: null },
  };
  const [formData, setFormData] = useState(initInput);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  const [imageLibrary, setImageLibrary] = useState({
    status: false,
    is_multi: false,
    form_field: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { status, data },
        } = await Axios.get(`issuer/campaign-helper-data/${id}`);
        if (status) {
          setCategories(data.categories);
          setCities(data.cities);
          setFormData(data.campaign);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  const handleInput = ({ target: { name, value } }) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleInputMultiLang = ({ target: { name, value } }) => {
    setFormData((prev) => {
      return { ...prev, [name]: { ...prev[name], [lang]: value } };
    });
  };

  const handleCheckboxInput = ({ target: { name, value, checked } }) => {
    let oldItems = [...formData[name]];
    if (checked) {
      oldItems.push(value);
    } else {
      oldItems = oldItems.filter((item) => item !== value);
    }
    setFormData((prev) => {
      return { ...prev, [name]: oldItems };
    });
  };

  const handlePushArrayInput = ({ target: { name, value } }) => {
    if (name === "media") {
      const exists = formData[name].find((item) => item.path == value.path);
      if (exists) {
        dispatchNotification({
          status: true,
          msg: "Item already exists",
          type: "danger",
        });
        return;
      }
    }

    const copyFormData = [...formData[name]];
    copyFormData.push(value);
    setFormData((prev) => {
      return { ...prev, [name]: copyFormData };
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
      } = await Axios.post("issuer/translate", translateData);
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
    const languagableInputs = ["title", "description"];
    const imageInput = ["featured_image"];
    const arrayImageInput = ["media"];
    const data = new FormData();
    for (const item in formData) {
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
      if (arrayImageInput.includes(item)) {
        for (const mediaImage of formData[item]) {
          data.append(`${item}[]`, mediaImage.path);
        }
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
      form_data.append("_method", "PUT");
      const {
        data: { status, message },
      } = await Axios.post(`issuer/campaigns/${id}`, form_data, {
        headers: { "Content-Type": "application/json" },
      });
      if (status) {
        dispatchNotification({
          status: true,
          msg: message,
          type: "success",
        });
        router.push("/dashboard/campaigns");
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

  /* Image library START*/
  const handleToggleImageLibrary = (e) => {
    const { name, multi } = e.target.dataset;

    setImageLibrary((prev) => {
      return {
        status: !prev.status,
        is_multi: Boolean(parseInt(multi)),
        form_field: name,
      };
    });
  };

  const handleFileInput = (name, file) => {
    if (!imageLibrary.is_multi) {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: { path: file[0].path, full_path: file[0].full_path },
        };
      });
    } else {
      const pathData = file.map((item) => {
        return { path: item.path, full_path: item.full_path };
      });
      setFormData((prev) => {
        return {
          ...prev,
          [name]: pathData,
        };
      });
    }

    handleToggleImageLibrary({
      target: { dataset: { name: null, multi: false } },
    });
  };
  /* Image library END*/

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
                href="/dashboard/campaigns"
                className="hover:-translate-x-1 transition-transform duration-150"
              >
                <ArrowLeftLong className="text-black" />
              </Link>
              <span>Edit Campaign</span>
            </h2>
          </div>
          <div>
            <Button
              label="Update Request"
              disabled={actionButtonActive}
              onClick={handleSubmit}
              className="bg-main-600"
            />
          </div>
        </div>
        <div className="grid grid-cols-11 gap-6">
          <div className="col-span-8 flex flex-col gap-5 pb-32">
            <div className="flex flex-col gap-5 border border-Gray-200 rounded-lg px-4 py-2.5">
              {/* Input item */}
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="post_title"
                  className="text-black text-sm font-medium "
                >
                  Campaign Name{" "}
                  <span className="text-Gray-300 font-medium text-xs">
                    {lang == "en" ? "[EN]" : ""}
                  </span>
                </label>
                <div>
                  <Input
                    name="title"
                    value={formData.title[lang]}
                    onChange={handleInputMultiLang}
                    onBlur={handleTranslateInput}
                    placeholder="Type campaign name here..."
                  />
                </div>
              </div>

              {/* Input item */}
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="post_title"
                  className="text-black text-sm font-medium "
                >
                  Description{" "}
                  <span className="text-Gray-300 font-medium text-xs">
                    {lang == "en" ? "[EN]" : ""}
                  </span>
                </label>
                <div>
                  <Textarea
                    name="description"
                    value={formData.description[lang]}
                    onChange={handleInputMultiLang}
                    onBlur={handleTranslateInput}
                    placeholder="Type product description here..."
                  />
                </div>
              </div>
            </div>
            {/* Input item */}
            <InputFileMultiple
              name="media"
              data={formData.media}
              onChange={handlePushArrayInput}
              label="Campaign Media"
            />

            {/* Input group */}
            <div className="flex flex-col gap-y-6 p-4 border border-gray-200 rounded-lg">
              <h2 className="text-black text-lg font-medium">
                Fund-raising Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input item */}
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="post_title"
                    className="text-black text-sm font-medium "
                  >
                    Start Date
                  </label>
                  <div>
                    <InputDate
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleInput}
                      placeholder="dd/mm/yyyyy."
                    />
                  </div>
                </div>
                {/* Input item */}
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="post_title"
                    className="text-black text-sm font-medium "
                  >
                    End Date
                  </label>
                  <div>
                    <InputDate
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleInput}
                      placeholder="dd/mm/yyyyy."
                    />
                  </div>
                </div>
                {/* Input item */}
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="post_title"
                    className="text-black text-sm font-medium"
                  >
                    Minimum Goal
                  </label>
                  <div>
                    <Input
                      type="number"
                      name="minimum_goal"
                      value={formData.minimum_goal}
                      onChange={handleInput}
                      placeholder="enter number"
                    />
                  </div>
                </div>
                {/* Input item */}
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="post_title"
                    className="text-black text-sm font-medium "
                  >
                    Mazimum Goal
                  </label>
                  <div>
                    <Input
                      type="number"
                      name="maximum_goal"
                      value={formData.maximum_goal}
                      onChange={handleInput}
                      placeholder="enter number"
                    />
                  </div>
                </div>
                {/* Input item */}
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="post_title"
                    className="text-black text-sm font-medium "
                  >
                    Usage of Fund
                  </label>
                  <div>
                    <Input
                      name="usage_of_fund"
                      value={formData.usage_of_fund}
                      onChange={handleInput}
                      placeholder="enter the info"
                    />
                  </div>
                </div>
                {/* Input item */}
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="post_title"
                    className="text-black text-sm font-medium "
                  >
                    Return of Investment
                  </label>
                  <div>
                    <InputWithAddon
                      type="number"
                      name="return_of_investment"
                      value={formData?.return_of_investment}
                      onChange={handleInput}
                      rightAddon="%"
                      placeholder="enter number..."
                    />
                  </div>
                </div>
                {/* Input item */}
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="post_title"
                    className="text-black text-sm font-medium "
                  >
                    City
                  </label>
                  <div>
                    <Select
                      name="city"
                      value={formData.city}
                      onChange={handleInput}
                      options={cities}
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
                    <Input
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleInput}
                      placeholder="optional"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 flex flex-col gap-y-4">
            <div className="rounded-lg border border-Gray-200">
              <div className="px-3 py-4 border-b">
                <h4 className="text-lg font-medium">Languages</h4>
              </div>
              <div className="px-3 py-4">
                <div>
                  <label htmlFor="lang" className="text-sm font-medium">
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
              </div>
            </div>
            <div className="rounded-lg border border-Gray-200">
              <div className="px-3 py-4 border-b">
                <h4 className="text-lg font-medium">Categories</h4>
              </div>
              <div
                className="px-3 py-4 flex flex-col gap-y-4"
                onChange={handleInput}
              >
                {categories?.map((item, i) => (
                  <div key={i}>
                    <label htmlFor="lang" className="flex items-center gap-x-1">
                      <input
                        type="radio"
                        name="category"
                        value={item.value}
                        defaultChecked={item.value == formData.category}
                        className="radio radio-accent w-[18px] h-[18px] rounded"
                      />
                      <span>{item.label[lang]}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-Gray-200">
              <div className="px-3 py-4 border-b">
                <h4 className="text-lg font-medium">Featured Image</h4>
              </div>
              <div className="px-4 py-6">
                <div className=" pt-6 pb-5 px-4 rounded-lg border border-dashed border-Gray-200">
                  <div className="flex justify-center">
                    {formData.featured_image?.full_path ? (
                      <div className="flex items-center justify-center w-full h-[54px]">
                        <img
                          src={formData.featured_image?.full_path}
                          className="h-[54px]"
                          alt="Feature Image"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-[54px] h-[54px] rounded-full border-8 border-main-50 bg-main-100">
                        <UploadIcon className="text-main-800" />
                      </div>
                    )}
                  </div>
                  <div className="pt-6 flex flex-col gap-y-2">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        data-multi="0"
                        data-name="featured_image"
                        onClick={handleToggleImageLibrary}
                        className="px-4 py-2 text-Gray-800 text-xs font-medium rounded-lg border border-gray-300 hover:shadow transition-all duration-200 ease-in-out"
                      >
                        Upload Image
                      </button>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-Gray-600 font-normal">
                        SVG, PNG, or JPG (max 800px * 400px)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {imageLibrary.status && (
          <GlobalGallery
            show={true}
            onHide={handleToggleImageLibrary}
            fileSelectCallback={(file) =>
              handleFileInput(imageLibrary.form_field, file)
            }
            multiple={imageLibrary.is_multi}
          />
        )}
      </section>
    </HOC>
  );
}
