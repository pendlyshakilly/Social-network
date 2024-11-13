import React, {MutableRefObject, useEffect, useState} from 'react';
import {useSwiper} from "swiper/react";
import s from './SliderForFriends.module.css'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

type SwiperNavigationButtonPropsType = {
    direction: 'next' | 'prev';
    isDisabled: boolean
}

const SwiperNavigationButton = ({direction, isDisabled}: SwiperNavigationButtonPropsType) => {
    const swiper = useSwiper()

    const handleClick = () => {
        if (direction === 'prev') {
            swiper.slidePrev();
        } else swiper.slideNext();
    };
    return <>
        <button className={`${s.Button} ${direction === 'prev' ? s.prev : s.next}`} onClick={handleClick}
                disabled={isDisabled}>
            {direction === 'prev' ? <NavigateBeforeIcon fontSize={'large'}/> :
                <NavigateNextIcon fontSize={'large'}/>}
        </button>
    </>
};

export default SwiperNavigationButton;
