"use client";
import HOC from "@/components/HOC/HOC";
import TitleCard from "@/components/cards/TitleCard";
import { useEffect, useState } from "react";
import Axios from "@/axios/Axios";
import { useRouter, useSearchParams } from "next/navigation";
import HocData from "@/components/HOC/HocData";
import Image from "next/image";
import Link from "next/link";
import { EditIcon } from "@/components/Icons";

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
        } = await Axios.get("home-page");
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
      <div role="tablist" className="tabs tabs-lifted bg-white">
        {/* Section */}
        <input
          type="radio"
          name="home_page_section"
          role="tab"
          className="tab font-medium text-nowrap"
          aria-label="Hero"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-lg p-6 pt-8"
        >
          <HeroSection pageData={pageData} loaded={loaded} />
        </div>

        {/* Section */}
        <input
          type="radio"
          name="home_page_section"
          role="tab"
          className="tab font-medium text-nowrap"
          aria-label="About us"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-lg p-6 pt-8"
        >
          <AboutSection pageData={pageData} loaded={loaded} />
        </div>

        {/* Section */}
        <input
          type="radio"
          name="home_page_section"
          role="tab"
          className="tab font-medium text-nowrap"
          aria-label="Opportunities"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-lg p-6 pt-8"
        >
          <OpportunitySection pageData={pageData} loaded={loaded} />
        </div>

        {/* Section */}
        <input
          type="radio"
          name="home_page_section"
          role="tab"
          className="tab font-medium text-nowrap"
          aria-label="Join us"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-lg p-6 pt-8"
        >
          <JoinUsSection pageData={pageData} loaded={loaded} />
        </div>

        {/* Section */}
        <input
          type="radio"
          name="home_page_section"
          role="tab"
          className="tab font-medium text-nowrap"
          aria-label="Portfolio"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-lg p-6 pt-8"
        >
          <PortfolioSection pageData={pageData} loaded={loaded} />
        </div>

        {/* Section */}
        <input
          type="radio"
          name="home_page_section"
          role="tab"
          className="tab font-medium text-nowrap"
          aria-label="Gallery"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-lg p-6 pt-8"
        >
          <GallerySection pageData={pageData} loaded={loaded} />
        </div>
        {/* Section */}
        <input
          type="radio"
          name="home_page_section"
          role="tab"
          className="tab font-medium text-nowrap"
          aria-label="Featured on"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-lg p-6 pt-8"
        >
          <FeaturedOnSection pageData={pageData} loaded={loaded} />
        </div>
        {/* Section */}
        <input
          type="radio"
          name="home_page_section"
          role="tab"
          className="tab font-medium text-nowrap"
          aria-label="Partners"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-lg p-6 pt-8"
        >
          <PartnerSection pageData={pageData} loaded={loaded} />
        </div>
        {/* Section */}
        <input
          type="radio"
          name="home_page_section"
          role="tab"
          className="tab font-medium text-nowrap"
          aria-label="Newsletter"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-lg p-6 pt-8"
        >
          <NewsletterSection pageData={pageData} loaded={loaded} />
        </div>
      </div>
    </HOC>
  );
}

const HeroSection = ({ pageData, loaded }) => {
  return (
    <section className="flex flex-col gap-y-10">
      {/* Hero Section */}
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2">
            <h2 className="text-black text-xl font-medium">Hero Section</h2>
          </div>
          <div className="">
            <Link
              href="/home-page/hero/edit"
              className="flex items-center gap-x-1 text-black font-medium text-sm capitalize px-3 py-1.5 bg-main-600 rounded-md hover:opacity-90 transition-all duration-200"
            >
              <EditIcon className="w-3 h-3" /> Edit
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-y-8 border border-Gray-200 rounded-lg p-8 mt-2">
          {/* Sub heading */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Subheading</h4>
            </div>
            <div className="w-full border border-Gray-200 rounded-lg mt-2">
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
                      <td className="table-cell rounded-lg">
                        {pageData?.hero_subheading?.tr}
                      </td>
                      <td className="table-cell rounded-lg">
                        {pageData?.hero_subheading?.en}
                      </td>
                    </tr>
                  </HocData>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sub heading */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Statistics</h4>
            </div>
            <div className="w-full border border-Gray-200 rounded-lg mt-2">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-head-cell border-b rounded-lg">
                      Number of Transactions
                    </th>
                    <th className="table-head-cell border-b rounded-lg">
                      Number of Campaigns
                    </th>
                    <th className="table-head-cell border-b rounded-lg">
                      Number of Countries
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <HocData loaded={loaded} hasData={pageData} cols={2}>
                    <tr>
                      <td className="table-cell rounded-lg">
                        {pageData?.number_of_transactions}
                      </td>
                      <td className="table-cell rounded-lg">
                        {pageData?.number_of_campaigns}
                      </td>
                      <td className="table-cell rounded-lg">
                        {pageData?.number_of_countries}
                      </td>
                    </tr>
                  </HocData>
                </tbody>
              </table>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Carousel Images</h4>
            </div>
            <div className="flex flex-wrap gap-8"></div>
            {pageData?.hero_carousel_images?.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-40 w-40 overflow-hidden border border-Gray-200 rounded-lg p-2"
              >
                <img
                  src={item}
                  alt="Featured on image"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = ({ pageData, loaded }) => {
  return (
    <section className="flex flex-col gap-y-10">
      {/* Trusted.Responsible.Impactful */}
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2">
            <h2 className="text-black text-xl font-medium">
              Trusted. Responsible. Impactful Section
            </h2>
          </div>
          <div className="">
            <Link
              href="/home-page/about_us/edit"
              className="flex items-center gap-x-1 text-black font-medium text-sm capitalize px-3 py-1.5 bg-main-600 rounded-md hover:opacity-90 transition-all duration-200"
            >
              <EditIcon className="w-3 h-3" /> Edit
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-y-8 border border-Gray-200 rounded-lg p-8 mt-2">
          {pageData?.about?.map((item, i) => (
            <div key={i} className="w-full border border-Gray-200 rounded-lg">
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
                    <td className="table-cell rounded-lg">
                      <div className="flex flex-col gap-y-2">
                        <p className="text-base font-medium text-main-600">
                          {item?.icon}
                        </p>
                        <h4 className="text-xl font-semibold text-Gray-800">
                          {item?.title?.tr}
                        </h4>
                        <p className="text-sm">{item?.content?.tr}</p>
                      </div>
                    </td>
                    <td className="table-cell rounded-lg">
                      <div className="flex flex-col gap-y-2">
                        <p className="text-base font-medium text-main-600">
                          {item?.icon}
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
  );
};

const OpportunitySection = ({ pageData, loaded }) => {
  return (
    <section className="flex flex-col gap-y-10">
      {/* Investment opportunity */}
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2">
            <h2 className="text-black text-xl font-medium">
              Investment Opportunity Section
            </h2>
          </div>
          <div className="">
            <Link
              href="/home-page/opportunity/edit"
              className="flex items-center gap-x-1 text-black font-medium text-sm capitalize px-3 py-1.5 bg-main-600 rounded-md hover:opacity-90 transition-all duration-200"
            >
              <EditIcon className="w-3 h-3" /> Edit
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-y-8 border border-Gray-200 rounded-lg p-8 mt-2">
          {/* Heading */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Heading</h4>
            </div>
            <div className="w-full border border-Gray-200 rounded-lg mt-2">
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
                      <td className="table-cell rounded-lg">
                        {pageData?.investment_opportunity_heading?.tr}
                      </td>
                      <td className="table-cell rounded-lg">
                        {pageData?.investment_opportunity_heading?.en}
                      </td>
                    </tr>
                  </HocData>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sub heading */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Subheading</h4>
            </div>
            <div className="w-full border border-Gray-200 rounded-lg mt-2">
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
                      <td className="table-cell rounded-lg">
                        {pageData?.investment_opportunity_subheading?.tr}
                      </td>
                      <td className="table-cell rounded-lg">
                        {pageData?.investment_opportunity_subheading?.en}
                      </td>
                    </tr>
                  </HocData>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const JoinUsSection = ({ pageData, loaded }) => {
  return (
    <section className="flex flex-col gap-y-10">
      {/* Join us section */}
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2">
            <h2 className="text-black text-xl font-medium">Join Us Section</h2>
          </div>
          <div className="">
            <Link
              href="/home-page/join_us/edit"
              className="flex items-center gap-x-1 text-black font-medium text-sm capitalize px-3 py-1.5 bg-main-600 rounded-md hover:opacity-90 transition-all duration-200"
            >
              <EditIcon className="w-3 h-3" /> Edit
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-y-8 border border-Gray-200 rounded-lg p-8 mt-2">
          {/* Tagline */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Tagline</h4>
            </div>
            <div className="w-full border border-Gray-200 rounded-lg mt-2">
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
                      <td className="table-cell rounded-lg">
                        {pageData?.join_us_tagline?.tr}
                      </td>
                      <td className="table-cell rounded-lg">
                        {pageData?.join_us_tagline?.en}
                      </td>
                    </tr>
                  </HocData>
                </tbody>
              </table>
            </div>
          </div>
          {/* Make money lable */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Make Money Label</h4>
            </div>
            <div className="w-full border border-Gray-200 rounded-lg mt-2">
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
                      <td className="table-cell rounded-lg">
                        {pageData?.join_us_make_money_label?.tr}
                      </td>
                      <td className="table-cell rounded-lg">
                        {pageData?.join_us_make_money_label?.en}
                      </td>
                    </tr>
                  </HocData>
                </tbody>
              </table>
            </div>
          </div>
          {/* Need money label */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Need Money Label</h4>
            </div>
            <div className="w-full border border-Gray-200 rounded-lg mt-2">
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
                      <td className="table-cell rounded-lg">
                        {pageData?.join_us_need_money_label?.tr}
                      </td>
                      <td className="table-cell rounded-lg">
                        {pageData?.join_us_need_money_label?.en}
                      </td>
                    </tr>
                  </HocData>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PortfolioSection = ({ pageData, loaded }) => {
  return (
    <section className="flex flex-col gap-y-10">
      {/* Portfolio section */}
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2">
            <h2 className="text-black text-xl font-medium">
              Portfolio Section
            </h2>
          </div>
          <div className="">
            <Link
              href="/home-page/portfolio/edit"
              className="flex items-center gap-x-1 text-black font-medium text-sm capitalize px-3 py-1.5 bg-main-600 rounded-md hover:opacity-90 transition-all duration-200"
            >
              <EditIcon className="w-3 h-3" /> Edit
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-y-8 border border-Gray-200 rounded-lg p-8 mt-2">
          {/* Heading */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Heading</h4>
            </div>
            <div className="w-full border border-Gray-200 rounded-lg mt-2">
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
                      <td className="table-cell rounded-lg">
                        {pageData?.portfolio_heading?.tr}
                      </td>
                      <td className="table-cell rounded-lg">
                        {pageData?.portfolio_heading?.en}
                      </td>
                    </tr>
                  </HocData>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sub heading */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Subheading</h4>
            </div>
            <div className="w-full border border-Gray-200 rounded-lg mt-2">
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
                      <td className="table-cell rounded-lg">
                        {pageData?.portfolio_subheading?.tr}
                      </td>
                      <td className="table-cell rounded-lg">
                        {pageData?.portfolio_subheading?.en}
                      </td>
                    </tr>
                  </HocData>
                </tbody>
              </table>
            </div>
          </div>

          {/* portfolio Contents */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Contents</h4>
            </div>
            {pageData?.portfolio?.map((item, i) => (
              <div key={i} className="w-full border border-Gray-200 rounded-lg">
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
                      <td className="table-cell rounded-lg">
                        <div className="flex flex-col gap-y-2">
                          <h4 className="text-xl font-bold text-Gray-800">
                            {item?.heading?.tr}
                          </h4>
                          <h4 className="text-xl font-semibold text-Gray-800">
                            {item?.subheading?.tr}
                          </h4>
                          <p className="text-sm">{item?.details?.tr}</p>
                          <p className="text-Gray-700 italic">
                            Button label: {item?.link_label?.tr}
                          </p>
                          <p className="text-Gray-700 italic">
                            Button href: {item?.link_href}
                          </p>
                        </div>
                      </td>
                      <td className="table-cell rounded-lg">
                        <div className="flex flex-col gap-y-2">
                          <h4 className="text-xl font-bold text-Gray-800">
                            {item?.heading?.en}
                          </h4>
                          <h4 className="text-xl font-semibold text-Gray-800">
                            {item?.subheading?.en}
                          </h4>
                          <p className="text-sm">{item?.details?.en}</p>
                          <p className="text-Gray-700 italic">
                            Button label: {item?.link_label?.en}
                          </p>
                          <p className="text-Gray-700 italic">
                            Button href: {item?.link_href}
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const GallerySection = ({ pageData, loaded }) => {
  return (
    <section className="flex flex-col gap-y-10">
      {/* Gallery section */}
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2">
            <h2 className="text-black text-xl font-medium">Gallery Section</h2>
          </div>
          <div className="">
            <Link
              href="/home-page/gallery/edit"
              className="flex items-center gap-x-1 text-black font-medium text-sm capitalize px-3 py-1.5 bg-main-600 rounded-md hover:opacity-90 transition-all duration-200"
            >
              <EditIcon className="w-3 h-3" /> Edit
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-y-8 border border-Gray-200 rounded-lg p-8 mt-2">
          {/* Carousel */}
          <div className="relative flex flex-wrap justify-between gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Carousel Images</h4>
            </div>
            {pageData?.galleries?.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-[200px] w-[200px] overflow-hidden border border-Gray-200 rounded-lg p-2"
              >
                <img
                  src={item}
                  alt="Featured on image"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedOnSection = ({ pageData, loaded }) => {
  return (
    <section className="flex flex-col gap-y-10">
      {/* Featured on */}
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2">
            <h2 className="text-black text-xl font-medium">
              Featured On Section
            </h2>
          </div>
          <div className="">
            <Link
              href="/home-page/featured_on/edit"
              className="flex items-center gap-x-1 text-black font-medium text-sm capitalize px-3 py-1.5 bg-main-600 rounded-md hover:opacity-90 transition-all duration-200"
            >
              <EditIcon className="w-3 h-3" /> Edit
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-y-8 border border-Gray-200 rounded-lg p-8 mt-2">
          {/* Carousel */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Carousel Images</h4>
            </div>
            {pageData?.featured_on?.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-24 w-40 overflow-hidden border border-Gray-200 rounded-lg p-2"
              >
                <img
                  src={item}
                  alt="Featured on image"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PartnerSection = ({ pageData, loaded }) => {
  return (
    <section className="flex flex-col gap-y-10">
      {/* Partners */}
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2">
            <h2 className="text-black text-xl font-medium">Partners Section</h2>
          </div>
          <div className="">
            <Link
              href="/home-page/partners/edit"
              className="flex items-center gap-x-1 text-black font-medium text-sm capitalize px-3 py-1.5 bg-main-600 rounded-md hover:opacity-90 transition-all duration-200"
            >
              <EditIcon className="w-3 h-3" /> Edit
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-y-8 border border-Gray-200 rounded-lg p-8 mt-2">
          {/* Carousel */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Carousel Images</h4>
            </div>
            {pageData?.partners?.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-24 w-40 overflow-hidden border border-Gray-200 rounded-lg p-2"
              >
                <img
                  src={item}
                  alt="Featured on image"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsletterSection = ({ pageData, loaded }) => {
  return (
    <section className="flex flex-col gap-y-10">
      {/* Newsletter section */}
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2">
            <h2 className="text-black text-xl font-medium">
              Newsletter Section
            </h2>
          </div>
          <div className="">
            <Link
              href="/home-page/newsletter/edit"
              className="flex items-center gap-x-1 text-black font-medium text-sm capitalize px-3 py-1.5 bg-main-600 rounded-md hover:opacity-90 transition-all duration-200"
            >
              <EditIcon className="w-3 h-3" /> Edit
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-y-8 border border-Gray-200 rounded-lg p-8 mt-2">
          {/* Heading */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Heading</h4>
            </div>
            <div className="w-full border border-Gray-200 rounded-lg mt-2">
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
                      <td className="table-cell rounded-lg">
                        {pageData?.newsletter_heading?.tr}
                      </td>
                      <td className="table-cell rounded-lg">
                        {pageData?.newsletter_heading?.en}
                      </td>
                    </tr>
                  </HocData>
                </tbody>
              </table>
            </div>
          </div>
          {/* Subheading */}
          <div className="relative flex flex-wrap gap-4 border border-Gray-200 rounded-lg p-6 mt-2">
            <div className="absolute -top-4 left-8 bg-[#FCFCFC] px-1">
              <h4 className="text-xl font-medium">Subheading</h4>
            </div>
            <div className="w-full border border-Gray-200 rounded-lg mt-2">
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
                      <td className="table-cell rounded-lg">
                        {pageData?.newsletter_subheading?.tr}
                      </td>
                      <td className="table-cell rounded-lg">
                        {pageData?.newsletter_subheading?.en}
                      </td>
                    </tr>
                  </HocData>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
