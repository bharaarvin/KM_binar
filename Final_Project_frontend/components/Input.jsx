import style from "./styles/Input.module.css";
import { useState } from "react";

export default function Input({ type = "text", placeholder = "", label, name, id, className = "", onChange, defaultValue = "", selectMenu, isError, errorMsg, width, height, disabled }) {
  const [seePasswordState, setSeePasswordState] = useState(false);
  const [valueNumber, setValueNumber] = useState();

  switch (type) {
    case "text":
    case "name":
    case "email":
    case "date":
    case "datetime":
    case "datetime-local":
      return (
        <div className={style["input-wrapper"]}>
          {label && (
            <label className={style["label"]} htmlFor={id}>
              {label}
            </label>
          )}
          <input
            id={id}
            name={name}
            className={`${style["input"]} ${className} ${isError ? "border-danger" : ""}`}
            defaultValue={defaultValue}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
          />
          {isError && <div className={style["error-validation"]}>{errorMsg}</div>}
        </div>
      );

    case "textarea":
      return (
        <div className={style["input-wrapper"]}>
          {label && (
            <label className={style["label"]} htmlFor={id}>
              {label}
            </label>
          )}
          <textarea
            id={id}
            name={name}
            className={`${style["input"]} ${className} ${isError ? "border-danger" : ""}`}
            placeholder={placeholder}
            onChange={onChange}
            defaultValue={defaultValue}
            disabled={disabled}
            cols="30"
            rows="4"
            style={{ resize: "none" }}
          ></textarea>
          {isError && <div className={style["error-validation"]}>{errorMsg}</div>}
        </div>
      );

    case "number":
      return (
        <div className={style["input-wrapper"]}>
          {label && (
            <label className={style["label"]} htmlFor={id}>
              {label}
            </label>
          )}
          <input
            id={id}
            name={name}
            className={`${style["input"]} ${className} ${isError ? "border-danger" : ""}`}
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            defaultValue={defaultValue}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          {isError && <div className={style["error-validation"]}>{errorMsg}</div>}
        </div>
      );

    case "password":
      return (
        <div className={style["input-wrapper"]}>
          {label && (
            <label className={style["label"]} htmlFor={id}>
              {label}
            </label>
          )}
          <div className="d-flex position-relative">
            <input
              id={id}
              name={name}
              className={`${style["input"]} ${className} ${isError ? "border-danger" : ""}`}
              type={seePasswordState ? "text" : "password"}
              placeholder={placeholder}
              onChange={onChange}
              disabled={disabled}
              defaultValue={defaultValue}
            />
            <button className="border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y me-3" onClick={() => setSeePasswordState((prev) => (prev ? false : true))} type="button">
              {seePasswordState ? (
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.833344 9.99999C0.833344 9.99999 4.16668 3.33333 10 3.33333C15.8333 3.33333 19.1667 9.99999 19.1667 9.99999C19.1667 9.99999 15.8333 16.6667 10 16.6667C4.16668 16.6667 0.833344 9.99999 0.833344 9.99999Z"
                    stroke="#6F6F6F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                    stroke="#6F6F6F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.9 4.23999C10.5883 4.07887 11.2931 3.99833 12 3.99999C19 3.99999 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19M14.12 14.12C13.8454 14.4147 13.5141 14.6511 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1961C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4858 9.58525 10.1546 9.88 9.87999M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68189 3.96914 7.6566 6.06 6.05999L17.94 17.94Z"
                    stroke="#6F6F6F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M1 1L23 23" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
          {isError && <div className={style["error-validation"]}>{errorMsg}</div>}
        </div>
      );

    case "checkbox":
      return (
        <div className="d-flex gap-2 align-items-center">
          <input id={id} name={name} className="mt-1" type={type} onChange={onChange} disabled={disabled} checked={defaultValue} />
          {label && (
            <label className={style["label"]} htmlFor={id}>
              {label}
            </label>
          )}
        </div>
      );

    case "file":
      return (
        <>
          <label htmlFor={id} className={style["input-file"]}>
            {label}
          </label>
          <input
            id={id}
            name={name}
            className={`${style["input"]} ${className} ${isError ? "border-danger" : ""}`}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            hidden
          />
          {isError && <div className={style["error-validation"]}>{errorMsg}</div>}
        </>
      );

    case "photo":
      return (
        <>
          {label && <label className={style["label"]}>{label}</label>}
          <label style={{ width: width, height: height }} htmlFor={id} className={style["input-photo"]}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4.16675V15.8334" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.16699 10H15.8337" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </label>
          <span className="text-secondary" style={{ fontSize: "11px" }}>
            max size 2MB
          </span>
          <input id={id} name={name} className={`${style["input"]} ${className}`} type="file" disabled={disabled} placeholder={placeholder} onChange={onChange} hidden accept="image/*" />
          {isError && <div className={style["error-validation"]}>{errorMsg}</div>}
        </>
      );

    case "select":
      return (
        <div className={style["input-wrapper"]}>
          {label && (
            <label className={style["label"]} htmlFor={id}>
              {label}
            </label>
          )}
          <select className={`${style["input"]} ${style["select"]} ${className}`} value={defaultValue} name={name} id={id} disabled={disabled} onChange={onChange}>
            {(selectMenu || []).map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      );

    default:
      break;
  }
}
