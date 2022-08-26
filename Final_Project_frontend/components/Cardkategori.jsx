import style from "./styles/Cardkategori.module.css";
import { useState } from "react";

export default function CardKategori({ menu, setCardProduct }) {
  const [activeCategory, setActiveCategory] = useState("Semua Produk");

  const getColor = (item) => (item === activeCategory ? "#7126B5" : "#aaaaaa");

  const chevronSVG = (color) => {
    return (
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
        <path d="M1 13L7 7L1 1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  const handleClick = (value) => {
    if (value != activeCategory) {
      setActiveCategory(value);
    }
  };

  return (
    <>
      <div className="bg-white p-4 border border-1 d-flex flex-column gap-2 flex-shrink-0" style={{ borderRadius: "14px", width: "250px", height: "fit-content" }}>
        <h5 className="mb-3">Kategori</h5>
        {(menu || []).map((item, index) => (
          <div key={index}>
            <button className="w-100 d-flex justify-content-between border-0 bg-transparent" onClick={() => handleClick(item.title)}>
              <div className="d-flex gap-2">
                <span>{item.logo(getColor(item.title))}</span>
                <span className={activeCategory === item.title ? `${style["title"]} ${style["active"]}` : style["title"]}>{item.title}</span>
              </div>
              <span>{chevronSVG(getColor(item.title))}</span>
            </button>
            {index < menu.length - 1 && <hr className="mb-2 mt-3" />}
          </div>
        ))}
      </div>
    </>
  );
}
