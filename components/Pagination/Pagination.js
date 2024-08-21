import React from 'react'

export default function Pagination({ current_page, first_page_url, links, last_page, last_page_url, handlePagination }) {


    const printPainationLabel = (label) => {
        let data = label;
        if (label == "&laquo; Previous") data = '<i class="fas fa-chevron-left"></i>';
        if (label == "Next &raquo;") data = '<i class="fas fa-chevron-right"></i>';
        return data;
    };

    const btnCls =
        "cursor-pointer w-8 h-8 text-xs font-semibold flex mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid transition-all duration-150 ease-in-out border-teal-500 hover:border-teal-700";
    const activeBtnCls =
        "bg-teal-500 text-white hover:text-white hover:bg-teal-700";
    const inactiveBtncls = "bg-transparent text-teal-500 hover:text-teal-700";

    return (
        <div className="px-4 py-5 flex-auto">
            <div className="relative flex flex-wrap">
                <div className="w-full">
                    <nav className="block no_list_style">
                        <ul className="flex pl-0 rounded list-none flex-wrap">
                            {current_page > 1 && (
                                <li>
                                    <a
                                        onClick={() => handlePagination(event, first_page_url)}
                                        href={first_page_url}
                                        className={`${btnCls} ${inactiveBtncls}`}
                                    >
                                        First
                                    </a>
                                </li>
                            )}

                            {links.length > 0 && links.map((item, i) => (
                                <li key={i}>
                                    <a
                                        onClick={() => handlePagination(event, item.url)}
                                        className={`${btnCls} ${item.active ? activeBtnCls : inactiveBtncls
                                            }`}
                                        href={item.url}
                                        dangerouslySetInnerHTML={{
                                            __html: printPainationLabel(item.label),
                                        }}
                                    ></a>
                                </li>
                            ))}
                            {current_page < last_page && (
                                <li>
                                    <a
                                        onClick={() => handlePagination(event, last_page_url)}
                                        className={`${btnCls} ${inactiveBtncls}`}
                                        href={last_page_url}
                                    >
                                        Last
                                    </a>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}