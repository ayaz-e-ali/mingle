'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function Carousel({ images }) {
    return (
        <Swiper
            slidesPerView={1}
            modules={[Navigation, Pagination]}
            navigation={true}
            pagination={{ clickable: true }}
        >
            {images.map(image => (
                <SwiperSlide key={image}>
                    <Image unoptimized src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`} width={280} height={100} style={{ aspectRatio: '1 / 1.3' }} className='object-cover rounded-sm mx-auto' alt='post' />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}