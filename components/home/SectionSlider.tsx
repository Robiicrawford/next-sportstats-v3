import * as React from "react"
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Skeleton from "../Skeleton";

import Card from "./EventCard"

const SectionSlider = ({ events }) => {
  return (
   
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView='auto'
       slidesPerGroupAuto
        spaceBetween={30}
        loop

        // I substracted 17px because the default scrollbar's width is 17px, which I may change later (to 10px now)
       
      >
        {events?.map((event, idx) => (
          <SwiperSlide key={event.id+"."+idx} className="card card_swipe">
            <Card key={event.mid+'mastercard'+idx} e={event}  /> 
          </SwiperSlide>
        )) || (
          <>
            {new Array(Math.ceil(1000 / 200))
              .fill("")
              .map((_, index) => (
                <SwiperSlide key={index} className="!w-[175px]">
                  <Skeleton className="!w-[175px] !h-[280px] shadow-sm" >
                    here
                  </Skeleton>
                </SwiperSlide>
              ))}
          </>
        )}

        {events !== undefined && (
          <>
            <div className="absolute top-[2%] left-0 w-full h-[83%] z-10 pointer-events-none tw-black-backdrop-2" />
            {/* It's annoying when you wanna click the navigation but end up clicking the link because the navigation button is so small, so it's easy to miss. I made these 2 transparent box and put them above the slider but behind the navigation  */}
            <div className="absolute top-0 left-0 w-[4%] h-full z-10"></div>
            <div className="absolute top-0 right-0 w-[4%] h-full z-10"></div>
          </>
        )}
      </Swiper>
  );
};

export default SectionSlider;