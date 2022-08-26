import style from "./styles/Slider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Link from "next/link";
import Image from "next/image";

export default function Slider({ sliderData }) {
  return (
    <>
      <Swiper
        spaceBetween={110}
        slidesPerView={2}
        centeredSlides={true}
        loop={true}
        observer={true}
        observeParents={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".discover-btn-prev",
          nextEl: ".discover-btn-next",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mt-2 py-5"
      >
        {(sliderData || []).map((item, index) => (
          <SwiperSlide key={index} className="dashboard">
            <div className={style["slider-card"]}>
              <Link href={item.url}>
                <a className={style["slider-card-link"]}>
                  <Image src={item.photo} alt={`slider photo ${index + 1}`} layout="fill" objectFit="cover" />
                </a>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
