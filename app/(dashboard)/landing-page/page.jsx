"use client";
import HOC from "@/components/HOC/HOC";
import TitleCard from "@/components/cards/TitleCard";
import { useEffect, useState } from "react";
import Axios from "@/axios/Axios";
import { useRouter, useSearchParams } from "next/navigation";
import HocData from "@/components/HOC/HocData";
import Image from "next/image";

export default function Blogs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pageData, setPageData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPageData([]);
        const {
          data: { status, data },
        } = await Axios.get("landing-page");
        if (status) {
          setPageData(data);
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoaded(true);
      }
    };
    fetchData();
  }, [searchParams]);

  return (
    <HOC type="dashboard">
      <section className="flex flex-col gap-y-10">
        {/* Hero - Banner */}
        <div className="">
          <TitleCard
            heading="Banner - Hero Section"
            badge={null}
            has_link={true}
            link_label="Edit"
            link_href="/landing-page/banner/edit"
          />
          <div className="border border-Gray-200 rounded-lg px-6 py-4 mt-2">
            <div className="w-full h-[250px] overflow-hidden">
              <img
                src={pageData?.hero_banner}
                className="w-full h-auto"
                alt="Banner"
              />
            </div>
          </div>
        </div>

        {/* Hero - Heading */}
        <div className="">
          <TitleCard
            heading="Heading - Hero Section"
            badge={null}
            has_link={true}
            link_label="Edit"
            link_href="/landing-page/heading/edit"
          />
          <div className="border border-Gray-200 rounded-lg mt-2">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-head-cell border-b rounded-lg">
                    Turkish
                  </th>
                  <th className="table-head-cell border-b rounded-lg">
                    English
                  </th>
                </tr>
              </thead>
              <tbody>
                <HocData loaded={loaded} hasData={pageData} cols={2}>
                  <tr>
                    <td className="table-cell ">{pageData?.hero_title?.tr}</td>
                    <td className="table-cell ">{pageData?.hero_title?.en}</td>
                  </tr>
                </HocData>
              </tbody>
            </table>
          </div>
        </div>

        {/* Hero -subheading */}
        <div className="">
          <TitleCard
            heading="Subheading - Hero Section"
            badge={null}
            has_link={true}
            link_label="Edit"
            link_href="/landing-page/subheading/edit"
          />
          <div className="border border-Gray-200 rounded-lg mt-2">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-head-cell border-b rounded-lg">
                    Turkish
                  </th>
                  <th className="table-head-cell border-b rounded-lg">
                    English
                  </th>
                </tr>
              </thead>
              <tbody>
                <HocData loaded={loaded} hasData={pageData} cols={2}>
                  <tr>
                    <td className="table-cell ">
                      {pageData?.hero_subtitle?.tr}
                    </td>
                    <td className="table-cell ">
                      {pageData?.hero_subtitle?.en}
                    </td>
                  </tr>
                </HocData>
              </tbody>
            </table>
          </div>
        </div>

        {/* Featured Item */}
        <div className="">
          <TitleCard
            heading="Featured On Section"
            badge={null}
            has_link={true}
            link_label="Edit"
            link_href="/landing-page/featured/edit"
          />
          <div className="flex flex-wrap gap-4 border border-Gray-200 rounded-lg py-4 px-6 mt-2">
            {pageData?.featured_on?.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-24 w-40 border border-Gray-200 rounded-lg p-2"
              >
                <img
                  src={item}
                  alt="Featured on image"
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Partner Item */}
        <div className="">
          <TitleCard
            heading="Partners Section"
            badge={null}
            has_link={true}
            link_label="Edit"
            link_href="/landing-page/partners/edit"
          />
          <div className="flex flex-wrap gap-4 border border-Gray-200 rounded-lg py-4 px-6 mt-2">
            {pageData?.partners?.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-24 w-40 border border-Gray-200 rounded-lg p-2"
              >
                <img
                  src={item}
                  alt="Featured on image"
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Join us Item */}
        <div className="">
          <TitleCard
            heading="Join Us Section"
            badge={null}
            has_link={true}
            link_label="Edit"
            link_href="/landing-page/join_us/edit"
          />
          <div className="flex flex-col gap-y-4 mt-2">
            {/* iterate items */}
            <div className="border border-Gray-200 rounded-lg">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-head-cell border-b rounded-lg">
                      Turkish
                    </th>
                    <th className="table-head-cell border-b rounded-lg">
                      English
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageData?.join_us?.map((item, i) => (
                    <tr key={i}>
                      <td className="table-cell border-b text-sm">{item.tr}</td>
                      <td className="table-cell border-b text-sm">{item.en}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* iterate items */}
          </div>
        </div>

        {/* Our name Item */}
        <div className="">
          <TitleCard
            heading="Our Name Section"
            badge={null}
            has_link={true}
            link_label="Edit"
            link_href="/landing-page/our_name/edit"
          />
          <div className="flex flex-col gap-y-4 mt-2">
            {/* iterate items */}
            <div className="border border-Gray-200 rounded-lg">
              <table className="w-full">
                <thead>
                  <tr>
                    <th
                      className="table-head-cell border-b rounded-lg"
                      width="50%"
                    >
                      Turkish
                    </th>
                    <th
                      className="table-head-cell border-b rounded-lg"
                      width="50%"
                    >
                      English
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="table-cell">
                      <div className="flex flex-col gap-y-2">
                        <div className="flex justify-center items-center rounded-lg w-full h-[180px] overflow-hidden border">
                          <img
                            src={pageData?.our_name?.image}
                            className="w-full h-auto"
                            alt="Our name"
                          />
                        </div>
                        <p className="text-base font-medium text-main-600">
                          {pageData?.our_name?.heading?.tr}
                        </p>
                        <h4 className="text-xl font-semibold text-Gray-800">
                          {pageData?.our_name?.title?.tr}
                        </h4>
                        <p className="text-sm">
                          {pageData?.our_name?.content?.tr}
                        </p>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-col gap-y-2">
                        <div className="flex justify-center items-center rounded-lg w-full h-[180px] overflow-hidden border">
                          <img
                            src={pageData?.our_name?.image}
                            className="w-full h-auto"
                            alt="Our name"
                          />
                        </div>
                        <p className="text-base font-medium text-main-600">
                          {pageData?.our_name?.heading?.en}
                        </p>
                        <h4 className="text-xl font-semibold text-Gray-800">
                          {pageData?.our_name?.title?.en}
                        </h4>
                        <p className="text-sm">
                          {pageData?.our_name?.content?.en}
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Content Item */}
        <div className="">
          <TitleCard
            heading="Contents Section"
            badge={null}
            has_link={true}
            link_label="Edit"
            link_href="/landing-page/contents/edit"
          />
          <div className="flex flex-col gap-y-4 mt-2">
            {/* iterate items */}
            {pageData?.contents?.map((item, i) => (
              <div key={i} className="border border-Gray-200 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th
                        className="table-head-cell border-b rounded-lg"
                        width="50%"
                      >
                        Turkish
                      </th>
                      <th
                        className="table-head-cell border-b rounded-lg"
                        width="50%"
                      >
                        English
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="table-cell">
                        <div className="flex flex-col gap-y-2">
                          <div className="flex justify-center items-center rounded-lg w-full h-[180px] overflow-hidden border">
                            <img
                              src={item?.image}
                              className="w-full h-auto"
                              alt="Content image"
                            />
                          </div>
                          <p className="text-base font-medium text-main-600">
                            {item?.heading?.tr}
                          </p>
                          <h4 className="text-xl font-semibold text-Gray-800">
                            {item?.title?.tr}
                          </h4>
                          <p className="text-sm">{item?.content?.tr}</p>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex flex-col gap-y-2">
                          <div className="flex justify-center items-center rounded-lg w-full h-[180px] overflow-hidden border">
                            <img
                              src={item?.image}
                              className="w-full h-auto"
                              alt="Content image"
                            />
                          </div>
                          <p className="text-base font-medium text-main-600">
                            {item?.heading?.en}
                          </p>
                          <h4 className="text-xl font-semibold text-Gray-800">
                            {item?.title?.en}
                          </h4>
                          <p className="text-sm">{item?.content?.en}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>
    </HOC>
  );
}
