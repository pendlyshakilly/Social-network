import React, { useRef, useState } from 'react';
// Import Swiper React components
import {Swiper, SwiperProps, SwiperSlide, useSwiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import s from './SliderForFriends.module.css'
import { Navigation, Pagination, Mousewheel, Keyboard} from 'swiper/modules';
import User from "../../../Users/User/User";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../State/Store";
import {UserType} from "../../../../State/Users-reducer";
import SwiperNavigationButton from "./SwiperNavigationButton";
import {Paper} from "@mui/material";


const SliderForFriends = () => {
    const friends = useSelector<AppRootStateType, UserType[]>(state => state.userPage.friends)
    const [activeIndex, setActiveIndex] = useState<number>(0)

   const Handler = (e: any) => {
      setActiveIndex(e.activeIndex)
   }


    return (
        <div className={s.SwiperContainer}>
            <Swiper
                onSlideChange={(e: any) => Handler(e)}
                cssMode={true}
                slidesPerView={3}
                simulateTouch={true}
                spaceBetween={20}
                loopAdditionalSlides={friends.length}
                mousewheel={{releaseOnEdges: false}}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className={s.mySwiper}

            >
            <SwiperNavigationButton direction={'prev'} isDisabled={activeIndex === 0}/>

                {friends.map((el: UserType) => <SwiperSlide className={s.Slide} key={el.id}>
                        <Paper elevation={3} className={s.FriendsContainer}>
                        <User key={el.id} id={el.id} status={el.status}
                              photos={el.photos}
                              name={el.name}
                              followed={el.followed}/>
                        </Paper>
                </SwiperSlide>
                    )}
                <SwiperNavigationButton direction={'next'}  isDisabled={(activeIndex + 3) === friends.length}/>
            </Swiper>
        </div>
    );
}

export default SliderForFriends