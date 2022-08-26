import style from "./styles/UserMenu.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { logout } from "../services/auth";
import Link from "next/link";
import { parse } from "cookie";

export default function UserMenu({ menuList, children, menuType = "user", itemTemplate, userLogged }) {
  const router = useRouter();
  const [dropdownState, setDropdownState] = useState(false);

  useEffect(() => {
    window.addEventListener("click", function () {
      setDropdownState(false);
    });
  }, [dropdownState]);

  const handleOpen = (event) => {
    event.stopPropagation();
    setDropdownState((prev) => (prev ? false : true));
  };

  const parseName = (name) => {
    let result = name.split(" ");
    if (result.length > 1) {
      return `${result[0]} ${result[1]}`;
    } else {
      return result[0];
    }
  };

  const handleLogout = async () => {
    await logout();
    if (router.pathname === "/") {
      router.reload();
    } else {
      router.push("/");
    }
  };

  return (
    <div className={style["dropdown"]}>
      <button className={style["dropdown-body"]} onClick={handleOpen}>
        {children}
      </button>
      {dropdownState && (
        <div className={style["menu-body"]} onClick={(e) => e.stopPropagation()}>
          <div className={style["account"]}>
            Hai! <span style={{ fontWeight: "500" }}>{parseName(userLogged.name)}</span>
          </div>
          <span className="border-bottom"></span>
          {(menuList || []).map((data, index) =>
            itemTemplate ? (
              itemTemplate(data)
            ) : (
              <Link key={index} href={data.url}>
                <a className={style["menu-list"]}>{data.name}</a>
              </Link>
            )
          )}
          {menuType === "user" && (
            <>
              <span className="border-bottom"></span>
              <button className="btn btn-dark" style={{ fontSize: "14px" }} onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
