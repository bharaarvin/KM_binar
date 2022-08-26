import Toast from "./Toast";
import style from "./styles/ToastWrapper.module.css";

export default function ToastWrapper({ toastData, setToast }) {
  return (
    <div className={style["wrapper"]}>
      {(toastData || []).map((item, index) => (
        <Toast key={index} toastData={item} setToast={setToast} index={index} />
      ))}
    </div>
  );
}
