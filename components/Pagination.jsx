import { ArrowLeft, ArrowRight } from "./Icons";

export default function Pagination({ data, onPageClick }) {
  return (
    <tfoot>
      <tr className="bg-white">
        <td colSpan={5} className="py-5">
          <div className="flex justify-center items-center">
            <ul className="flex">
              {data?.links?.map((item) => (
                <PaginateLink
                  key={item.label}
                  item={item}
                  onPageClick={onPageClick}
                />
              ))}
            </ul>
          </div>
        </td>
      </tr>
    </tfoot>
  );
}

const PaginateLink = ({ item, onPageClick }) => {
  if (item.label == "<") {
    return (
      <button
        type="button"
        data-page={item.page}
        onClick={onPageClick}
        disabled={!item.page || item.active}
        className={`group flex gap-x-2 py-2 px-3.5 text-sm font-semibold text-Gray-700 hover:text-main-700 hover:bg-main-50 border border-gray-200 rounded-lg transition-all duration-150 ${
          item.active ? "" : ""
        } ${item.page ? "" : "cursor-not-allowed"}`}
      >
        <ArrowLeft className="text-Gray-700 group-hover:text-main-700" />{" "}
        <span>Previous</span>
      </button>
    );
  }

  if (item.label == ">") {
    return (
      <button
        type="button"
        data-page={item.page}
        onClick={onPageClick}
        disabled={!item.page || item.active}
        className={`group flex gap-x-2 py-2 px-3.5 text-sm font-semibold text-Gray-700 hover:text-main-700 hover:bg-main-50 border border-gray-200 rounded-lg transition-all duration-150 ${
          item.page ? "" : "cursor-not-allowed"
        }`}
      >
        <span>Next</span>
        <ArrowRight className="text-Gray-700 group-hover:text-main-700" />
      </button>
    );
  }

  return (
    <li>
      <button
        type="button"
        data-page={item.page}
        onClick={onPageClick}
        disabled={!item.page || item.active}
        className={`pagination-link ${
          item.active ? "bg-main-50 text-main-700" : ""
        } ${item.page ? "" : "cursor-not-allowed"}`}
      >
        {item.label}
      </button>
    </li>
  );
};

/* 
<li className="mr-5">
                <button
                  type="button"
                  className="group flex gap-x-2 py-2 px-3.5 text-sm font-semibold text-Gray-700 hover:text-main-700 hover:bg-main-50 border border-gray-200 rounded-lg transition-all duration-150"
                >
                  <ArrowLeft className="text-Gray-700 group-hover:text-main-700" />{" "}
                  <span>Previous</span>
                </button>
              </li>
              <li>
                <button type="button" className="pagination-link">
                  1
                </button>
              </li>
              <li>
                <button type="button" className="pagination-link">
                  2
                </button>
              </li>
              <li>
                <button type="button" className="pagination-link">
                  3
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="pagination-link hover:bg-Gray-100 hover:text-Gray-600 hover:cursor-not-allowed"
                >
                  ...
                </button>
              </li>
              <li>
                <button type="button" className="pagination-link">
                  8
                </button>
              </li>
              <li>
                <button type="button" className="pagination-link">
                  9
                </button>
              </li>
              <li>
                <button type="button" className="pagination-link">
                  10
                </button>
              </li>
              <li className="ml-5">
                <button
                  type="button"
                  className="group flex gap-x-2 py-2 px-3.5 text-sm font-semibold text-Gray-700 hover:text-main-700 hover:bg-main-50 border border-gray-200 rounded-lg transition-all duration-150"
                >
                  <span>Next</span>
                  <ArrowRight className="text-Gray-700 group-hover:text-main-700" />
                </button>
              </li>
*/
