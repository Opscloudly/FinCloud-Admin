"use client";
import Axios from "@/axios/Axios";
import HOC from "@/components/HOC/HOC";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Login() {
  const router = useRouter();
  const { dispatchLogin } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [actionButtonActive, setActionButtonActive] = useState(false);
  const [notification, setNotification] = useState({
    status: true,
    msg: null,
    type: null,
  });

  const handleInput = ({ target: { name, value } }) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    try {
      setActionButtonActive(true);
      setNotification({ status: false, msg: null, type: null });
      const form_data = new FormData();
      form_data.append("email", formData.email);
      form_data.append("password", formData.password);

      const {
        data: { status, message, data },
      } = await Axios.post("login", form_data);
      if (status) {
        Axios.defaults.headers.Authorization = `Bearer ${data.token}`;
        dispatchLogin(data?.user, data?.token);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
      setNotification({
        status: true,
        msg: message,
        type: status ? "main" : "red",
      });
    } catch (e) {
      console.log(e.message);
    } finally {
      setActionButtonActive(false);
    }
  };

  return (
    <HOC type="login">
      <section className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-y-6 w-full max-w-[400px] p-10 rounded-xl shadow-xl border-t border-gray-100">
          <div className="flex justify-center">
            <h2 className="font-semibold text-Gray-900 text-xl capitalize">
              Admin Login
            </h2>
          </div>
          <div className="flex flex-col gap-y-2.5">
            <div className="">
              <label htmlFor="" className="font-medium text-sm text-Gray-900">
                Email
              </label>
              <div className="">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="" className="font-medium text-sm text-Gray-900">
                Password
              </label>
              <div className="">
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="pt-2">
              <Button
                label="Login"
                onClick={handleSubmit}
                disabled={actionButtonActive}
                className="bg-main-600 w-full"
              />
              <p
                className={`pt-1 text-sm font-medium text-${notification.type}-600`}
              >
                <span className="text-red-600">&nbsp;</span>{" "}
                {notification.status && <span>{notification.msg}</span>}
              </p>
            </div>
          </div>
        </div>
      </section>
    </HOC>
  );
}
