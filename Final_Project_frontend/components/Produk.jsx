import style from "./styles/Produk.module.css";
import Button from "../components/Button";
import Image from "next/image";

export default function Produk({}) {
  return (
    <>
      <div className={style["card"]}>
        <div className="Container">
          <h5 className="">Daftar Produkmu yang Ditawar</h5>
          <div className="row mt-5">
            <div className="col-2">
              <Image src="/watch.svg" alt="Produk" width={50} height={50} />
            </div>
            <div className="col-10">
              <div className="d-flex justify-content-between">
                <span className={style["s"]}>Penawaran produk</span>
                <span className={style["s"]}>20 Apr, 14:04</span>
              </div>
              <h5 className={style["title"]}>Jam Tangan Casio</h5>
              <h5 className={style["title"]}>Rp 250.000</h5>
              <h5 className={style["title"]}>Ditawar Rp 200.000</h5>
            </div>
          </div>

          <div className="row  offset-4 mt-3">
            <div className="col ">
              <Button color="#151515" variant="secondary" className={style["btn"]}>
                Tolak
              </Button>
            </div>
            <div className="col">
              <Button className={style["btn"]}>Terima</Button>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}
