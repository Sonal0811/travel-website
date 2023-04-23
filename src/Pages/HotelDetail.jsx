import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Spinner from '../components/Spinner';
import {db }  from  "../firebase";
import {Swiper , SwiperSlide} from "swiper/react";
import Contact from "../components/Contact"
import SwiperCore , {
    EffectFade,
    Autoplay,
    Navigation,
    Pagination,
    
} from "swiper";
import "swiper/css/bundle";
import { FaMapMarkerAlt, FaShare} from "react-icons/fa"
import {BsSunFill} from "react-icons/bs"
import {MdNightlightRound} from "react-icons/md"
import {getAuth} from "firebase/auth"
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';


export default function HostelDetail() {
    const auth = getAuth();
    const params =useParams();
    const [destination ,setDesination] = useState();
    const [loading , setLoading] = useState(true);
    const [sharedLink , setSharedLink] = useState(false);
    const [contactBroker , setContactBroker] = useState(false);
    SwiperCore.use([Autoplay,Navigation,Pagination]);
    useEffect(()=>{
        async function fetchingListingDestination(){
            const docRef = doc(db,"listing-hotels" , params.listingID)
            const docSnap = await getDoc(docRef)
            
            if(docSnap.exists()){
                setDesination(docSnap.data())
                setLoading(false);
                
            }
        }
        fetchingListingDestination();
       
    },[params.listingID]);
    
    if(loading){
        return <Spinner />;
    } 

    console.log(destination.userRef);
  return (
  <main>
   
 <Swiper slidesPerView={1} navigation pagination={{type:"progressbar"}} 
    effect="fade" modules={[EffectFade]} autoplay={{delay:3000}}>
        
        {destination.imgUrls.map((url,index)=>(
            <SwiperSlide key={index}>
                <div className='relative w-full overflow-hidden h-[300px]'
                 style={{
                    background:`url(${destination.imgUrls[index]}) center no-repeat`,
                    backgroundSize: "cover",
                    }}>

                </div>

            </SwiperSlide>
        ))}
    </Swiper> 
    <div className="fixed top-[13%] right-[3%] z-10 bg-white 
    cursor-pointer border-gray-400 rounded-full w-12 h-12 flex
     justify-center items-center" onClick={()=>{
        navigator.clipboard.writeText(window.location.href)
        setSharedLink(true)
        setTimeout(()=>{
            setSharedLink(false);
        },2000);
     }}
     >
        <FaShare className='text-lg text-slate-500'/>
        {sharedLink &&(
            <p className='fixed top-[23%] right-[5%]
            font-semibold border-2 border-grey-400 rounded-md
             bg-white z-10 p-2' >
                Linked Copied
                </p>
        )}
        
    </div>
    <div className='m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto
     p-4 rounded-lg border-3 shadow-lg bd-white lg:space-x-5'>
            <div className=" w-full">
                <p className='text-2xl font-bold mb-3
                text-blue-900'>
                    {destination.name} - $ {destination.offer ? 
                    destination.discountedPrice.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
                    destination.regularPrice.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
                    {/* {destination.type === "national" ? "/ month" : ""} */}
                </p>
               
                <p className='flex items-center mt-^ nb-3 font-semibold'>
                <FaMapMarkerAlt className='text-red-700 mr-1'/>
                {destination.address} </p>
                <div className='flex justify-start item-center space-x-4 w-[75%]'>
                    <p className='bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>
                        {destination.type === "national" ? "National" : "International" }
                    </p>
                    {destination.offer && (
                        <p className='bg-blue-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>
                            ${+destination.regularPrice - +destination.discountedPrice} discount
                        </p>
                    )}
                </div>
                <p className='mt-3 mb-3'>
                     <span className='font-semibold'>Description - </span>
                {destination.description} </p>
                <ul className=' flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-10'>
                    <li className=' flex items-center whitespace-nowrap'>
                        <BsSunFill className='text-lg mr-1 '/>
                         {+destination.day > 1  ? `${destination.day} Days`: "1 Day"}
                    </li>
                    <li className=' flex items-center whitespace-nowrap'>
                        <BsSunFill className='text-lg mr-1'/>
                         {+destination.night > 1  ? `${destination.night} Nights`: "1 Night"}
                    </li>
                </ul>
            
                 
                {destination.userRef === auth.currentUser?.uid && !contactBroker &&(
                    <div className='mt-6 '>
                    <button onClick={()=>setContactBroker(true)} className='px-7 py-3 bg-blue-600 text-white font-medium 
                    text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shodow-lg 
                    focus: bg-blue-700 focus:shadow-lg w-full text-center transition 
                    duration-150 ease-in-out'>Contact Broken </button>
                    </div>
                )}
                {contactBroker && (
                    <Contact userRef={destination.userRef} destination={destination} />
                )}
               
                
            </div>
            <div className=" w-full z-10 h-[200px] md:h-[400px] mt-6 md:mt-0 md:ml-2
            overflow-x-hidden">
                  <MapContainer center={[destination.geolocation.lat , destination.geolocation.lng ]} 
                  zoom={13} scrollWheelZoom={false}
                  style={{height:"100%" ,width:"100%"}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[destination.geolocation.lat , destination.geolocation.lng ]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
            </div>
        </div>
  </main>
  )
  
}
