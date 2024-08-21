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

export default function BlogAddForm({ params: { id } }) {
  const router = useRouter();
  const { dispatchNotification } = useContext(UtilityContext);
  const headingCardRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [actionButtonActive, setActionButtonActive] = useState(false);
  const [lang, setLang] = useState("tr");

  const initInput = {
    title: { en: "", tr: "" },
    featured_image: { path: null, full_path: null },
    excerpt: { en: "", tr: "" },
    content: { en: "", tr: "" },
    meta_img_alt: { en: "", tr: "" },
    meta_title: { en: "", tr: "" },
    meta_keyword: { en: "", tr: "" },
    meta_description: { en: "", tr: "" },
  };
  const [formData, setFormData] = useState(initInput);
  const [initialContent, setInitialContent] = useState("");

  const [categories, setCategories] = useState([]);

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
        } = await Axios.get(`blogs/${id}/edit`);
        if (status) {
          populateFormFields(data.blog);
          setCategories(data.categories);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  const populateFormFields = (data) => {
    const langItems = [
      "title",
      "excerpt",
      "content",
      "meta_img_alt",
      "meta_title",
      "meta_keyword",
      "meta_description",
    ];
    const editableData = {};
    for (const item in initInput) {
      if (langItems.includes(item)) {
        editableData[item] = {
          en: data[item] ? data[item]?.en || "" : "",
          tr: data[item] ? data[item]?.tr || "" : "",
        };
        continue;
      }
      editableData[item] = data[item];
    }
    setFormData(editableData);
    setInitialContent(data.content?.en);
  };

  const handleInput = ({ target: { name, value } }) => {
    setFormData((prev) => {
      return { ...prev, [name]: { ...prev[name], [lang]: value } };
    });
  };

  const handleCheckboxInput = ({ target: { name, value, checked } }) => {
    let oldItems = [...categories];
    const newItems = oldItems.map((item) => {
      if (item.id == value) {
        item.checked = checked;
      }
      return item;
    });
    setCategories(newItems);
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
      "title",
      "excerpt",
      "content",
      "meta_img_alt",
      "meta_title",
      "meta_keyword",
      "meta_description",
    ];
    const imageInput = ["featured_image"];
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
      data.append(item, formData[item]);
    }
    return data;
  };

  const parseCategories = (fd) => {
    const cats = categories.filter((item) => item.checked);
    for (const c of cats) {
      fd.append("categories[]", c.id);
    }
    return fd;
  };

  const handleSubmit = async () => {
    try {
      setActionButtonActive(true);
      const form_data = parseFormData();
      const form_data_with_cats = parseCategories(form_data);
      form_data.append("_method", "PUT");
      const {
        data: { status, message },
      } = await Axios.post(`blogs/${id}`, form_data_with_cats, {
        headers: { "Content-Type": "application/json" },
      });
      if (status) {
        dispatchNotification({
          status: true,
          msg: message,
          type: "success",
        });
        router.push("/blogs");
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
                href="/blogs"
                className="hover:-translate-x-1 transition-transform duration-150"
              >
                <ArrowLeftLong className="text-black" />
              </Link>
              <span>Edit Blog</span>
            </h2>
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
        <div className="grid grid-cols-11 gap-6">
          <div className="col-span-8 flex flex-col gap-y-5">
            {/* Input item */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="post_title"
                className="text-black text-sm font-medium "
              >
                Post Title{" "}
                <span className="text-Gray-300 font-medium text-xs">
                  {lang == "en" ? "[EN]" : ""}
                </span>
              </label>
              <div>
                <Input
                  name="title"
                  value={formData.title[lang]}
                  onChange={handleInput}
                  onBlur={handleTranslateInput}
                  placeholder="Type post title here..."
                />
              </div>
            </div>

            {/* Input item */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="post_title"
                className="text-black text-sm font-medium "
              >
                Post Excerpt{" "}
                <span className="text-Gray-300 font-medium text-xs">
                  {lang == "en" ? "[EN]" : ""}
                </span>
              </label>
              <div>
                <Textarea
                  name="excerpt"
                  value={formData.excerpt[lang]}
                  onChange={handleInput}
                  onBlur={handleTranslateInput}
                  placeholder="Type post excerpt here..."
                />
              </div>
            </div>

            {/* Input item */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="post_title"
                className="text-black text-sm font-medium "
              >
                Blog Content{" "}
                <span className="text-Gray-300 font-medium text-xs">
                  {lang == "en" ? "[EN]" : ""}
                </span>
              </label>
              <div>
                <TextareaEditor
                  name="content"
                  onChange={handleInput}
                  onBlur={handleTranslateInput}
                  initialValue={formData.content[lang]}
                  placeholder="Type post excerpt here..."
                />
              </div>
            </div>

            {/* Meta input group */}
            <div className="flex flex-col gap-y-6 p-4 border border-gray-200 rounded-lg">
              <h2 className="text-black text-lg font-medium">SEO Options</h2>

              {/* Input item */}
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="post_title"
                  className="text-black text-sm font-medium "
                >
                  Image Alt{" "}
                  <span className="text-Gray-300 font-medium text-xs">
                    {lang == "en" ? "[EN]" : ""}
                  </span>
                </label>
                <div>
                  <Input
                    name="meta_img_alt"
                    value={formData.meta_img_alt[lang]}
                    onChange={handleInput}
                    onBlur={handleTranslateInput}
                    placeholder="Add alt here..."
                  />
                </div>
              </div>

              {/* Input item */}
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
                    placeholder="Add meta title here..."
                  />
                </div>
              </div>

              {/* Input item */}
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
                    placeholder="Add meta keyword here..."
                  />
                </div>
              </div>

              {/* Input item */}
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
                  <Textarea
                    name="meta_description"
                    value={formData.meta_description[lang]}
                    onChange={handleInput}
                    onBlur={handleTranslateInput}
                    placeholder="Add meta description here..."
                    className="h-20"
                  />
                </div>
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
                {/*  <div>
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
            <div className="rounded-lg border border-Gray-200">
              <div className="px-3 py-4 border-b">
                <h4 className="text-lg font-medium text-black">Categories</h4>
              </div>
              <div className="px-3 py-4 flex flex-col gap-y-4">
                {categories?.map((item, i) => (
                  <div key={i}>
                    <label htmlFor="lang" className="flex items-center gap-x-1">
                      <input
                        type="checkbox"
                        name="categories"
                        value={item.id}
                        onChange={handleCheckboxInput}
                        checked={item.checked}
                        className="checkbox checkbox-accent w-[18px] h-[18px] rounded"
                      />
                      <span className="text-black">{item.category[lang]}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-Gray-200">
              <div className="px-3 py-4 border-b">
                <h4 className="text-lg font-medium text-black">
                  Featured Image
                </h4>
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
