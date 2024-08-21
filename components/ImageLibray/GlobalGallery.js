'use client'
import React, { useEffect } from "react";
import { useState } from "react";
import GlobalGalleryTabs from "./GlobalGalleryTabs";
import Axios from "@/axios/Axios";
import queryString from "query-string";

const GlobalGallery = (props) => {
  const [show, setShow] = useState(props.show || false);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const query_string = queryString.parse();

  const [search, setSearch] = useState({
    search: "",
    filterBy: "",
  });

  const handleSearch = (propSearch) => {
    setSearch(propSearch);
    query_string.search = propSearch.search;
    query_string.filterBy = propSearch.filterBy;
    query_string.page = 1;
    loadGallery(query_string);
  };

  useEffect(() => {
    loadGallery(query_string);
  }, []);

  const loadGallery = async (query_string) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
        ContentType: "multipart/form-data",
        Accept: "application/json",
      };

      Axios.get("image-library", {
        params: query_string,
      }).then((response) => {
        if (response.status == 200) {
          setGallery(response.data.data);
          const pagination = {
            total: response.data.total,
            per_page: response.data.per_page,
            current_page: response.data.current_page,
            prev_page_url: response.data.prev_page_url,
            first_page_url: response.data.first_page_url,
            last_page_url: response.data.last_page_url,
            next_page_url: response.data.next_page_url,
            last_page: response.data.last_page,
            from: response.data.from,
            to: response.data.to,
            links: response.data.links,
          };

          setPagination(pagination);
        }

        setIsLoading(false);
      });
    } catch (err) {
      console.log("Fetching users Catch block: ", err.message);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    props.onHide({ target: { dataset: { name: null, multi: false } } });
  };

  const onTabChange = (tabKey) => {
    if (tabKey === "library") {
      loadGallery(query_string);
    }
  };

  const handlePagination = async (event, url) => {
    event.preventDefault();
    if (!url) return null;
    const params = new URL(url).searchParams;
    const page = params.get("page");
    query_string.page = page;
    loadGallery(query_string);
  };

  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } fixed z-50 inset-0 overflow-y-auto`}
      role="dialog"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>

        <div
          className={`${
            show
              ? "transform transition-all sm:align-middle sm:max-w-2xl sm:w-full min-h-screen-75"
              : "transform scale-0"
          } inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-screen-lg sm:w-full sm:p-6`}
          role="dialog"
        >
          <div className="block absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={handleClose}
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">{props.title}</h2>

            <GlobalGalleryTabs
              onTabChange={onTabChange}
              fileLibraryList={gallery}
              pagination={pagination}
              handlePagination={handlePagination}
              handleSearch={handleSearch}
              search={search}
              isLoading={isLoading}
              fileSelectCallback={props.fileSelectCallback}
              libraryCardComponent={props.libraryCardComponent}
              multiple={props.multiple}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

GlobalGallery.defaultProps = {
  title: "Global Gallery",
};

export default GlobalGallery;
