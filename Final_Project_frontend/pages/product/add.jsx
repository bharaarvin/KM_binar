/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import NavbarCustom from "../../components/Navbar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProductPhoto from "../../components/ProductPhoto";
import CardSeller from "../../components/Cardseller";
import CardDeskripsi from "../../components/Carddeskripsi";

import { useFormik } from "formik";
import * as yup from "yup";
import ToastWrapper from "../../components/ToastWrapper";
import { Container } from "react-bootstrap";
import { getCategory } from "../../services/category";
import { addProduct } from "../../services/product";
import { verifyToken } from "../../services/auth";
import Loading from "../../components/Loading";

const validationSchema = yup.object().shape({
  name: yup.string().min(4, "minimal terdapat 4 karakter").required("nama produk harus diisi"),
  price: yup.string().min(3, "minimal terdapat 3 digit").required("harga produk harus diisi"),
  id_category: yup.number().required(),
  description: yup.string().min(12, "minimal terdapat 12 karakter").required("deskripsi produk harus diisi"),
  photo: yup.string().required("We need a photo before you post it"),
});

export default function AddProduct({ categoryData, access_token, userData }) {
  const router = useRouter();
  const [toastState, setToastState] = useState([]);
  const [productPhoto, setProductPhoto] = useState(null);
  const [kategori, setKategori] = useState([]);
  const [previewState, setPreviewState] = useState(false);
  const [choosedCategory, setChoosedCategory] = useState(null);
  const [userLogged, setUserLogged] = useState({});
  const [loadingState, setLoadingState] = useState(false);

  const handleAddProduct = async () => {
    setLoadingState(true);
    const { name, id_category, description, price } = formAddProduct.values;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("id_category", id_category);
    formData.append("description", description);
    if (productPhoto) formData.append("photo", productPhoto);

    const addNewProduct = await addProduct(formData, access_token);
    if (addNewProduct.httpCode === 200) {
      setToastState((prev) => [...prev, { type: "success", message: addNewProduct.message }]);
      setTimeout(() => {
        router.push("/");
      }, [2000]);
    } else {
      setToastState((prev) => [...prev, { type: "danger", message: addNewProduct.message }]);
    }
    setLoadingState(false);
  };

  const typeInput = {
    name: "text",
    price: "number",
    id_category: "select",
    description: "textarea",
    photo: "photo",
  };

  const label = {
    name: "Nama Produk",
    price: "Harga Produk",
    id_category: "Kategori",
    description: "Deskripsi",
    photo: "Foto Produk",
  };

  const placeholder = {
    name: "Nama Produk",
    price: "Rp 0,00",
    id_category: "Pilih Kategori",
    description: "Contoh: jalan Ikan Hiu 33",
    photo: "",
  };

  const handlePhoto = (event) => {
    if (event.currentTarget.files[0] && event.currentTarget.files[0].size > 2000000) {
      return setToastState((prev) => [...prev, { type: "danger", message: "Foto yang anda masukan lebih dari 2MB" }]);
    }
    setProductPhoto(event.currentTarget.files[0]);
    formAddProduct.handleChange(event);
  };

  // const toBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });

  const handlePreview = async () => {
    const isValid = validationSchema.isValidSync(formAddProduct.values);

    if (isValid) {
      kategori.map((item) => {
        if (Number(formAddProduct.values.id_category) === item.value) {
          setChoosedCategory(item.name);
        }
      });
      setPreviewState(true);
    } else {
      formAddProduct.validateForm().then((val) => {
        Object.keys(val).map((key) => {
          formAddProduct.setFieldTouched(`${key}`, true);
          formAddProduct.setFieldError(`${key}`, val[key]);
        });
      });
    }
  };

  const formAddProduct = useFormik({
    initialValues: {
      name: "",
      price: "",
      id_category: 1,
      description: "",
      photo: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => handleAddProduct(),
  });

  useEffect(() => {
    if (userData.id_role === 2) {
      return router.back();
    }
    setUserLogged(userData);
    setKategori(categoryData.filter((item) => item.name !== "Semua"));
  }, []);

  return (
    <>
      <Header pageTitle="Info Produk" />
      <NavbarCustom userData={userLogged} />
      {previewState ? (
        <Container>
          <div className="row mt-5">
            <div className="col-8">
              <ProductPhoto photo={[URL.createObjectURL(productPhoto)]} />
              <CardDeskripsi description={formAddProduct.values.description} />
            </div>
            <div className="col-4 d-flex flex-column gap-4">
              <div className="position-relative border p-4 d-flex flex-column gap-2" style={{ borderRadius: "16px" }}>
                <button className="position-absolute end-0 p-2 rounded-3 border bg-white me-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#D61C4E">
                    <path
                      d="M20.84 4.60999C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.60999L12 5.66999L10.94 4.60999C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.60999C2.1283 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.49999C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.60999V4.60999Z"
                      stroke="#D61C4E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <h1 className="fs-5 m-0">{formAddProduct.values.name ? formAddProduct.values.name : ""}</h1>
                <span className="text-secondary">{formAddProduct.values.category_name}</span>
                <span className="fs-4" style={{ fontWeight: "500" }}>
                  IDR
                  {
                    Number(formAddProduct.values.price)
                      .toLocaleString("id", { style: "currency", currency: "IDR" })
                      .match(/(?<=Rp)(.*)/g)[0]
                  }
                </span>
                <span style={{ fontSize: "14px" }}>tersisa 12 lagi!</span>
                <span className="text-secondary mt-4" style={{ fontSize: "12px" }}>
                  382 orang menyukai produk ini
                </span>
                <Button className="w-100 mt-4" onClick={() => handleAddProduct()}>
                  Terbitkan
                </Button>
                <Button className="w-100 mt-2" variant="secondary" onClick={() => setPreviewState(false)}>
                  Edit
                </Button>
              </div>
              <CardSeller photo={userLogged?.photo} name={userLogged?.name} city={userLogged?.city} />
            </div>
          </div>
        </Container>
      ) : (
        <Container className="d-flex justify-content-center pt-5">
          <div className="d-flex gap-4 w-75">
            <button onClick={() => router.back()} className="p-2 rounded-2 bg-white" style={{ height: "fit-content", borderColor: "#0e0e0e" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 19L5 12L12 5" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <form onSubmit={formAddProduct.handleSubmit} className="d-flex flex-column gap-3 w-75">
              {Object.keys(formAddProduct.initialValues).map((key, index) => {
                if (!key.includes("photo")) {
                  return (
                    <Input
                      key={index}
                      id={key}
                      name={key}
                      type={typeInput[key]}
                      label={label[key]}
                      placeholder={placeholder[key]}
                      onChange={formAddProduct.handleChange}
                      selectMenu={kategori}
                      defaultValue={formAddProduct.values[key]}
                      isError={formAddProduct.touched[key] && Boolean(formAddProduct.errors[key])}
                      errorMsg={formAddProduct.errors[key]}
                    />
                  );
                } else {
                  return productPhoto ? (
                    <div key={index} className="position-relative mb-4" style={{ width: "150px", height: "150px" }}>
                      <div className="mb-2" style={{ fontSize: "14px" }}>
                        Foto Produk
                      </div>
                      <button
                        className="position-absolute top-0 end-0 bg-white border p-1 rounded-3 d-flex justify-content-center align-content-center"
                        style={{ zIndex: "1", transform: "translate(6px, 20px)" }}
                        onClick={() => {
                          setProductPhoto(null);
                          formAddProduct.setFieldValue("photo", "");
                        }}
                      >
                        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.5 6L5.5 17" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M5.5 6L16.5 17" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <div className="position-relative overflow-hidden w-100 h-100" style={{ borderRadius: "16px" }}>
                        <Image src={URL.createObjectURL(productPhoto)} alt="preview photo" layout="fill" objectFit="cover" />
                      </div>
                    </div>
                  ) : (
                    <Input
                      key={index}
                      id={key}
                      name={key}
                      type={typeInput[key]}
                      label={label[key]}
                      placeholder={placeholder[key]}
                      onChange={handlePhoto}
                      selectMenu={kategori}
                      isError={formAddProduct.touched[key] && Boolean(formAddProduct.errors[key])}
                      errorMsg={formAddProduct.errors[key]}
                    />
                  );
                }
              })}
              <div className="row row-cols-1 row-cols-md-2 mt-3">
                <div className="col pe-md-2 mb-3 mb-md-0">
                  <Button variant="secondary" className="w-100" type="button" onClick={handlePreview}>
                    Preview
                  </Button>
                </div>
                <div className="col ps-md-2">
                  <Button className="w-100" type="submit">
                    Terbitkan
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Container>
      )}
      {toastState?.length > 0 && <ToastWrapper toastData={toastState} setToast={setToastState} />}
      <Loading show={loadingState} />
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  let categoryData = [];
  const resCategory = await getCategory();
  if (resCategory?.httpCode === 200) {
    let _tempCategory = resCategory.data.map(({ id_category, name }) => {
      return {
        value: id_category,
        name: name,
      };
    });
    categoryData.push(..._tempCategory);
  }

  const access_token = req.cookies.access_token ? JSON.parse(JSON.stringify(req.cookies.access_token)) : null;
  let userData = null;
  if (access_token) {
    const verify = await verifyToken(access_token);
    if (verify.httpCode === 200) {
      userData = verify.data;
    }
  }
  return {
    props: {
      categoryData,
      access_token,
      userData,
    },
  };
}
