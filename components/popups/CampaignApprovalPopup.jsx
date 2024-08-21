import { useState } from "react";
import Popup from "reactjs-popup";
import Button from "../UI/Button";
import Axios from "@/axios/Axios";
import { DocumentValidationIcon, TimesIcon, UploadIcon } from "../Icons";
import Input from "../UI/Input";
import TextareaEditor from "../UI/TextareaEditor";
import InputWithAddon from "../UI/InputWithAddon";

export default function CampaignApprovalPopup({
  isOpen,
  onClose,
  formData,
  handleInput,
  handleSubmit,
  actionButtonActive,
}) {
  return (
    <>
      <Popup
        open={isOpen}
        closeOnDocumentClick
        onClose={onClose}
        overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="relative flex flex-col justify-start gap-y-6 w-full min-w-[560px] max-w-[760px] h-[480px] rounded-lg py-4 px-4 md:px-8 bg-white overflow-y-auto">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-0 right-0 w-11 h-11 hover:text-red-600 transition-all duration-200 cursor-pointer flex items-center justify-center"
          >
            <TimesIcon />
          </button>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col items-center gap-y-2">
              <div className="flex items-center justify-center w-[54px] h-[54px] rounded-full border-8 border-success-50 bg-success-100">
                <DocumentValidationIcon className="text-[#057747]" />
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <h2 className="text-2xl text-Gray-900 font-semibold">
                  Fill the information to accept
                </h2>
                <p className="text-sm text-Gray-400 font-medium">
                  To accept this campaign you need to fill
                </p>
              </div>
            </div>
            {/* form items */}
            <div className="border border-Gray-200 rounded-lg p-4">
              <div className="flex flex-col gap-y-4">
                {/* Input item */}
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="post_title"
                    className="text-black text-sm font-medium "
                  >
                    Campaign Risk
                  </label>
                  <div>
                    <InputWithAddon
                      type="number"
                      name="campaign_risk"
                      value={formData.campaign_risk}
                      onChange={handleInput}
                      placeholder="enter risk rate"
                      rightAddon="%"
                    />
                  </div>
                </div>
                {/* Input item */}
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="post_title"
                    className="text-black text-sm font-medium "
                  >
                    Campaign Highlights{" "}
                    <span className="text-Gray-300 font-medium text-xs">
                      [TR]
                    </span>
                  </label>
                  <div>
                    <TextareaEditor
                      name="campaign_highlights_tr"
                      value={formData.campaign_highlights_tr}
                      onChange={handleInput}
                      onBlur={() => {}}
                    />
                  </div>
                </div>
                {/* Input item */}
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="post_title"
                    className="text-black text-sm font-medium "
                  >
                    Campaign Highlights{" "}
                    <span className="text-Gray-300 font-medium text-xs">
                      [EN]
                    </span>
                  </label>
                  <div>
                    <TextareaEditor
                      name="campaign_highlights_en"
                      value={formData.campaign_highlights_en}
                      onChange={handleInput}
                      onBlur={() => {}}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-4 py-2">
              <Button
                label="Cancel"
                onClick={onClose}
                className="border border-Gray-200 hover:bg-Gray-100 w-full"
              />
              <Button
                label="Publish"
                onClick={handleSubmit}
                disabled={actionButtonActive}
                className="border border-main-600 bg-main-600 w-full"
              />
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
}
