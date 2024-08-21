import React, { useState, useEffect } from "react";
import Axios from "@/axios/Axios";
import { set } from "lodash";

const FileUpload = (props) => {
  const data = props.data;

  const [button_text, setbutton_text] = useState(
    props.type == "save" ? "Add Photo" : "Update Photo"
  );
  const [editMode, setEditMode] = useState(
    props.type == "update" ? true : false
  );
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoDetails, setPhotoDetails] = useState({
    name: "",
    file_type: "",
    size: "",
    dimensions: "",
    uploaded_at: "",
    uploaded_by: "",
  });
  const [success, setsuccess] = useState("");

  let initFormFields = {
    title: "",
    description: "",
    caption: "",
    alt_text: "",
    file: null,
    status: 1,
    is_public: 0,
  };

  const [formData, setFormData] = useState(initFormFields);
  const initError = {};
  for (const i in initFormFields) {
    initError[i] = null;
  }
  const [formError, setFormError] = useState(initError);
  const [generalError, setGeneralError] = useState({
    status: false,
    msg: null,
    type: null,
  });

  useEffect(() => {
    if (props.type == "update") {
      if (data && data.id) {
        setEditMode(true);
        setPhotoPreview(data.full_path);
        setFormData({
          ...formData,
          title: data.title ? data.title : "",
          description: data.description ? data.description : "",
          caption: data.caption ? data.caption : "",
          alt_text: data.alt_text ? data.alt_text : "",
          status: data.status == 0 ? 0 : 1,
          is_public: data.is_public == 0 ? 0 : 1,
        });
        setPhotoDetails({
          ...photoDetails,
          name: data.name,
          file_type: data.file_type,
          size: data.size,
          dimensions: data.dimensions,
          uploaded_at: data.uploaded_at,
          uploaded_by: data.uploaded_by,
        });
      }
    }
  }, [data]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;

    if (type == "file") {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });

      setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    setGeneralError({
      status: false,
      msg: null,
      type: null,
    });
    setFormError(initError);
    setsuccess("");
    if (editMode) {
      setbutton_text("Updating...");
    } else {
      setbutton_text("Adding...");
    }
    const form = new FormData();

    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("caption", formData.caption);
    form.append("alt_text", formData.alt_text);
    if (formData.file) {
      form.append("file", formData.file);
    }
    form.append("status", formData.status);
    form.append("is_public", formData.is_public);

    if (props.type == "save") {
      Axios.post("image-library", form)
        .then((response) => {
          setbutton_text("Add Photo");
          if (response.status == 200) {
            setFormData(initFormFields);
            setPhotoPreview(null);
            setsuccess("Photo Added successfully");
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            setGeneralError({
              status: true,
              msg: "Please fill all required fields",
              type: "danger",
            });
            updateErrors(error.response.data.errors);
          }
        });
    }

    if (props.type == "update") {
      form.append("_method", "PUT");
      Axios.post(`image-library/${data.id}`, form)
        .then((response) => {
          setbutton_text("Update Photo");
          if (response.status == 200) {
            const responseD = response.data;
            setFormData({
              ...formData,
              title: responseD.title ? responseD.title : "",
              description: responseD.description ? responseD.description : "",
              caption: responseD.caption ? responseD.caption : "",
              alt_text: responseD.alt_text ? responseD.alt_text : "",
              status: responseD.status ? responseD.status : 1,
              is_public: responseD.is_public ? responseD.is_public : 1,
            });
            setsuccess("Photo Updated successfully");
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            setGeneralError({
              status: true,
              msg: "Please fill all required fields",
              type: "danger",
            });
            updateErrors(error.response.data.errors);
          }
        });
    }
    setbutton_text(props.type == "save" ? "Add Photo" : "Update Photo");
  };

  const updateErrors = (errors) => {
    let err = {};
    for (const i in errors) {
      err[i] = errors[i][0];
    }
    setFormError(err);
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div>
      <form className="mb-2">
        {/* Show image details from props such as image name, dimensions, size, etc. */}
        {props.type == "update" && (
          <div className="mb-2 text-sm">
            <span>
              <b>Image Name:</b> {data.name}
            </span>
            <br />
            <span>
              <b>File Type:</b> {data.mime_type}
            </span>
            <br />
            <span>
              <b>Dimensions:</b> {data.width} by {data.height} pixels
            </span>
            <br />
            <span>
              <b>Size:</b> {formatBytes(data.size)}
            </span>
            <br />
            <span>
              <b>Uploaded at:</b> {new Date(data.created_at).toLocaleString()}
            </span>
            <br />
            <span>
              <b>Uploaded by:</b> {data.added_by?.first_name}{" "}
              {data.added_by?.last_name}
            </span>
            <hr />
          </div>
        )}

        <div className="mb-2">
          <label className="block font-bold mb-1 text-gray-500 text-sm">
            Title
          </label>
          <input
            type="text"
            name="title"
            className={`${
              formError.title !== null ? "border-red-500" : ""
            } px-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
            placeholder="Title"
            value={formData.title}
            onChange={handleInput}
          />

          {formError.title !== null && (
            <p className="text-red-500 text-xs italic">{formError.title}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="block font-bold mb-1 text-gray-500 text-sm">
            Description
          </label>
          <textarea
            name="description"
            className={`${
              formError.description !== null ? "border-red-500" : ""
            } px-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
            placeholder="Description"
            value={formData.description}
            onChange={handleInput}
          />

          {formError.description !== null && (
            <p className="text-red-500 text-xs italic">
              {formError.description}
            </p>
          )}
        </div>

        <div className="mb-2">
          <label className="block font-bold mb-1 text-gray-500 text-sm">
            Caption
          </label>
          <input
            type="text"
            name="caption"
            className={`${
              formError.caption !== null ? "border-red-500" : ""
            } px-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
            placeholder="Caption"
            value={formData.caption}
            onChange={handleInput}
          />

          {formError.caption !== null && (
            <p className="text-red-500 text-xs italic">{formError.caption}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="block font-bold mb-1 text-gray-500 text-sm">
            Alt Text
          </label>
          <input
            type="text"
            name="alt_text"
            className={`${
              formError.alt_text !== null ? "border-red-500" : ""
            } px-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
            placeholder="Alt Text"
            value={formData.alt_text}
            onChange={handleInput}
          />

          {formError.alt_text !== null && (
            <p className="text-red-500 text-xs italic">{formError.alt_text}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="block font-bold mb-1 text-gray-500 text-sm">
            File
          </label>
          <input
            type="file"
            name="file"
            accept="image/*"
            className={`${
              formError.file !== null ? "border-red-500" : ""
            } px-3 py-2 border placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
            onChange={handleInput}
          />

          {formError.file !== null && (
            <p className="text-red-500 text-xs italic">{formError.file}</p>
          )}

          {photoPreview && (
            <div className="mb-3 bg-white p-2">
              <img src={photoPreview} className="h-16 " />
            </div>
          )}
        </div>

        {generalError.status && (
          <div className="mb-2">
            <p className="text-red-500 text-xs italic font-bold">
              {generalError.msg}
            </p>
          </div>
        )}

        {success && (
          <div className="mb-2 p-3 text-white bg-green-600">
            <p className="text-xs italic font-bold">{success}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            className="bg-teal-500 active:bg-teal-500 text-white font-semibold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            onClick={handleSubmit}
            type="button"
            disabled={button_text == "Adding..." ? true : false}
          >
            {button_text}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
