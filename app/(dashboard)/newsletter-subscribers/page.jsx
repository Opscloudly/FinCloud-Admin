"use client";
import HOC from "@/components/HOC/HOC";
import Pagination from "@/components/Pagination";
import Input from "@/components/UI/Input";
import Pill from "@/components/UI/Pill";
import TitleCard from "@/components/cards/TitleCard";
import { TrashIcon } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Axios from "@/axios/Axios";
import { useRouter, useSearchParams } from "next/navigation";
import HocData from "@/components/HOC/HocData";
import Swal from "sweetalert2";
import InputDate from "@/components/UI/InputDate";
import Button from "@/components/UI/Button";
import queryString from "query-string";

export default function Blogs() {
  const lang = "tr";
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pageData, setPageData] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPageData([]);

        const {
          data: { status, data },
        } = await Axios.get(`subscribe/newsletter?${searchParams}`);
        if (status) {
          setPageData(data.data);
          setPaginationData(data.pagination);
        } else {
          setPaginationData(null);
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoaded(true);
      }
    };
    fetchData();
  }, [searchParams]);

  const setFilterFormData = () => {
    const initFilter = {
      start: searchParams.get("start") || "",
      end: searchParams.get("end") || "",
    };
    setFilter(initFilter);
  };

  const handleInput = ({ target: { name, value } }) => {
    setFilter((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSearch = () => {
    const queryString = new URLSearchParams();
    for (const i in filter) {
      if (filter[i]) {
        queryString.append(i, filter[i]);
      }
    }
    router.push(`/newsletter-subscribers?${queryString}`);
  };

  const handlePaginate = (e) => {
    const { page } = e.currentTarget.dataset;
    const queryString = new URLSearchParams();
    searchParams.forEach((item, i) => {
      if (item && i !== "page") {
        queryString.append(i, item);
      }
    });
    queryString.append("page", page);
    setLoaded(false);
    router.push(`/newsletter-subscribers?${queryString}`);
  };

  const handleExport = () => {
    const token = localStorage.getItem("admin_token");
    const queryString = new URLSearchParams();
    searchParams.forEach((item, i) => {
      if (item && i !== "page") {
        queryString.append(i, item);
      }
    });
    queryString.append("token", token);
    let url = process.env.NEXT_PUBLIC_API_BASE_URL;
    url += `export/newsletter-subscriber?${queryString}`;
    window.open(url, "_blank");
  };

  const handleRemoveItem = async (e) => {
    const copy__pageData = [...pageData];
    try {
      const { id } = e.currentTarget.dataset;

      const popup = await Swal.fire({
        title: "Are you sure?",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "#d63031",
        cancelButtonColor: "#B3B9C6",
        confirmButtonText: "Yes, delete it!",
      });

      if (popup.isConfirmed) {
        const remainingPageData = pageData.filter((item) => item.id != id);
        setPageData(remainingPageData);

        const data = new FormData();
        data.append("_method", "DELETE");
        const {
          data: { status, message },
        } = await Axios.post(`subscribe/newsletter/${id}`, data);
        if (status) {
          Swal.fire({
            icon: "success",
            title: "Item deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          setPageData(copy__pageData);
          console.log(message);
          Swal.fire({
            icon: "error",
            title: "Can't delete item",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (e) {
      console.log(e.message);
      setPageData(copy__pageData);
      Swal.fire({
        icon: "error",
        title: "Can't delete item. Client error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <HOC type="dashboard">
      <section className="flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2">
            <h2 className="text-black text-[28px] leading-[32px] font-medium">
              Newsletter Subscribers
            </h2>
            <div className="flex items-end">
              {paginationData?.total && (
                <p className="text-black text-xs font-medium py-1.5 px-2 rounded bg-main-600">
                  {paginationData?.total}
                </p>
              )}
            </div>
          </div>
          <Button
            label="Export"
            onClick={handleExport}
            className="text-white bg-Gray-800"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <InputDate
              name="start"
              value={filter.start}
              onChange={handleInput}
              placeholder="start date"
            />
          </div>
          <div>
            <InputDate
              name="end"
              value={filter.end}
              onChange={handleInput}
              placeholder="end date"
            />
          </div>
          <div>
            <Button
              label="Search"
              onClick={handleSearch}
              className="bg-main-600 text-Gray-50"
            />
          </div>
        </div>
        <div className="border border-Gray-200 rounded-lg">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-head-cell border-b rounded-lg">Email</th>
                <th className="table-head-cell border-b rounded-lg">
                  Submission Date
                </th>
                <th className="table-head-cell border-b rounded-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              <HocData loaded={loaded} hasData={!!pageData.length} cols={3}>
                {pageData?.map((item, i) => (
                  <tr key={i}>
                    <td className="table-cell border-b">{item.email}</td>
                    <td className="table-cell border-b">
                      <span className="text-Gray-600">{item.created_at}</span>
                    </td>
                    <td className="table-cell border-b">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          data-id={item.id}
                          onClick={handleRemoveItem}
                          className="w-10 h-10 flex items-center justify-center group hover:bg-red-100 transition-all duration-150 rounded-md"
                        >
                          <TrashIcon className="text-Gray-700 group-hover:text-red-600" />
                          &nbsp;
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </HocData>
            </tbody>
            {paginationData?.per_page < paginationData?.total && (
              <Pagination data={paginationData} onPageClick={handlePaginate} />
            )}
          </table>
        </div>
      </section>
    </HOC>
  );
}
