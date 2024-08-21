import { useState } from "react";
import Popup from "reactjs-popup";

export default function ImageViewBox({ src, alt }) {
  const altText = alt || "Image";
  const source = src || "/assets/images/default/placeholder.png";

  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <div className="h-[140px] w-full rounded p-2 overflow-hidden flex">
        <img
          src={src}
          alt={altText}
          className="h-[80px] w-auto rounded cursor-pointer"
          onClick={() => setOpenPopup(true)}
        />
      </div>
      <Popup
        open={openPopup}
        closeOnDocumentClick
        onClose={() => setOpenPopup(false)}
        overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="max-w-[1280px] max-h-[36rem] rounded-lg p-1 bg-white overflow-x-auto">
          <img
            src={source}
            alt="Image preview"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </Popup>
    </>
  );
}
