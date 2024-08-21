import React from 'react';
export default function PaginationLinks({ data, onPageClick }) {
    if (!data) {
        return null;
    }
    const icons = ['<', '>'];
    const printIcon = {
        '<': <i className="fas fa-chevron-left"></i>,
        '>': <i className="fas fa-chevron-right"></i>,
    }
    return (
        <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-y-2 py-8 text-body px-10">
            <div className="">
                <p className="font-medium">
                    Showing {data.from} to {data.to} of {data.total} entries
                </p>
            </div>
            <nav className="grow">
                <div className="flex justify-end gap-x-1.5">
                    {data?.links?.map((item) => (
                        <p
                            key={item.label}
                            className=""
                        >
                            <button
                                type="button"
                                data-page={item.page}
                                onClick={onPageClick}
                                disabled={!item.page || item.active}
                                className={`${item.active ? "bg-blueGray-400" : "bg-teal-500"} ${
                                    item.page ? "" : "cursor-not-allowed"
                                } w-8 h-8 flex justify-center items-center rounded-full text-center text-white hover:bg-opacity-80 transition-all duration-200 ease-in-out`}
                            >
                                {icons.includes(item.label) ? printIcon[item.label] : item.label}
                            </button>
                        </p>
                    ))}
                </div>
            </nav>
        </div>
    );
}
