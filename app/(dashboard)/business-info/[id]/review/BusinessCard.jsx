import { EditIcon } from "@/components/dashboard/Icons";
import Image from "next/image";
import Link from "next/link";

export default function BusinessCard({ data }) {
  return (
    <div className="rounded-lg border border-Gray-200 p-4">
      <div className="flex justify-end">
        <span className="bg-orange-100 text-orange-400 text-xs font-medium rounded-xl py-1.5 px-3">
          In Review
        </span>
      </div>
      <div className="flex flex-col justify-between h-[245px]">
        <div className="flex flex-col justify-center items-center gap-y-1.5">
          <div className="flex items-center justify-center h-[120px] w-full overflow-hidden">
            <div className="rounded-lg overflow-hidden">
              <img
                src={data.company_logo}
                alt="Company logo"
                className="h-[120px] w-auto"
              />
            </div>
          </div>
          <h4 className="text-2xl font-medium text-Gray-700">{data.company}</h4>
          <p className="text-Gray-400 font-normal text-xs">Istanbul</p>
        </div>
        {/* <div>
          <Link
            href="/dashboard/business-info/1/edit"
            className="flex gap-x-1.5 w-full items-center justify-center text-black font-medium capitalize px-4 py-2.5 bg-main-600 rounded-md hover:opacity-90 transition-all duration-200"
          >
            <span className="font-semibold">Edit</span>{" "}
            <EditIcon className="w-4 h-4" />
          </Link>
        </div> */}
      </div>
    </div>
  );
}
