import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import Spinner from './Spinner';
import { Swiper ,SwiperSlide } from 'swiper/react';
import SwiperCore , {
    EffectFade,
    Autoplay,
    Navigation,
    Pagination
} from "swiper"
import "swiper/css/bundle"
import { useNavigate } from 'react-router';


export default function SliderHotel() {
    const [destination , setDestination] = useState(null);
    const [loading, setLoading] = useState(true);
    SwiperCore.use([Autoplay ,Navigation , Pagination]);
    const navigate = useNavigate();
    useEffect(()=>{
        async function fetchDestination() {
            const destinationRef = collection (db, 'listing-hotels')
            const q = query(destinationRef , orderBy("timestamp", 'desc'),limit(5))
            const docSnap = await getDocs(q)
            let destination =[];
            docSnap.forEach((doc)=> {
                return destination.push({
                    id:doc.id,
                    data: doc.data(),
                });
            });
            setDestination(destination);
            setLoading(false);
        }
        fetchDestination();
        
    },[])
  
    if(loading) {
      return <Spinner />
    }
    if(destination.length === 0) {
      return <></>;
    }
  return  (destination && (<>
  <Swiper slidesPerView={1}
  navigation
  pagination={{ type: "progressbar"}}
  effect="fade"
  modules={[EffectFade]}
  autoplay={{ delay:3000 }}
  >
  {destination.map(({data,id}) => (
    <SwiperSlide key={id} onClick={()=> navigate(`/categoryhotel/${data.type}/${id}`)}>
    <div style={{background: `url(${data.imgUrls[0]}) center, no-repeat`,
           backgroundSize: "cover",
           }}
           className='w-full h-[300px] overflow-hidden'
            >
    </div>
    <p className='text-[#f1faee] absolute left-0 top-3 font-medium max-w-[90%] bg-[#457b9d] 
    shadow-lg opacity-90 p-2 rounded-br-3xl
    '>{data.name}</p>
    <p className='text-[#f1faee] absolute left-0 bottom-1 font-semibold max-w-[90%] bg-[#e63946] 
    shadow-lg opacity-90 p-2 rounded-tr-3xl
    '>
        ${data.discountedPrice ?? data.regularPrice} / 
          {data.type}
    </p>
    </SwiperSlide>
  ))}
  </Swiper>
  </>
  )
);
}
