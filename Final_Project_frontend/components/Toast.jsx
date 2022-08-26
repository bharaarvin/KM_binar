import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import style from "./styles/Toast.module.css";

export default function Alert({ toastData, setToast, index }) {
  const { t } = useTranslation("lang");

  function parseData(e) {
    let type = e.toLowerCase();

    switch (type) {
      case "info":
        return {
          title: "Info",
          ico: "/info-toast.svg",
          color1: "#8CDFEC",
          color2: "#49c0d3",
        };
      case "danger":
        return {
          title: "Alert",
          ico: "/danger-toast.svg",
          color1: "#FFBCB8",
          color2: "#FD6C63",
        };
      case "warning":
        return {
          title: "Warning",
          ico: "/warning-toast.svg",
          color1: "#FFDFAA",
          color2: "#F8BC5A",
        };
      default:
        return {
          title: "Success",
          ico: "/success-toast.svg",
          color1: "#26D7AE",
          color2: "#00B68C",
        };
    }
  }
  const info = parseData(toastData.type);
  return (
    <div className={`${style["toast-in"]} ${style["toast-wrapper"]}`}>
      <div
        className={style["toast-icon-wrapper"]}
        style={{
          background: `linear-gradient(180deg, ${info.color1} 0%, ${info.color2} 100%)`,
        }}
      ></div>
      <Image src={info.ico} alt="alert_icon" width={24} height={24} />
      <div>
        <div className={style["title"]}>{info.title}</div>
        <div className={style["message"]}>{toastData.message}</div>
      </div>
      <button
        className={style["btn-toast-close"]}
        onClick={() => {
          setToast((prev) => prev.filter((item, idx) => idx !== index));
        }}
      >
        <Image src="/x.svg" alt="exit_ico" width={28} height={28} />
      </button>
    </div>
  );
}
