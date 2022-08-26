import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
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
  alamat: yup.string().min(6).required(),
  phone: yup.string().min(12).required(),
});

export default function Profil() {
  const router = useRouter();

  const [toastState, setToastState] = useState([]);
  const [stateRegistered, setStateRegistered] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [buttonName, setButtonName] = useState("Simpan");

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
  const typeInput = {
    name: "text",
    kota: "select",
    alamat: "text",
    phone: "text",
  };
  const label = {
    name: "Nama*",
    kota: "Kota*",
    alamat: "Alamat*",
    phone: "No Handphone*",
  };

  const placeholder = {
    name: "Nama",
    kota: "Pilih Kota",
    alamat: "Contoh: Jalan Ikan Hiu 33",
    phone: "contoh: +628123456789",
  };

  const roleValue = [
    { value: 1, name: "Medan" },
    { value: 2, name: "Aceh" },
  ];

  const formRegister = useFormik({
    initialValues: {
      name: "",
      kota: "",
      alamat: "",
      phone: 1,
    },
    validationSchema: validationSchema,
    onSubmit: () => handleRegister(),
  });

  return (
    <>
      <Header pageTitle="Info Profil" />
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">
            <img src="/logo.png" width="40" height="40" className="d-inline-block align-top " alt="logo" />
          </Navbar.Brand>
          <span className="mx-auto">Lengkapi Info Akun</span>
        </Container>
      </Navbar>

      <div className={`${style["auth-wrapper"]} row m-0`}>
        <div className="mt-4">
          <Container>
            <Button variant="secondary">
              <img src="/fi_arrow-left.png" alt="" />
            </Button>
          </Container>
        </div>
        <div className="  col-12 d-flex flex-column justify-content-center align-items-center">
          <Button variant="secondary">
            <img src="/Group 1.png" alt="" />
          </Button>

          <form className={`${style["form-auth"]} d-flex flex-column gap-2`} onSubmit={formRegister.handleSubmit}>
            {stateRegistered ? (
              <Alert variant="success">Hooray! Register Successfully</Alert>
            ) : (
              Object.keys(formRegister.initialValues).map((key, index) => (
                <div key={index}>
                  <Input
                    id={key}
                    name={key}
                    type={typeInput[key]}
                    label={label[key]}
                    placeholder={placeholder[key]}
                    onChange={formRegister.handleChange}
                    selectMenu={key === "kota" && roleValue}
                    isError={formRegister.touched[key] && Boolean(formRegister.errors[key])}
                    errorMsg={formRegister.errors[key]}
                  />
                </div>
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
        </div>
      </div>
      {toastState?.length > 0 && <ToastWrapper toastData={toastState} setToast={setToastState} />}
    </>
  );
}
