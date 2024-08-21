"use client";

import { useState } from "react";
import { UploadIcon } from "../Icons";
import GlobalGallery from "../ImageLibray/GlobalGallery";
import Popup from "reactjs-popup";

export default function InputFileInline({ name, onChange, className }) {
  const [imageLibrary, setImageLibrary] = useState({
    status: false,
    is_multi: false,
    form_field: null,
  });

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

  const handleFileInput = (form_field, file) => {
    if (!imageLibrary.is_multi) {
      onChange({
        target: {
          name: form_field,
          value: { path: file[0].path, full_path: file[0].full_path },
        },
      });
    } else {
      const pathData = file.map((item) => {
        return { path: item.path, full_path: item.full_path };
      });
      onChange({
        target: {
          name: form_field,
          value: pathData,
        },
      });
    }
    handleToggleImageLibrary({
      target: { dataset: { name: null, multi: false } },
    });
  };

  return (
    <>
      <div
        data-multi="0"
        className={`relative flex items-center w-full text-Gray-input text-sm font-normal placeholder:text-Gray-500 bg-transparent focus:bg-white border border-Gray-200 focus:border-main-600 outline-none px-2 py-1.5 rounded-lg  ${className}`}
      >
        <button
          type="button"
          data-name={name}
          onClick={handleToggleImageLibrary}
          className="bg-Gray-100 px-2 py-1.5 rounded-md text-xs font-medium"
        >
          upload file
        </button>
        <span className="absolute right-3 top-2.5">?</span>
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
    </>
  );
}
