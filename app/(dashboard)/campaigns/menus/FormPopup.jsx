import Axios from "@/axios/Axios";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Loader from "@/components/UI/Loader";
import Select from "@/components/UI/Select";
import { UtilityContext } from "@/contexts/UtilityContext";
import { MENU_TYPES } from "@/helpers/constantValues";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";

export default function FormPopup({ data, closeHandler, syncPageDataHandler }) {
  const { dispatchNotification } = useContext(UtilityContext);
  const [cancelSource, setCancelSource] = useState(null);
  const initFormData = {
    name: { en: "", tr: "" },
    type: "",
  };
  const [formData, setFormData] = useState(initFormData);
  const [actionButtonActive, setActionButtonActive] = useState(false);

  useEffect(() => {
    if (data?.id && data?.data) {
      setFormData({
        name: data.data.name,
        type: data.data.type,
      });
    }
  }, [data]);

  const handleInput = ({ target: { name, value } }) => {
    const [field, lang] = name.split("_");
    setFormData((prev) => {
      return { ...prev, [field]: { ...prev[field], [lang]: value } };
    });
  };

  const handleInputNoLang = ({ target: { name, value } }) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleTranslateInput = async ({ target: { name, value } }) => {
    try {
      const source = axios.CancelToken.source();
      setCancelSource(source);
      //
      const [field, lang] = name.split("_");
      if (lang != "tr") {
        return;
      }
      const translateData = new FormData();
      translateData.append("text", value);
      const {
        data: { status, data: enContent, message },
      } = await Axios.post("translate", translateData, {
        cancelToken: source.token,
      });
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

  const parseFormData = () => {
    const languagableInputs = ["name"];
    const data = new FormData();
    for (const item in formData) {
      if (languagableInputs.includes(item)) {
        if (formData[item].en && formData[item].tr) {
          data.append(`${item}[en]`, formData[item].en);
          data.append(`${item}[tr]`, formData[item].tr);
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
      let endPoint = "campaigns/menus";
      if (data?.id) {
        endPoint = `campaigns/menus/${data.id}`;
        form_data.append("_method", "PUT");
      }
      const {
        data: { status, message },
      } = await Axios.post(endPoint, form_data, {
        headers: { "Content-Type": "application/json" },
      });
      if (status) {
        dispatchNotification({
          status: true,
          msg: message,
          type: "success",
        });
        syncPageDataHandler();
        setTimeout(() => {
          closeHandler();
        }, 700);
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

  const handleClose = () => {
    if (cancelSource) {
      cancelSource.cancel("Operation canceled by unmount");
    }
    setFormData(initFormData);
    closeHandler();
  };

  return (
    <Popup
      open={data.status}
      onClose={handleClose}
      closeOnDocumentClick={false}
      overlayStyle={{ background: "rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-white rounded-lg border border-Gray-200 border-solid m-4 md:w-[500px]">
        <div className="flex items-center gap-x-2 p-6">
          <div className="h-10 w-10 rounded-full border-[8px] border-main-50 bg-main-60"></div>
          <h2 className="text-Gray-900 font-semibold text-xl">Add New Item</h2>
        </div>
        <div className="flex flex-col gap-y-4 p-6">
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-black text-sm font-medium "
            >
              Name{" "}
              <span className="text-Gray-300 font-medium text-xs">[TR]</span>
            </label>
            <div>
              <Input
                name="name_tr"
                value={formData.name.tr}
                onChange={handleInput}
                onBlur={handleTranslateInput}
                placeholder="Type Turkish name here..."
              />
            </div>
          </div>
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-black text-sm font-medium "
            >
              Name{" "}
              <span className="text-Gray-300 font-medium text-xs">[EN]</span>
            </label>
            <div>
              <Input
                name="name_en"
                value={formData.name.en}
                onChange={handleInput}
                onBlur={handleTranslateInput}
                placeholder="Type English name here..."
              />
            </div>
          </div>
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-black text-sm font-medium "
            >
              Type
            </label>
            <div>
              <Select
                name="type"
                value={formData.type}
                onChange={handleInputNoLang}
                options={MENU_TYPES}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 p-6">
          <button
            type="button"
            onClick={handleClose}
            className="w-full flex relative justify-center items-center gap-x-2 py-2.5 text-black bg-white border border-Gray-200 rounded-lg font-medium capitalize hover:bg-opacity-85 transition-all duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full relative flex justify-center items-center gap-x-2 py-2.5 text-black bg-main-600 border-transparent font-medium capitalize rounded-md hover:bg-opacity-85 transition-all duration-200 ease-in-out"
          >
            {actionButtonActive && (
              <Loader className="loading-sm absolute right-2" />
            )}
            <span>Add new</span>
          </button>
        </div>
      </div>
    </Popup>
  );
}
