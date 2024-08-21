'use client'
import React, { useState } from "react";
import FileUpload from "./FileUpload";
import FileLibrary from "./FileLibrary";
import Axios from "@/axios/Axios";

const GlobalGalleryTabs = (props) => {
    const [activeTab, setActiveTab] = useState("library");
    const [type, setType] = useState("");
    const [editItem, setEditItem] = useState({});

    const handleTabClick = (tabKey) => {
        setType("save");
        setActiveTab(tabKey);
        props.onTabChange(tabKey);
    };

    const fileEditCallback = (file) => {
        setType("update");
        setActiveTab("edit");
        setEditItem(file);
    };

    const fileDeleteCallback = (file) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this file?"
        );

        if (confirmDelete) {
            const token = localStorage.getItem("token");
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            Axios.delete(`admin/galleries/${file.id}`, { headers }).then(
                (response) => {
                    if (response.status == 200) {
                        handleTabClick("library");
                    }
                }
            );
        }
    };

    return (
        <div>
            <div className="border-b border-gray-200">
                <ul className="flex">
                    <li
                        className={`${
                            activeTab === "library"
                                ? "text-blue-500 border-b-2 border-blue-500"
                                : "text-gray-500 border-b-2 border-transparent hover:text-blue-500 hover:border-blue-500"
                        } cursor-pointer px-3 py-2 text-center text-xs list-none`}
                        onClick={() => handleTabClick("library")}
                    >
                        Library
                    </li>

                    <li
                        className={`${
                            activeTab === "upload"
                                ? "text-blue-500 border-b-2 border-blue-500"
                                : "text-gray-500 border-b-2 border-transparent hover:text-blue-500 hover:border-blue-500"
                        } cursor-pointer px-3 py-2 text-center text-xs list-none`}
                        onClick={() => handleTabClick("upload")}
                    >
                        Upload
                    </li>
                    {type == "update" && (
                        <li
                            className={`${
                                activeTab === "edit"
                                    ? "text-blue-500 border-b-2 border-blue-500"
                                    : "text-gray-500 border-b-2 border-transparent hover:text-blue-500 hover:border-blue-500"
                            } cursor-pointer px-3 py-2 text-center text-xs list-none`}
                        >
                            Edit
                        </li>
                    )}
                </ul>
            </div>
            <div className="p-3">
                {activeTab === "upload" && (
                    <div className="pt-3">
                        <FileUpload
                            type="save"
                            fileUploadCallback={props.fileUploadCallback}
                        />
                    </div>
                )}
                {activeTab === "edit" && (
                    <div className="pt-3">
                        <FileUpload
                            type="update"
                            fileEditCallback={fileEditCallback}
                            data={editItem}
                        />
                    </div>
                )}
                {activeTab === "library" && (
                    <FileLibrary
                        fileLibraryList={props.fileLibraryList}
                        pagination={props.pagination}
                        handlePagination={props.handlePagination}
                        handleSearch={props.handleSearch}
                        search={props.search}
                        isLoading={props.isLoading}
                        fileSelectCallback={props.fileSelectCallback}
                        fileDeleteCallback={fileDeleteCallback}
                        fileEditCallback={fileEditCallback}
                        libraryCardComponent={props.libraryCardComponent}
                        multiple={props.multiple}
                    />
                )}
            </div>
        </div>
    );
};

export default GlobalGalleryTabs;
