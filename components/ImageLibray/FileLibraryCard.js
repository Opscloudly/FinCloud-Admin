import React from "react";

const imgStyle = {
  // width: "130px",
  maxHeight: "70px",
  objectFit: "contain",
  objectPosition: "50% 50%",
};

const FileLibraryCard = (props) => {
  return (
    <div
      style={{ width: "130px" }}
      className={`${
        props.selectedItems !== undefined &&
        props.selectedItems.map((item) => item.id).includes(props.id)
          ? "border-blue-500"
          : ""
      } border border-gray-200 rounded p-2 mx-2 transition duration-300 hover:border-blue-500 hover:bg-blue-50 relative`}
    >
      {props.selectedItems !== undefined &&
        props.selectedItems.map((item) => item.id).includes(props.id) && (
          <div className="absolute top-0 right-0 icon-border">
            <i className="fas fa-check-circle"></i>
          </div>
        )}
      {props.full_path && (
        <div className="w-full rounded flex justify-center">
          <img src={props.full_path} alt="" style={imgStyle}/>
        </div>
      )}
    </div>
  );
};

export default FileLibraryCard;
