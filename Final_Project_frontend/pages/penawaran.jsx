/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../components/Header";
import CardBuyer from "../components/Cardbuyer";
import Produk from "../components/Produk";

import Container from "react-bootstrap/Container";

import Button from "../components/Button";
import NavbarCustom from "../components/Navbar";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { verifyToken } from "../services/auth";
import { getSellerOffers } from "../services/negotiation";

export default function Penawaran({ userData, access_token, offerData }) {
  const router = useRouter();
  const [userLogged, setUserLogged] = useState(null);
  const [penawaran, setPenawaran] = useState([]);

  useEffect(() => {
    setPenawaran(offerData);
    setUserLogged(userData);
  }, []);
  return (
    <>
      <Header pageTitle="Info Penawar" />
      <NavbarCustom userData={userLogged} />

      <Container className="position-relative mt-4 d-flex justify-content-center">
        <div className="position-absolute top-0 start-0 ms-5">
          <Button onClick={() => router.back()} variant="secondary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 19L5 12L12 5" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>
        {penawaran.length === 0 && <div>Anda belum memiliki tawaran</div>}
        {penawaran.map((item, index) => (
          <div key={index}>
            <CardBuyer data={item} />
          </div>
        ))}
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

  let offerData;
  const resOffer = await getSellerOffers(access_token);
  offerData = resOffer?.httpCode === 200 ? resOffer.data : [];

  return {
    props: {
      userData,
      access_token,
      offerData,
    },
  };
}
