import style from "./styles/Button.module.css";
import Image from "next/image";

export default function Button({
  variant = "primary",
  children = "Button",
  type,
  onClick,
  additionalIcon,
  iconUrl,
  iconPosition = "right",
  customBg,
  customBorder,
  className,
  disabled,
  loading,
  dropdownMenu,
  styles,
}) {
  switch (variant) {
    case "primary":
      return (
        <button
          className={`${style["btn"]} ${style["primary"]} ${className}`}
          onClick={onClick}
          style={{
            backgroundColor: disabled ? "#9c5dd6" : customBg || "#7126B5",
            borderColor: disabled ? "#9c5dd6" : customBorder || "#7126B5",
            ...styles,
          }}
          type={type}
          disabled={disabled}
        >
          {loading ? (
            <div className={style["scaling-dots"]}>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              {additionalIcon && iconPosition == "left" && <Image src={iconUrl} alt="button icon" width={16} height={16} />}
              <span>{children}</span>
              {additionalIcon && iconPosition == "right" && <Image src={iconUrl} alt="button icon" width={16} height={16} />}
            </div>
          )}
        </button>
      );

    case "secondary":
      return (
        <button
          className={`${style["btn"]} ${style["secondary"]} ${className}`}
          onClick={onClick}
          style={{
            backgroundColor: customBg || "white",
            borderColor: customBorder || "#4D4C7D",
            ...styles,
          }}
          type={type}
          disabled={disabled}
        >
          {loading ? (
            <div className={style["scaling-dots"]}>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              {additionalIcon && iconPosition == "left" && <Image src={iconUrl} alt="button icon" width={16} height={16} />}
              <span>{children}</span>
              {additionalIcon && iconPosition == "right" && <Image src={iconUrl} alt="button icon" width={16} height={16} />}
            </div>
          )}
        </button>
      );

    case "alternative":
      return (
        <button
          className={`${style["btn"]} ${style["alternative"]} ${className}`}
          onClick={onClick}
          style={{
            backgroundColor: disabled ? "#9c5dd6" : customBg || "#e2c3ff",
            borderColor: disabled ? "#9c5dd6" : customBorder || "#e2c3ff",
            ...styles,
          }}
          type={type}
          disabled={disabled}
        >
          {loading ? (
            <div className={style["scaling-dots"]}>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              {additionalIcon && iconPosition == "left" && <Image src={iconUrl} alt="button icon" width={16} height={16} />}
              <span>{children}</span>
              {additionalIcon && iconPosition == "right" && <Image src={iconUrl} alt="button icon" width={16} height={16} />}
            </div>
          )}
        </button>
      );

    case "disabled":
      return (
        <button
          className={`${style["btn"]} ${style["primary"]} ${className}`}
          onClick={onClick}
          style={{
            backgroundColor: disabled ? "#9c5dd6" : customBg || "#7126B5",
            borderColor: disabled ? "#9c5dd6" : customBorder || "#7126B5",
            ...styles,
          }}
          type={type}
          disabled
        >
          {loading ? (
            <div className={style["scaling-dots"]}>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
              <i className={style["dot"]}></i>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              {additionalIcon && iconPosition == "left" && <Image src={iconUrl} alt="button icon" width={16} height={16} />}
              <span>{children}</span>
              {additionalIcon && iconPosition == "right" && <Image src={iconUrl} alt="button icon" width={16} height={16} />}
            </div>
          )}
        </button>
      );

    case "dropdown":
      return <button className={`${style["dropdown"]} ${className}`}>{children}</button>;

    default:
      break;
  }
}
