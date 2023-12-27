import styles from "./styles.module.scss";

import { useRef, useState } from "react";
import {
  Autoplay,
  Pagination,
  Navigation,
  Scrollbar,
  A11y,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function MainSwiper() {
  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Autoplay, Pagination, Navigation, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="mainSwiper"
      >
        {[...Array(15).keys()].map((i) => (
          <SwiperSlide>
            <img src={`../../../images/swiper/${i + 1}.jpg`} alt="" />
          </SwiperSlide>
        ))}
        ...
      </Swiper>
    </>
  );
}
