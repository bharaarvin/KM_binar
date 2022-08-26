import style from "./styles/Cardseller.module.css";
import Image from "next/image";
import Button from "./Button";

export default function CardSeller({ photo, name, city, editBtn = false, header }) {
  return (
    <>
      {header && <h4>{header}</h4>}
      <div className="bg-white p-3 border border-1 d-flex justify-content-between" style={{ borderRadius: "14px" }}>
        <div className="d-flex gap-3">
          <div className={style["image-wrapper"]}>
            <Image src={photo ? photo : "/seller.jpg"} alt="user photo" layout="fill" objectFit="cover" />
          </div>
          <div className="d-flex flex-column gap-1 mt-1">
            <h5 className={style["username"]}>{name ? name : "user not defined"}</h5>
            <span className={style["city"]}>{city ? city : "city not defined"}</span>
          </div>
        </div>
        {editBtn && <Button variant="secondary">Edit</Button>}
      </div>
    </>
  );
}
