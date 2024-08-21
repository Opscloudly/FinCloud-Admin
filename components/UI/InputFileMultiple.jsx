import { useState } from "react";
import { UploadIcon } from "../Icons";
import GlobalGallery from "../ImageLibray/GlobalGallery";

export default function InputFileMultiple({
  name,
  data,
  onChange,
  className,
  label = "Image",
}) {
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
    <div className="border border-Gray-200 rounded-lg">
      <div className="border-b border-Gray-100 p-4">
        <h2 className="text-black text-lg font-medium">{label}</h2>
      </div>
      <div className="p-4">
        {data.length ? (
          <ImagePlaceHolderDiv
            name={name}
            handleToggleImageLibrary={handleToggleImageLibrary}
            data={data}
          />
        ) : (
          <ImagePlaceHolderFull
            name={name}
            handleToggleImageLibrary={handleToggleImageLibrary}
          />
        )}
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
    </div>
  );
}

const ImagePlaceHolderFull = ({ name, handleToggleImageLibrary }) => {
  return (
    <div className="border border-dashed border-Gray-200 px-4 py-6">
      <div className="flex justify-center">
        <div className="flex items-center justify-center w-[54px] h-[54px] rounded-full border-8 border-main-50 bg-main-100">
          <UploadIcon className="text-main-800" />
        </div>
      </div>

      <div className="pt-6 flex flex-col gap-y-2">
        <div className="flex justify-center">
          <button
            type="button"
            data-multi="0"
            data-name={name}
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
  );
};
const ImagePlaceHolderDiv = ({ name, data, handleToggleImageLibrary }) => {
  const copyData = [...data, null];
  const firstItem = copyData.shift();
  const secondFourItems = copyData.length ? copyData.splice(0, 4) : [];
  const restItems = copyData.length ? copyData.splice(0) : [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="col-span-2">
          <div className="flex justify-center rounded-lg overflow-hidden h-[280px]">
            <img
              src={firstItem.full_path}
              alt="Media image"
              className="h-[280px] w-full"
            />
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          {secondFourItems?.map((item, i) =>
            item ? (
              <div
                key={i}
                className="flex justify-center rounded-lg overflow-hidden bg-red-300 h-[140px]"
              >
                <img
                  src={item.full_path}
                  alt="Media image"
                  className="h-[140px] w-full"
                />
              </div>
            ) : (
              <div
                key={i}
                className="border border-dashed border-Gray-200 rounded-lg flex flex-col items-center py-4 justify-between h-[140px]"
              >
                <div className="flex justify-center">
                  <div className="flex items-center justify-center w-[54px] h-[54px] rounded-full border-8 border-main-50 bg-main-100">
                    <UploadIcon className="text-main-800" />
                  </div>
                </div>

                <div className="pt-6 flex flex-col gap-y-2">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      data-multi="0"
                      data-name={name}
                      onClick={handleToggleImageLibrary}
                      className="px-4 py-2 text-Gray-800 text-xs font-medium rounded-lg border border-gray-300 hover:shadow transition-all duration-200 ease-in-out"
                    >
                      Add More
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {restItems?.map((item, i) =>
          item ? (
            <div
              key={i}
              className="flex justify-center rounded-lg overflow-hidden bg-red-300 h-[140px]"
            >
              <img
                src={item.full_path}
                alt="Media image"
                className="h-[140px] w-full"
              />
            </div>
          ) : (
            <div
              key={i}
              className="border border-dashed border-Gray-200 rounded-lg flex flex-col items-center py-4 justify-between h-[140px]"
            >
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-[54px] h-[54px] rounded-full border-8 border-main-50 bg-main-100">
                  <UploadIcon className="text-main-800" />
                </div>
              </div>

              <div className="pt-6 flex flex-col gap-y-2">
                <div className="flex justify-center">
                  <button
                    type="button"
                    data-multi="0"
                    data-name={name}
                    onClick={handleToggleImageLibrary}
                    className="px-4 py-2 text-Gray-800 text-xs font-medium rounded-lg border border-gray-300 hover:shadow transition-all duration-200 ease-in-out"
                  >
                    Add More
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};
const ImagePreview = () => {};
