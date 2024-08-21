import React, { ReactNode, useEffect, useState } from "react";
import FileLibraryCard from "./FileLibraryCard";
import Pagination from "../Pagination/Pagination";

const FileLibrary = (props) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const paginationData = props.pagination || {};
    const [search, setSearch] = useState(
        props.search || {
            search: "",
            filterBy: "",
        }
    );

    const handleSearchInput = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };

    const submitSearch = () => {
        setSelectedItems([]);
        props.handleSearch(search);
    };

    const HandleSelectItem = (item) => {
        if (props.multiple) {
            if (selectedItems.includes(item)) {
                setSelectedItems(selectedItems.filter((i) => i !== item));
            } else {
                setSelectedItems([...selectedItems, item]);
            }
        } else {
            setSelectedItems([item]);
        }
    };

    function renderList() {
        if (!props.fileLibraryList) return [];

        if (props.fileLibraryList.length == 0) {
            return (
                <div className="text-center block text-gray-500 text-sm mt-10 w-full">
                    No files found
                </div>
            );
        }

        return [...props.fileLibraryList].map((element, index) => {
            return (
                <div key={index} className="group">
                    <div
                        className="cursor-pointer"
                        onClick={() => HandleSelectItem(element)}
                    >
                        <FileLibraryCard
                            multiple={props.multiple}
                            selectedItems={selectedItems}
                            {...element}
                        />
                    </div>
                    {element.title && (
                        <div className="mb-1 mx-2" style={{ width: "130px" }}>
                            <p className="text-sm text-gray-600 truncate">
                                {element.title}
                            </p>
                            <p className="text-sm text-gray-700 truncate">
                                {element.name}
                            </p>
                        </div>
                    )}
                    <div className="ml-2 mb-2 flex justify-center invisible group-hover:visible">
                        <button
                            onClick={() => {
                                if (props.fileEditCallback) {
                                    props.fileEditCallback(element);
                                }
                            }}
                            className="bg-teal-600 hover:bg-teal-700 mr-1 text-white text-xs p-1 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        >
                            Edit <i className="fa fa-edit"></i>
                        </button>
                        <button
                            onClick={() => {
                                if (props.fileDeleteCallback) {
                                    props.fileDeleteCallback(element);
                                }
                            }}
                            className="bg-red-600 hover:bg-red-700 mr-1 text-white text-xs p-1 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        >
                            Delete <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            );
        });
    }

    const submitRow = selectedItems.length > 0 && (
        <div className="text-right mt-3">
            <button
                onClick={() => props.fileSelectCallback(selectedItems)}
                className="bg-teal-700 active:bg-teal-700 text-white font-semibold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
                Select File{props.multiple && "s"}
            </button>
        </div>
    );

    const pagerRow = paginationData.per_page < paginationData.total && (
        <Pagination
            current_page={paginationData.current_page}
            first_page_url={paginationData.first_page_url}
            links={paginationData.links}
            last_page={paginationData.last_page}
            last_page_url={paginationData.last_page_url}
            handlePagination={props.handlePagination}
        />
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-end py-3">
                <input
                    type="text"
                    value={search.search}
                    name="search"
                    onChange={handleSearchInput}
                    className="border border-gray-300 rounded text-xs px-1 py-1 mb-2 sm:mb-0 min-w-[150px] sm:mr-2"
                    placeholder="Search..."
                />
                <select
                    value={search.filterBy}
                    onChange={handleSearchInput}
                    name="filterBy"
                    className="border border-gray-300 rounded text-xs px-1 py-1 mb-2 sm:mb-0 min-w-[150px] sm:mr-2"
                >
                    <option value="">Sorting by...</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="recently_used">Last used</option>
                </select>
                <button
                    onClick={submitSearch}
                    className="bg-teal-700 active:bg-teal-700 text-white font-semibold uppercase text-xs px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                    Search
                </button>
            </div>

            {props.isLoading ? (
                <div className="text-center text-gray-500 text-sm mt-10">
                    Loading <i className="fa fa-spinner fa-spin"></i>
                </div>
            ) : (
                <>
                    <div className="py-3 flex flex-wrap">
                        {renderList()}
                    </div>
                    <div className="flex justify-between">
                        {pagerRow}
                        {submitRow}
                    </div>
                </>
            )}
        </div>
    );
};

FileLibrary.defaultProps = {
    sortProperty: "id",
    sortAscending: true,
    libraryCardComponent: FileLibraryCard,
};

export default FileLibrary;
