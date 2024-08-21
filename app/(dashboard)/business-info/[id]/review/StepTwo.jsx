import InputFileInline from "@/components/UI/InputFileInline";
import Input from "@/components/UI/Input";
import { useState } from "react";
import ImageViewBox from "@/components/cards/ImageViewBox";

export default function StepTwo({ data }) {
  return (
    <>
      <div className="p-4 rounded-lg border border-Gray-200">
        <h2 className="text-xl font-semibold pb-6 text-Gray-900">
          Company Registration Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium "
            >
              Faaliyat Belgesi:
            </label>
            <div>
              <ImageViewBox src={data.certificate_of_operation} />
            </div>
          </div>
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium "
            >
              Trade Registry Gazette:
            </label>
            <div>
              <ImageViewBox src={data.trade_registry_gazette} />
            </div>
          </div>
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium "
            >
              Authorized signatories:
            </label>
            <div>
              <ImageViewBox
                src={data.authorized_signatories_of_company_reg_doc}
              />
            </div>
          </div>
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium "
            >
              Company&#39;s business address:
            </label>
            <div>
              <ImageViewBox src={data.business_address} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-lg border border-Gray-200">
        <h2 className="text-xl font-semibold pb-6 text-Gray-900">
          Tax Documentation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium "
            >
              Recent Tax certificates:
            </label>
            <div>
              <ImageViewBox src={data.tax_certificate} />
            </div>
          </div>
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium "
            >
              Tax identification number:
            </label>
            <div>
              <p className="font-semibold text-Gray-900">{data.tax_id}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-lg border border-Gray-200">
        <h2 className="text-xl font-semibold pb-6 text-Gray-900">
          Business Plan or Company Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium "
            >
              A detailed business plan or profile:
            </label>
            <div>
              <ImageViewBox src={data.company_profile} />
            </div>
          </div>
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium "
            >
              Last 6 months bank accounts movements:
            </label>
            <div>
              <ImageViewBox src={data.bank_ac_movement_of_company_profile} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
