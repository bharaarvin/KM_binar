import Header from "../components/Header";
import style from "../styles/modules/auth.module.css";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from "next/link";
import ToastWrapper from "../components/ToastWrapper";
import { useState } from "react";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import * as yup from "yup";
import { loginAuth } from "../services/auth.js";
import { set } from "../services/cookie";

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function Login() {
  const router = useRouter();

  const [toastState, setToastState] = useState([]);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const handleLogin = async () => {
    setIsButtonLoading(true);
    const { httpCode, message, token } = await loginAuth(formLogin.values);
    setIsButtonLoading(false);
    if (httpCode === 200) {
      setToastState((prev) => [...prev, { type: "success", message: message }]);
      await set("access_token", token);
      router.push("/");
    } else {
      setToastState((prev) => [...prev, { type: "danger", message: message }]);
    }
  };

  const label = {
    email: "Email",
    password: "Password",
  };

  const placeholder = {
    email: "Contoh: johndoe@gmail.com",
    password: "Masukan Password",
  };

  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => handleLogin(),
  });

  return (
    <>
      <Header pageTitle="Login" />
      <div className={`${style["auth-wrapper"]} row m-0`}>
        <div className={`${style["bg-auth"]} position-relative col-lg-6 p-0`}>
          <div className={style["gradient"]}></div>
          <div className="position-absolute top-50 translate-middle-y ps-5 d-flex flex-column fs-1 fw-bold text-white">
            <span>Second</span>
            <span>Hand</span>
          </div>
        </div>
        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
          <form className={`${style["form-auth"]} d-flex flex-column gap-2`} onSubmit={formLogin.handleSubmit}>
            <h1 className="fw-bold fs-5">Masuk</h1>
            {Object.keys(formLogin.initialValues).map((key, index) => (
              <Input
                key={index}
                id={key}
                name={key}
                type={key}
                label={label[key]}
                placeholder={placeholder[key]}
                onChange={formLogin.handleChange}
                defaultValue={formLogin.values[key]}
                isError={formLogin.touched[key] && Boolean(formLogin.errors[key])}
                errorMsg={formLogin.errors[key]}
              />
            ))}
            <Button type="submit" className="w-100 mt-3" disabled={isButtonLoading} loading={isButtonLoading}>
              Masuk
            </Button>
          </form>
          <div className={style["footer"]}>
            Belum punya akun?
            <span>
              <Link href="/register">
                <a className={style["footer-link"]}>Daftar di sini</a>
              </Link>
            </span>
          </div>
        </div>
      </div>
      {toastState?.length > 0 && <ToastWrapper toastData={toastState} setToast={setToastState} />}
    </>
  );
}
