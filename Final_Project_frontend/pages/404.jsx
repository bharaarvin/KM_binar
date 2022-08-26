import Header from "../components/Header";
import style from "../components/styles/404.module.css";
import Button from "../components/Button";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <Header pageTitle="Error" />

      <div className={style["container"]}>
        <h1 className={style["h1"]}>404</h1>
        <h2>Oops! Page not found. </h2>
        <p>The resource requested could not be found on this server!</p>
        <Button
          className="mx-auto"
          onClick={() => {
            router.back();
          }}
        >
          Go Back
        </Button>
      </div>
    </>
  );
}
