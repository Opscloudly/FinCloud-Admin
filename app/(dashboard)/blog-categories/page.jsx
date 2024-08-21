"use client";
import HOC from "@/components/HOC/HOC";
import Pagination from "@/components/Pagination";
import Input from "@/components/UI/Input";
import Pill from "@/components/UI/Pill";
import TitleCard from "@/components/cards/TitleCard";
import { ArrowLeft, ArrowRight, EditIcon, TrashIcon } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UtilityContext } from "@/contexts/UtilityContext";
import Axios from "@/axios/Axios";
import { useRouter, useSearchParams } from "next/navigation";
import HocData from "@/components/HOC/HocData";
import RemoveWithConfirmation from "@/components/popups/RemoveWithConfirmation";
import Swal from "sweetalert2";

export default function BlogCategories() {
  const lang = "tr";
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pageData, setPageData] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPageData([]);
        const {
          data: { status, message, data },
        } = await Axios.get(`blog/categories?${searchParams}`);
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

  const handlePaginate = (e) => {
    const { page } = e.currentTarget.dataset;
    setLoaded(false);
    router.push(`/blog-categories?page=${page}`);
  };

  return (
    <HOC type="dashboard">
      <section className="flex flex-col gap-y-6">
        <TitleCard
          heading="Categories for blog"
          badge={paginationData?.total}
          has_link={true}
          link_label="Add New"
          link_href="/blog-categories/add"
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
                <th className="table-head-cell border-b rounded-lg">Title</th>
                <th className="table-head-cell border-b rounded-lg">Status</th>
                <th className="table-head-cell border-b rounded-lg">
                  <p className="flex justify-center">Action</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <HocData loaded={loaded} hasData={!!pageData.length} cols={3}>
                {pageData?.map((item, i) => (
                  <tr key={i}>
                    <td className="table-cell border-b">
                      {item.category[lang]}
                    </td>

                    <td className="table-cell border-b">
                      <Pill label={item.status} className={item.status_type} />
                    </td>
                    <td className="table-cell border-b">
                      <div className="flex justify-center gap-1">
                        <Link
                          href={`/blog-categories/${item.id}/edit`}
                          className="w-10 h-10 flex items-center justify-center group hover:bg-main-60 transition-all duration-150 rounded-md"
                        >
                          <EditIcon className="text-Gray-700 group-hover:text-main-700" />
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
