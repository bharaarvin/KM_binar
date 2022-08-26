import Image from "next/image";
import Button from "./Button";

export default function Cardbuyer({ width, height, data }) {
  console.log(data.negotiation);
  const parseDate = (datetime) => {
    const d = new Date(datetime);
    const month = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Des",
    };
    return `${d.getDate()} ${month[d.getMonth()]}, ${d.toLocaleTimeString().split(" ").shift()}`;
  };
  return (
    <div className="" style={{ width: width ? width : "450px", height: height ? height : "100%" }}>
      <div className="border p-3 w-100 mb-4" style={{ borderRadius: "16px" }}>
        <div className="d-flex gap-3 align-items-center">
          <div className="position-relative overflow-hidden" style={{ borderRadius: "10px", width: "50px", height: "50px" }}>
            <Image src={data.buyer_photo ? data.buyer_photo : "/seller.jpg"} alt="profil" layout="fill" objectFit="cover" />
          </div>
          <div>
            <h5 className="m-0 mb-1 fs-6">{data.buyer_name}</h5>
            <p className="m-0 text-secondary" style={{ fontSize: "12px" }}>
              {data.buyer_city ? data.buyer_city : "City not defined"}
            </p>
          </div>
        </div>
      </div>
      <h2 className="fs-6">Daftar Produkmu yang Ditawar</h2>
      {(data.negotiation || []).map((item, index) => (
        <div key={index} className="p-4 bg-white border position-relative mb-3" style={{ borderRadius: "14px" }}>
          <div className="position-absolute top-0 end-0 pt-4 pe-4 text-secondary" style={{ fontSize: "11px" }}>
            {parseDate(item.nego_time)}
          </div>
          <div className="d-flex gap-4 mb-4">
            <div className="position-relative overflow-hidden" style={{ borderRadius: "10px", width: "40px", height: "40px" }}>
              <Image src={item.product_photo ? item.product_photo : "/no-photo.png"} alt="profil" layout="fill" objectFit="cover" />
            </div>
            <div className="d-flex flex-column">
              <span className="text-secondary mb-2" style={{ fontWeight: "500", fontSize: "12px" }}>
                Penawaran Produk
              </span>
              <span>{item.product_name}</span>
              <span style={{ fontSize: "14px" }}>
                IDR
                {
                  Number(item.price)
                    .toLocaleString("id", { style: "currency", currency: "IDR" })
                    .match(/(?<=Rp)(.*)/g)[0]
                }
              </span>
              <span style={{ fontSize: "14px" }}>
                Ditawar IDR
                {
                  Number(item.nego_price)
                    .toLocaleString("id", { style: "currency", currency: "IDR" })
                    .match(/(?<=Rp)(.*)/g)[0]
                }
              </span>
            </div>
          </div>
          <div className="d-flex gap-3 justify-content-end">
            <Button styles={{ paddingTop: "4px", paddingBottom: "4px", height: "fit-content", width: "120px", borderRadius: "20px" }} variant="secondary">
              Tolak
            </Button>
            <Button styles={{ paddingTop: "4px", paddingBottom: "4px", height: "fit-content", width: "120px", borderRadius: "20px" }}>Terima</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
