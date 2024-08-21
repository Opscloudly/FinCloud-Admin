import InputFileInline from "@/components/UI/InputFileInline";
import Input from "@/components/UI/Input";
import { useState } from "react";
import ImageViewBox from "@/components/cards/ImageViewBox";

export default function StepThree({ data }) {
  return (
    <>
      <div className="p-4 rounded-lg border border-Gray-200">
        <h2 className="text-xl font-semibold pb-6 text-Gray-900">
          Financial Statements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium"
            >
              Last 2 years financial statements:
            </label>
            <div>
              <ImageViewBox src={data.financial_statement} />
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
              <ImageViewBox
                src={data.bank_ac_movement_of_financial_statement}
              />
            </div>
          </div>
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium "
            >
              Credit rating report (Findeks):
            </label>
            <div>
              <ImageViewBox src={data.credit_rating_report} />
            </div>
          </div>
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium "
            >
              List of top 5 customers with last 2 year volume of business:
            </label>
            <div>
              <ImageViewBox src={data.list_of_customers} />
            </div>
          </div>
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium "
            >
              List of 5 suppliers with last 2 years volume of business:
            </label>
            <div>
              <ImageViewBox src={data.list_of_suppliers} />
            </div>
          </div>
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium "
            >
              List of debtor ageing:
            </label>
            <div>
              <ImageViewBox src={data.list_of_debtor_ageing} />
            </div>
          </div>
          {/* == */}
        </div>
      </div>
    </>
  );
}
