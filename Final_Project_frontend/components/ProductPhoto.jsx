import style from "./styles/ProductPhoto.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";
export default function ProductPhoto({ photo }) {
  return (
    <div className={style["wrapper"]}>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        observer={true}
        observeParents={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".btn-prev",
          nextEl: ".btn-next",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        style={{ height: "100%" }}
      >
        {Array.isArray(photo) &&
          photo.length > 0 &&
          photo.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={style["slider-image"]}>
                <Image src={item} alt="card-1" layout="fill" objectFit="cover" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <button className={`${style["btn-chevron"]} ${style["btn-chevron-prev"]} btn-prev`}>
        <Image src="/fi_chevron-left.svg" alt="btn-left" width={24} height={24} />
      </button>
      <button className={`${style["btn-chevron"]} ${style["btn-chevron-next"]} btn-next`}>
        <Image src="/fi_chevron-right.svg" alt="btn-left" width={24} height={24} />
      </button>
    </div>
  );
}
