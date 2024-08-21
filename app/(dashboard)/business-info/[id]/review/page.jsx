"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "@/components/UI/Button";
import { ArrowLeftLong } from "@/components/Icons";
import Link from "next/link";
import HOC from "@/components/HOC/HOC";
import Axios from "@/axios/Axios";
import { UtilityContext } from "@/contexts/UtilityContext";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import {
  FirstFormFields,
  FourthFormFields,
  SecondFormFields,
  ThirdFormFields,
} from "./FORM_FIELDS";
import ContentLoader from "@/components/ContentLoader";
import ContentNotFound from "@/components/ContentNotFound";

export default function BusinessInfoAddForm() {
  const [lang, setLang] = useState("tr");
  const router = useRouter();
  const { id } = useParams();
  const { dispatchNotification } = useContext(UtilityContext);
  const headingCardRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [approveButtonActive, setApproveButtonActive] = useState(false);
  const [rejectButtonActive, setRejectButtonActive] = useState(false);

  const [pageData, setPageData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { status, data },
        } = await Axios.get(`business-infos/${id}`);
        if (status) {
          setPageData(data);
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoaded(true);
      }
    };
    fetchData();
  }, []);

  const handleNext = () => {
    let nextStep = null;
    if (currentStep < 4) {
      nextStep = currentStep + 1;
    } else {
      nextStep = 4;
    }
    handleSubmit(nextStep);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    /* Clear on unmount */
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (headingCardRef.current) {
      const offsetTop = headingCardRef.current.getBoundingClientRect().top;
      setIsSticky(offsetTop <= 0);
    }
  };

  const handleApprove = async () => {
    try {
      setApproveButtonActive(true);
      const form_data = new FormData();
      form_data.append("_method", "PUT");
      const {
        data: { status, message },
      } = await Axios.post(`business-infos/approve/${id}`, form_data);
      if (status) {
        dispatchNotification({
          status: true,
          msg: message,
          type: "success",
        });
        router.push("/business-info");
      } else {
        console.log(message);
        dispatchNotification({
          status: true,
          msg: "Failed! Something went wrong in server side",
          type: "danger",
        });
      }
    } catch (e) {
      console.log(e.message);
      dispatchNotification({
        status: true,
        msg: "Failed! Something went wrong in client side",
        type: "danger",
      });
    } finally {
      setApproveButtonActive(false);
    }
  };

  const handleReject = async () => {
    try {
      setRejectButtonActive(true);
      const form_data = new FormData();
      form_data.append("_method", "PUT");
      const {
        data: { status, message },
      } = await Axios.post(`business-infos/reject/${id}`, form_data);
      if (status) {
        dispatchNotification({
          status: true,
          msg: message,
          type: "success",
        });
        router.push("/business-info");
      } else {
        console.log(message);
        dispatchNotification({
          status: true,
          msg: "Failed! Something went wrong in server side",
          type: "danger",
        });
      }
    } catch (e) {
      console.log(e.message);
      dispatchNotification({
        status: true,
        msg: "Failed! Something went wrong in client side",
        type: "danger",
      });
    } finally {
      setRejectButtonActive(false);
    }
  };

  return (
    <HOC type="dashboard">
      <section ref={headingCardRef} className="flex flex-col gap-y-6">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isSticky ? "stick-to-top" : ""
          }`}
        >
          <div className="flex gap-x-2">
            <h2 className="flex text-black text-[28px] leading-[32px] font-medium">
              <Link
                href="/business-info"
                className="hover:-translate-x-1 transition-transform duration-150"
              >
                <ArrowLeftLong className="text-black" />
              </Link>
              <span>Business Information Review</span>
            </h2>
          </div>
          {pageData && pageData?.status != "APPROVED" && (
            <div className="flex gap-4">
              <Button
                label="Reject"
                onClick={handleReject}
                disabled={rejectButtonActive}
                className="bg-red-600 text-white"
              />
              <Button
                label="Accept"
                onClick={handleApprove}
                disabled={approveButtonActive}
                className="bg-green-600 text-white"
              />
            </div>
          )}
        </div>
        {!loaded && <ContentLoader />}
        {loaded && !pageData && <ContentNotFound />}
        {loaded && pageData && (
          <div className="flex flex-col gap-y-6">
            <StepOne data={pageData} />
            <StepTwo data={pageData} />
            <StepThree data={pageData} />
            <StepFour data={pageData} />
          </div>
        )}
      </section>
    </HOC>
  );
}
