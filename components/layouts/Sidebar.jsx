import Link from "next/link";
import {
  BlogIcon,
  CampaignIcon,
  CogIcon,
  DashboardIcon,
  InvestorIcon,
  IssuerIcon,
  PageIcon,
  StuffIcon,
  SupportIcon,
  UserRoleIcon,
  WebsiteIcon,
} from "../Icons";

export default function Sidebar() {
  return (
    <div>
      <ul className="flex flex-col gap-y-4 menu">
        <li>
          <Link
            href="/"
            className="group group flex gap-x-4 px-4 py-2.5 text-Gray-800 menu-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
          >
            <DashboardIcon className="text-Gray-500 group-hover:text-main-700" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/business-info"
            className="group flex gap-x-4 px-4 py-2.5 text-Gray-800 menu-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
          >
            <BlogIcon className="text-Gray-500 group-hover:text-main-700" />
            <span>Business Info</span>
          </Link>
        </li>
        <li>
          <details>
            <summary className="group px-4 py-2.5 text-Gray-800 menu-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg">
              <div className="flex gap-x-4">
                <CampaignIcon className="text-Gray-500 group-hover:text-main-700" />
                <span>Campaigns</span>
              </div>
            </summary>
            <ul>
              <li>
                <Link
                  href="/campaigns"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Campaigns List</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/campaigns/menus"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Campaigns Menus</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/campaigns/categories"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Categories</span>
                </Link>
              </li>
              {/*  <li>
                <Link
                  href="/campaigns/sort"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Sort Campaigns</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/campaign/question-and-answers"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Campaigns Q&A</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/campaigns/comments"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Comments</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/campaigns/transactions"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Campaigns Transaction</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/campaigns/payouts"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Payout</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/campaigns/calculator"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Calculator</span>
                </Link>
              </li>
               */}
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary className="group px-4 py-2.5 text-Gray-800 menu-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg">
              <div className="flex gap-x-4">
                <BlogIcon className="text-Gray-500 group-hover:text-main-700" />{" "}
                <span>Blogs</span>
              </div>
            </summary>
            <ul>
              <li>
                <Link
                  href="/blogs"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Blog List</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog-categories"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Blog Categories</span>
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <Link
            href="/interest-submission"
            className="group flex gap-x-4 px-4 py-2.5 text-Gray-800 menu-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
          >
            <BlogIcon className="text-Gray-500 group-hover:text-main-700" />
            <span>Submit Interests</span>
          </Link>
        </li>
        <li>
          <Link
            href="/newsletter-subscribers"
            data-tip="Newsletter subscribers list"
            className="group flex gap-x-4 px-4 py-2.5 text-Gray-800 menu-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg tooltip tooltip-right"
          >
            <BlogIcon className="text-Gray-500 group-hover:text-main-700" />
            <span>Subscribers</span>
          </Link>
        </li>
        {/* 
        <li>
          <Link
            href="/role-permission"
            className="group flex gap-x-4 px-4 py-2.5 text-Gray-800 menu-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
          >
            <UserRoleIcon className="text-Gray-500 group-hover:text-main-700" />
            <span>Roles & Permissions</span>
          </Link>
        </li>
        <li>
          <Link
            href="/stuffs"
            className="group flex gap-x-4 px-4 py-2.5 text-Gray-800 menu-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
          >
            <StuffIcon className="text-Gray-500 group-hover:text-main-700" />
            <span>Stuff</span>
          </Link>
        </li>
        <li>
          <details>
            <summary className="group px-4 py-2.5 text-Gray-800 menu-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg">
              <div className="flex gap-x-4">
                <InvestorIcon className="text-Gray-500 group-hover:text-main-700" />
                <span>Investors</span>
              </div>
            </summary>
            <ul>
              <li>
                <Link
                  href="/investors"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Investors List</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/investors/banks"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Bank List</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/investors/disburse"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Disburse Investor</span>
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary className="group px-4 py-2.5 text-Gray-800 menu-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg">
              <div className="flex gap-x-4">
                <IssuerIcon className="text-Gray-500 group-hover:text-main-700" />
                <span>Issuers</span>
              </div>
            </summary>
            <ul>
              <li>
                <Link
                  href="/issuers"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Issuer List</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/issuers/approved"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Pending Approval</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/issuer/rejected"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Rejected Issuers</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/issuers/banks"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Bank List</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/issuer/disburse"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Disburse Issuer</span>
                </Link>
              </li>
            </ul>
          </details>
        </li> 

        <li>
          <details>
            <summary className="group px-4 py-2.5 text-Gray-800 menu-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg">
              <div className="flex gap-x-4">
                <PageIcon className="text-Gray-500 group-hover:text-main-700" />
                <span>Page Management</span>
              </div>
            </summary>
            <ul>
              <li>
                <Link
                  href="/pages/menus"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Page Menu</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pages"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Pages</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/sort"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Sort Pages</span>
                </Link>
              </li>
            </ul>
          </details>
        </li>
         */}
        <li>
          <details>
            <summary className="group px-4 py-2.5 text-Gray-800 menu-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg">
              <div className="flex gap-x-4">
                <WebsiteIcon className="text-Gray-500 group-hover:text-main-700" />
                <span>Website Control</span>
              </div>
            </summary>
            <ul>
              <li>
                <Link
                  href="/home-page"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Home page</span>
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/sliders"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Sliders</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/social-links"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Social Links</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/home-gallery"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Home Gallery</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/featured-on-sliders"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Featured On Slider</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/partners-sliders"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Partners Slider</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>FAQs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/site-settings"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Site Settings</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/media-coverage"
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-Gray-800 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                >
                  <span>Media Coverage</span>
                </Link>
              </li> */}
            </ul>
          </details>
        </li>
      </ul>
      {/* 
      <ul className="flex flex-col gap-y-4 mt-[160px]">
        <li>
          <Link
            href="#"
            className="group flex gap-x-4 px-4 py-2.5 text-Gray-800 menu-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
          >
            <SupportIcon className="text-Gray-500 group-hover:text-main-700" />
            <span>Support</span>
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="group flex gap-x-4 px-4 py-2.5 text-Gray-800 menu-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
          >
            <CogIcon className="text-Gray-500 group-hover:text-main-700" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
          */}
    </div>
  );
}
