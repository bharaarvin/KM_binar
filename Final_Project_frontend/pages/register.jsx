import Header from "../components/Header";
import style from "../styles/modules/auth.module.css";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "react-bootstrap/Alert";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { registerAuth } from "../services/auth.js";
import ToastWrapper from "../components/ToastWrapper";

const validationSchema = yup.object().shape({
  name: yup.string().min(4).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function Register() {
  const router = useRouter();

  const [toastState, setToastState] = useState([]);
  const [stateRegistered, setStateRegistered] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [buttonName, setButtonName] = useState("Daftar");

  const handleRegister = async () => {
    setIsButtonLoading(true);
    const { httpCode, message } = await registerAuth(formRegister.values);
    setIsButtonLoading(false);
    if (httpCode === 200) {
      setToastState((prev) => [...prev, { type: "success", message: message }]);
      setStateRegistered(true);
      setButtonName("Click to Login");
    } else {
      setToastState((prev) => [...prev, { type: "danger", message: message }]);
    }
  };

  const label = {
    name: "Nama",
    email: "Email",
    password: "Password",
    id_role: "Tipe User",
  };

  const placeholder = {
    name: "Nama Lengkap",
    email: "Contoh: johndoe@gmail.com",
    password: "Masukan Password",
    id_role: "Tipe User",
  };

  const roleValue = [
    { value: 1, name: "Seller" },
    { value: 2, name: "Buyer" },
  ];

  const formRegister = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      id_role: 1,
    },
    validationSchema: validationSchema,
    onSubmit: () => handleRegister(),
  });

  return (
    <>
      <Header pageTitle="Register" />
      <div className={`${style["auth-wrapper"]} row m-0`}>
        <div className={`${style["bg-auth"]} position-relative col-lg-6 col-12 p-0`}>
          <div className={style["gradient"]}></div>
          <div className="position-absolute top-50 translate-middle-y ps-5 d-flex flex-column fs-1 fw-bold text-white">
            <span>Second</span>
            <span>Hand</span>
          </div>
        </div>
        <div className="col-lg-6 col-12 d-flex flex-column justify-content-center align-items-center">
          <form className={`${style["form-auth"]} d-flex flex-column gap-2`} onSubmit={formRegister.handleSubmit}>
            <h1 className="fw-bold fs-5">Daftar</h1>
            {stateRegistered ? (
              <Alert variant="success">Hooray! Register Successfully</Alert>
            ) : (
              Object.keys(formRegister.initialValues).map((key, index) => (
                <Input
                  key={index}
                  id={key}
                  name={key}
                  type={key === "id_role" ? "select" : key}
                  label={label[key]}
                  placeholder={placeholder[key]}
                  onChange={formRegister.handleChange}
                  selectMenu={key === "id_role" && roleValue}
                  defaultValue={formRegister.values[key]}
                  isError={formRegister.touched[key] && Boolean(formRegister.errors[key])}
                  errorMsg={formRegister.errors[key]}
                />
              ))
            )}
            <Button
              type={stateRegistered ? "button" : "submit"}
              className="w-100 mt-3"
              disabled={isButtonLoading}
              loading={isButtonLoading}
              onClick={() => {
                stateRegistered && router.push("/login");
              }}
            >
              {buttonName}
            </Button>
          </form>
          <div className={style["footer"]}>
            Sudah punya akun?
            <span>
              <Link href="/login">
                <a className={style["footer-link"]}>Masuk di sini</a>
              </Link>
            </span>
          </div>
        </div>
      </div>
      {toastState?.length > 0 && <ToastWrapper toastData={toastState} setToast={setToastState} />}
    </>
  );
}
