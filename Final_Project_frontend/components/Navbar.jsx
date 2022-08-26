/* eslint-disable react-hooks/exhaustive-deps */
import style from "./styles/Navbar.module.css";
import Button from "/components/Button";
import { Navbar, Container, Form } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import UserMenu from "./UserMenu";

export default function NavbarCustom({ userData }) {
  const [menuUser, setMenuUser] = useState([]);
  const [menuNotification, setMenuNotification] = useState([]);
  const [userLogged, setUserLogged] = useState(null);

  const menuUserBuyer = [
    { name: "My Whislist", url: "/whistlist", sequence: 1 },
    { name: "Account Settings", url: "/account-settings", sequence: 3 },
    { name: "Prefences", url: "/prefences", sequence: 2 },
  ];

  const menuUserSeller = [
    { name: "Toko Saya", url: "/toko", sequence: 1 },
    { name: "Account Settings", url: "/account-settings", sequence: 3 },
    { name: "Prefences", url: "/prefences", sequence: 2 },
  ];

  const getDataNotification = [
    {
      id_notification: "id increment",
      id_user: "fk id_user",
      id_product: "fk id_product",
      id_nego: "number",
      notification_type: "string",
      created_by: "username",
      created_at: "datetime",
      updated_by: "username",
      update_at: "datetime",
      is_read: "boolean",
      // product_photo: "Rectangle 24.png",
      // product_name: "Jam Tangan Casio",
      // product_price: 250000,
      // optional_message: "Ditawar Rp. 200.000",
    },
  ];

  useEffect(() => {
    setUserLogged(userData);
    if (userData && userData.id_role === 2) {
      setMenuUser(menuUserBuyer.sort((a, b) => a.sequence - b.sequence));
    } else {
      setMenuUser(menuUserSeller.sort((a, b) => a.sequence - b.sequence));
    }
  }, [userData]);

  return (
    <div style={{ height: "74px" }}>
      <Navbar bg="light" fixed="top" className={style["box"]}>
        <Container>
          <div className="d-flex align-items-center">
            <Navbar.Brand href="/">
              <Image src="/logo.png" alt="brand" width={40} height={40} />
            </Navbar.Brand>
            <div className="position-relative d-flex">
              <Form.Control type="search" placeholder="Cari di sini..." className={style["form_search"]} aria-label="Search" />
              <div className="position-absolute end-0 top-50 translate-middle-y me-3 mt-1">
                <Image src="/search-gray.svg" alt="icon" height={24} width={24} />
              </div>
            </div>
          </div>
          {userData ? (
            <div className="d-flex gap-3">
              <UserMenu userLogged={userLogged}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 18H21" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 18H3.01" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 12H21" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 12H3.01" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 6H21" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 6H3.01" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </UserMenu>
              <UserMenu userLogged={userLogged}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                    stroke="#151515"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                    stroke="#151515"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </UserMenu>
              <UserMenu menuList={menuUser} userLogged={userLogged}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                    stroke="#151515"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                    stroke="#151515"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </UserMenu>
            </div>
          ) : (
            <Link href="/login">
              <a className="text-decoration-none">
                <Button variant="primary" additionalIcon iconUrl="/log-in.svg" iconPosition="left">
                  Masuk
                </Button>
              </a>
            </Link>
          )}
        </Container>
      </Navbar>
    </div>
  );
}
