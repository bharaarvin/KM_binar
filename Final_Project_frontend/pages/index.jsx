/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../components/Button";
import Header from "../components/Header";
import Slider from "../components/Slider";
import NavbarCustom from "../components/Navbar";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Card from "../components/Card";
import Link from "next/link";
import { verifyToken } from "../services/auth";
import { getCategory } from "../services/category";
import { getAllProduct, getProductByCategory } from "../services/product";
import ToastWrapper from "../components/ToastWrapper";
import { getAllPromo } from "../services/promo";

export default function Home({ access_token, userData, categoryData, productData, promoData }) {
  const [toastState, setToastState] = useState([]);
  const [sliderData, setSliderData] = useState([
    {
      photo: "/no-photo.png",
      url: "/promo/3",
    },
  ]);

  const [activeSelectedCategory, setActiveSelectedCategory] = useState("Semua");
  const [category, setCategory] = useState(null);
  const [userLogged, setUserLogged] = useState(null);
  const [cardProduct, setCardProduct] = useState(null);

  const handleChangeCategory = async (id_category, name) => {
    setActiveSelectedCategory(name);
    let res = name === "Semua" ? await getAllProduct() : await getProductByCategory(id_category, access_token);
    setCardProduct(res.data);
  };

  useEffect(() => {
    setUserLogged(userData);
    setCategory(categoryData);
    setCardProduct(productData);
    setSliderData(promoData);
  }, []);

  return (
    <>
      <Header pageTitle="Ecommerce" />
      <NavbarCustom userData={userLogged} />
      <div className="w-100"></div>
      <Slider sliderData={sliderData} />
      <Container className="mt-2 pt-5">
        <h1 className="fs-5">Telusuri Kategori</h1>
        <div className="d-flex gap-3 mt-3">
          {(category || []).map(({ id_category, name }, index) => (
            <Button
              key={index}
              variant={activeSelectedCategory === name ? "primary" : "alternative"}
              additionalIcon
              iconUrl="/search-gray.svg"
              iconPosition="left"
              onClick={() => {
                handleChangeCategory(id_category, name);
              }}
            >
              {name}
            </Button>
          ))}
        </div>
        <div className="row row-cols-6 mt-5">
          {(cardProduct || []).map(({ photo, id_product, name, price, category_name }, index) => (
            <div key={index} className="col mb-4">
              <Card key={index} id={id_product} image={photo[0]} title={name} category={category_name} price={price} />
            </div>
          ))}
        </div>
      </Container>
      {userData && userData.id_role === 2 ? (
        <Button
          variant="primary"
          onClick={() => setToastState((prev) => [...prev, { type: "warning", message: "Anda harus menjadi seller terlebih dahulu" }])}
          additionalIcon
          iconUrl="/plus.svg"
          iconPosition="left"
          className="position-fixed bottom-0 start-50 translate-middle-x mb-4"
        >
          Jual
        </Button>
      ) : (
        <Link href="/product/add">
          <a>
            <Button variant="primary" additionalIcon iconUrl="/plus.svg" iconPosition="left" className="position-fixed bottom-0 start-50 translate-middle-x mb-4">
              Jual
            </Button>
          </a>
        </Link>
      )}
      {toastState?.length > 0 && <ToastWrapper toastData={toastState} setToast={setToastState} />}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const access_token = req.cookies.access_token ? JSON.parse(JSON.stringify(req.cookies.access_token)) : null;
  let userData = null;
  if (access_token) {
    const verify = await verifyToken(access_token);
    if (verify.httpCode === 200) {
      userData = verify.data;
    }
  }

  let categoryData;
  const resCategory = await getCategory();
  categoryData = resCategory?.httpCode === 200 ? resCategory.data : [];

  let productData;
  const resProduct = await getAllProduct();
  productData = resProduct?.httpCode === 200 ? resProduct.data : [];

  let promoData;
  const resPromo = await getAllPromo();
  promoData = resPromo?.httpCode === 200 ? resPromo.data : [];

  return {
    props: {
      access_token,
      userData,
      categoryData,
      productData,
      promoData,
    },
  };
}
