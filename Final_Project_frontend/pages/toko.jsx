/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../components/Header";
import CardSeller from "../components/Cardseller";
import CardKategori from "../components/Cardkategori";
import NavbarCustom from "../components/Navbar";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import style from "../styles/modules/toko.module.css";
import Card from "../components/Card";

import { getProductByIdUser } from "../services/product";
import { verifyToken } from "../services/auth";
import Link from "next/link";

export default function DaftarProduct({ userData, access_token }) {
  const [userLogged, setUserLogged] = useState(null);
  const [cardProduct, setCardProduct] = useState([]);

  const menuKategori = [
    {
      title: "Semua Produk",
      logo: (color) => {
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999Z"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M3.26953 6.95996L11.9995 12.01L20.7295 6.95996" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 22.08V12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      },
    },
    {
      title: "Diminati",
      logo: (color) => {
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999V4.60999Z"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      },
    },
    {
      title: "Terjual",
      logo: (color) => {
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1V23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      },
    },
  ];

  const getUserProduct = async () => {
    const res = await getProductByIdUser(access_token);
    setCardProduct(res.data.data);
  };

  useEffect(() => {
    setUserLogged(userData);
    getUserProduct();
  }, []);

  return (
    <>
      <Header pageTitle="Daftar Product" />
      <NavbarCustom userData={userLogged} />

      <Container>
        <div className=" mt-2 pt-5 justify-content-center  ">
          <CardSeller photo={userLogged?.photo} name={userLogged?.name} city={userLogged?.city} editBtn header="Daftar Jual Saya" />
          <div className="d-flex gap-4 mt-4">
            <CardKategori menu={menuKategori} setCardProduct={setCardProduct} />
            <div className={style["product-container"]}>
              <Link href="/product/add">
                <a className={style["add-new-product"]}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4.16675V15.8334" stroke="#aaaaaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.16699 10H15.8337" stroke="#aaaaaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Tambah Produk</span>
                </a>
              </Link>
              {(cardProduct || []).map(({ id_product, photo, name, category_name, price }, index) => (
                <Card className={style["product"]} key={index} id={id_product} image={photo[0]} title={name} category={category_name} price={price} />
              ))}
            </div>
          </div>
        </div>
      </Container>
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
