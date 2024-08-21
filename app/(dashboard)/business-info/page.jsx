"use client";
import HOC from "@/components/HOC/HOC";
import Pagination from "@/components/Pagination";
import Input from "@/components/UI/Input";
import Pill from "@/components/UI/Pill";
import TitleCard from "@/components/cards/TitleCard";
import {
  ArrowLeft,
  ArrowRight,
  EditIcon,
  TrashIcon,
  ViewIcon,
} from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UtilityContext } from "@/contexts/UtilityContext";
import Axios from "@/axios/Axios";
import { useRouter, useSearchParams } from "next/navigation";
import HocData from "@/components/HOC/HocData";
import RemoveWithConfirmation from "@/components/popups/RemoveWithConfirmation";
import Swal from "sweetalert2";
import Status from "@/components/UI/Status";

export default function Blogs() {
  const lang = "tr";
  const router = useRouter();
  const searchParams = useSearchParams();

  const { dispatchNotification } = useContext(UtilityContext);
  const [pageData, setPageData] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPageData([]);
        const {
          data: { status, message, data },
        } = await Axios.get(`business-infos?${searchParams}`);
        if (status) {
          setPageData(data.data);
          setPaginationData(data.pagination);
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoaded(true);
      }
    };
    fetchData();
  }, [searchParams]);

  const handleOnChange = ({ target: { name, value } }) => {
    //
  };

  const handlePaginate = (e) => {
    const { page } = e.currentTarget.dataset;
    setLoaded(false);
    router.push(`/blogs?page=${page}`);
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
        } = await Axios.post(`blogs/${id}`, data);
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
        <TitleCard
          heading="Business Information"
          badge={paginationData?.total}
          has_link={false}
        />
        {/*     <div className="grid grid-cols-4 gap-4">
          <div>
            <Input
              name="title"
              value=""
              onChange={handleOnChange}
              placeholder="Search by title"
            />
          </div>
          <div>
            <Input
              name="title"
              value=""
              onChange={handleOnChange}
              placeholder="Search by date"
            />
          </div>
          <div>
            <Input
              name="title"
              value=""
              onChange={handleOnChange}
              placeholder="Search by author"
            />
          </div>
          <div>
            <Input
              name="title"
              value=""
              onChange={handleOnChange}
              placeholder="Search by category"
            />
          </div>
        </div> */}
        <div className="border border-Gray-200 rounded-lg">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-head-cell border-b rounded-lg">Logo</th>
                <th className="table-head-cell border-b rounded-lg">Company</th>
                <th className="table-head-cell border-b rounded-lg">
                  Applied at
                </th>
                <th className="table-head-cell border-b rounded-lg">Status</th>
                <th className="table-head-cell border-b rounded-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              <HocData loaded={loaded} hasData={!!pageData.length} cols={5}>
                {pageData?.map((item, i) => (
                  <tr key={i}>
                    <td className="table-cell border-b">
                      <div className="flex items-center gap-x-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-main-50">
                          <img
                            src={
                              item.company_logo
                                ? item.company_logo
                                : "/assets/images/default/user.svg"
                            }
                            height={40}
                            width={40}
                            alt="Company logo avatar"
                          />
                        </div>
                        <span>{item.author?.name}</span>
                      </div>
                    </td>
                    <td className="table-cell border-b">
                      <span className="text-Gray-600">{item.company}</span>
                    </td>
                    <td className="table-cell border-b">
                      <span className="text-Gray-600">{item.created_at}</span>
                    </td>
                    <td className="table-cell border-b">
                      <Status status={item.status} />
                    </td>
                    <td className="table-cell border-b">
                      <div className="flex gap-1">
                        {/* <button
                          type="button"
                          data-id={item.id}
                          onClick={handleRemoveItem}
                          className="w-10 h-10 flex items-center justify-center group hover:bg-red-100 transition-all duration-150 rounded-md"
                        >
                          <TrashIcon className="text-Gray-700 group-hover:text-red-600" />
                          &nbsp;
                        </button> */}

                        <Link
                          href={`/business-info/${item.id}/review`}
                          className="w-10 h-10 flex items-center justify-center group hover:bg-main-60 transition-all duration-150 rounded-md"
                        >
                          <ViewIcon className="text-Gray-700 group-hover:text-main-700" />
                        </Link>
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
