import Image from "next/image";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";
import { addNegotiation } from "../services/negotiation";

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  price: yup.string().min(2, "minimal terdapat 2 angka").required("harga tawar harus diisi"),
});

export default function ModalNego({ show, setShow, productData, access_token, setToastState, setLoading, setHasNego }) {
  const handleNegotiation = async () => {
    setLoading(true);
    const res = await addNegotiation(productData.id_product, formNegoProduct.values.price, access_token);
    if (res.httpCode === 200) {
      setToastState((prev) => [...prev, { type: "success", message: res.message }]);
      setHasNego(true);
    } else {
      setToastState((prev) => [...prev, { type: "danger", message: res.message }]);
    }
    setShow(false);
    setLoading(false);
  };

  const formNegoProduct = useFormik({
    initialValues: {
      price: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => handleNegotiation(),
  });

  if (show) {
    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        onClick={() => setShow(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: "1000" }}
      >
        <div
          className="position-relative d-flex flex-column gap-2 bg-white p-4"
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ borderRadius: "16px", width: "420px" }}
        >
          <button className="position-absolute end-0 p-2 rounded-3 border bg-white me-4 d-flex justify-content-center align-items-center" onClick={() => setShow(false)}>
            <Image src="/x.svg" alt="close" width={24} height={24} />
          </button>
          <div className="mt-3" style={{ fontWeight: "600" }}>
            Masukan Harga Tawaranmu
          </div>
          <div className="mt-3 text-secondary" style={{ fontSize: "14px", width: "85%" }}>
            Harga tawaranmu akan diketahui pejual, jika penjual cocok, kamu akan segera dihubungi penjual.
          </div>
          <div className="d-flex gap-4 align-items-center p-3 border mb-3" style={{ borderRadius: "10px", backgroundColor: "#eeeeee" }}>
            <div className="position-relative overflow-hidden rounded-3" style={{ width: "50px", height: "50px" }}>
              <Image src={productData.photo ? productData.photo[0] : "/no-photo.png"} alt="mini product photo" layout="fill" objectFit="cover" />
            </div>
            <div className="d-flex flex-column">
              <span style={{ fontSize: "16px", fontWeight: "500" }}>{productData.name ? productData.name : ""}</span>
              <span style={{ fontSize: "14px" }}>
                IDR
                {
                  Number(productData.price ? productData.price : 0)
                    .toLocaleString("id", { style: "currency", currency: "IDR" })
                    .match(/(?<=Rp)(.*)/g)[0]
                }
              </span>
            </div>
          </div>
          <Input
            id="price"
            name="price"
            type="number"
            label="Harga Tawar"
            placeholder="Rp. 0,00"
            onChange={formNegoProduct.handleChange}
            isError={formNegoProduct.touched["price"] && Boolean(formNegoProduct.errors["price"])}
            errorMsg={formNegoProduct.errors["price"]}
          />
          <Button className="mt-3" onClick={formNegoProduct.handleSubmit}>
            Kirim
          </Button>
        </div>
      </div>
    );
  }
}
