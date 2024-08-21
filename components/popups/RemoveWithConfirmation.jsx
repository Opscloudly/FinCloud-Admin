import { useState } from "react";
import Popup from "reactjs-popup";
import Button from "../UI/Button";
import Axios from "@/axios/Axios";

export default function RemoveWithConfirmation({ action, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const [actionButtonActive, setActionButtonActive] = useState(false);
  const [notification, setNotification] = useState({
    status: false,
    msg: null,
    type: null,
  });

  const handleRemoveItem = async () => {
    try {
      setActionButtonActive(true);

      const data = new FormData();
      data.append("_method", "DELETE");
      const {
        data: { status, message },
      } = await Axios.post(action, data);
      if (status) {
        setNotification({ status: true, msg: message, type: "green" });
        setTimeout(() => {
          setIsOpen(false);
        }, []);
      } else {
        console.log(message);
        setNotification({
          status: true,
          msg: "Something went wrong in server",
          type: "red",
        });
      }
    } catch (e) {
      setNotification({
        status: true,
        msg: "Something went wrong in client",
        type: "red",
      });
      console.log(e.message);
    } finally {
      setActionButtonActive(false);
    }
  };

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        {children}
      </button>
      <Popup
        open={isOpen}
        closeOnDocumentClick
        onClose={() => setIsOpen(false)}
        overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="flex flex-col justify-center gap-y-6 w-full max-w-[420px]  h-[180px] rounded-lg px-4 md:px-8 bg-white">
          <div className="flex flex-col items-center gap-y-1">
            <h2 className="text-red-600 text-lg md:text-xl font-semibold">
              Warning!
            </h2>
            <h4 className="text-Gray-700 text-base font-medium">
              Are you sure you want to delete this?
            </h4>
          </div>
          <div>
            <div className="flex justify-center items-center gap-2">
              <Button
                label="Submit"
                onClick={handleRemoveItem}
                disabled={actionButtonActive}
                className="bg-red-600 text-white hover:opacity-80 transition-all duration-150"
              />
              <Button
                label="Cancel"
                onClick={() => setIsOpen(false)}
                className="bg-Gray-200 hover:opacity-80 transition-all duration-150"
              />
            </div>
            {notification.status && (
              <p
                className={`text-sm p-1.5 font-medium text-${notification.type}-600`}
              >
                {notification.msg}
              </p>
            )}
          </div>
        </div>
      </Popup>
    </>
  );
}
