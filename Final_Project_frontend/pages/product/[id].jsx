/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import Header from "../../components/Header";
import CardDeskripsi from "../../components/Carddeskripsi";
import NavbarCustom from "../../components/Navbar";
import CardSeller from "../../components/Cardseller";
import ProductPhoto from "../../components/ProductPhoto";
import Button from "../../components/Button";
import ToastWrapper from "../../components/ToastWrapper";
import Loading from "../../components/Loading";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import { verifyToken } from "../../services/auth";
import { getProductById } from "../../services/product";
import Link from "next/link";
import ModalNego from "../../components/ModalNego";
import { checkeHasNego } from "../../services/negotiation";

export default function ProductDetail({ userData, access_token }) {
  const router = useRouter();
  const { id } = router.query;
  const [userLogged, setUserLogged] = useState(null);
  const [productData, setProductData] = useState({});
  const [productLiked, setProductLiked] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [token, setToken] = useState(null);
  const [toastState, setToastState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasNego, setHasNego] = useState(false);

  const handleLike = () => {
    setProductLiked((prev) => (prev ? false : true));
  };

  const handleNego = () => {
    if (userLogged) {
      setModalView(true);
    } else {
      setToastState((prev) => [...prev, { type: "warning", message: "Harap Login terlebih dahulu" }]);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      const resProduct = await getProductById(id);
      setProductData(resProduct.data);
      if (userData) {
        const resNego = await checkeHasNego(id, access_token);
        setHasNego(resNego.data);
      }
    };

    getProduct();
    setToken(access_token);
    setUserLogged(userData);
  }, []);
  return (
    <>
      <Header pageTitle={productData.name} />
      <NavbarCustom userData={userLogged} />
      <Container>
        <div className="row mt-5">
          <div className="col-8">
            <ProductPhoto photo={productData.photo} />
            <CardDeskripsi description={productData.description} />
          </div>
          <div className="col-4 d-flex flex-column gap-4">
            <div className="position-relative border p-4 d-flex flex-column gap-2" style={{ borderRadius: "16px" }}>
              <button className="position-absolute end-0 p-2 rounded-3 border bg-white me-4" onClick={handleLike}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill={productLiked ? "#D61C4E" : "none"}>
                  <path
                    d="M20.84 4.60999C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.60999L12 5.66999L10.94 4.60999C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.60999C2.1283 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.49999C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.60999V4.60999Z"
                    stroke="#D61C4E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <h1 className="fs-5 m-0">{productData.name ? productData.name : ""}</h1>
              <span className="text-secondary">{productData.category_name}</span>
              <span className="fs-4" style={{ fontWeight: "500" }}>
                IDR
                {
                  Number(productData.price)
                    .toLocaleString("id", { style: "currency", currency: "IDR" })
                    .match(/(?<=Rp)(.*)/g)[0]
                }
              </span>
              <span style={{ fontSize: "14px" }}>
                {productData.quantity <= 5 ? (productData.quantity == 1 ? `stok produk terakhir!` : `tersisa ${productData.quantity} lagi!`) : `${productData.quantity} Produk tersisa`}
              </span>
              <span className="text-secondary mt-4" style={{ fontSize: "12px" }}>
                {productData.total_wishlist > 0 ? `${productData.total_wishlist} orang` : "Jadilah orang pertama"} yang menyukai produk ini
              </span>
              {userLogged?.id_user === productData.id_user ? (
                <Link href={"/product/edit/" + id}>
                  <a className="text-decoration-none">
                    <Button className="w-100 mt-2" variant="secondary">
                      Edit
                    </Button>
                  </a>
                </Link>
              ) : hasNego ? (
                <Button variant="primary" disabled>
                  Menunggu Respon Penjual
                </Button>
              ) : (
                <Button className="w-100 mt-4" onClick={handleNego}>
                  Saya Tertarik dan ingin nego
                </Button>
              )}
            </div>
            <CardSeller photo={productData.seller_photo} name={productData.seller_name} city={productData.seller_city} />
          </div>
        </div>
      </Container>
      {toastState?.length > 0 && <ToastWrapper toastData={toastState} setToast={setToastState} />}
      <Loading show={loading} />
      <ModalNego show={modalView} setShow={setModalView} productData={productData} access_token={token} setToastState={setToastState} setLoading={setLoading} setHasNego={setHasNego} />
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

  return {
    props: {
      userData,
      access_token,
    },
  };
}
