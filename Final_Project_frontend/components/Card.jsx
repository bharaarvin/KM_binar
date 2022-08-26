import Image from "next/image";
import Link from "next/link";
import style from "./styles/Card.module.css";

export default function Card({ id, image, title, category, price, className }) {
  return (
    <Link href={`/product/${id}`}>
      <a className={`${style["card"]} ${className}`}>
        <div className={style["image-wrapper"]}>
          <Image src={image ? image : "/no-photo.png"} alt="" layout="fill" objectFit="cover" />
        </div>
        <div>
          <h5 className={style["title"]}>{title}</h5>
          <p className={style["category"]}>{category}</p>
          <h5 className={style["price"]}>IDR {Number(price).toLocaleString()}</h5>
        </div>
      </a>
    </Link>
  );
}
