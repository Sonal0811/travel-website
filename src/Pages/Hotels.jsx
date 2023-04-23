import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { collection, collectionGroup, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import Spinner from '../components/Spinner';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import Listingdestitems from '../components/Listingitems';
import SliderHotel from '../components/SliderHotel';
 
 export default function Hotels() {
    //offers 
    const [offerDestination , setOfferDesination] =useState(null)
    useEffect(()=>{
      async function fetchDestination(){
        try{
            //getting reference
          const destinationRef = collection(db, "listing-hotels")
          //create query 
          const  q =query (destinationRef , where("offer" , "==", true), orderBy("timestamp", "desc"), limit(4));
          // execute the query
          const querySnap = await getDocs(q);
          const destination = [];
          querySnap.forEach((doc)=>{
            return destination.push({
              id:doc.id,
              data:doc.data(),
            });
          });
          setOfferDesination(destination);
          console.log(destination);
          
        } catch (error){
        console.log(error);
        }
      }
      fetchDestination()
    },[])
    //national
    const [nationalDestination , setNationalDesination] =useState(null)
    const [category ,setCategory ] = useState("categoryhotel")
    useEffect(()=>{
      async function fetchDestination(){
        try{
            //getting reference
          const destinationRef = collection(db, "listing-hotels")
          //create query 
          const  q =query (destinationRef , where("type" , "==", "national"), orderBy("timestamp", "desc"), limit(4));
          // execute the query
          const querySnap = await getDocs(q);
          const destination = [];
          querySnap.forEach((doc)=>{
            return destination.push({
              id:doc.id,
              data:doc.data(),
            });
          });
          setNationalDesination(destination);
          console.log(destination);
          
        } catch (error){
        console.log(error);
        }
      }
      fetchDestination()
    },[])
    //national
    const [internationalDestination , setInternationalDesination] =useState(null)
    useEffect(()=>{
      async function fetchDestination(){
        try{
            //getting reference
          const destinationRef = collection(db, "listing-hotels")
          //create query 
          const  q =query (destinationRef , where("type" , "==", "international"), orderBy("timestamp", "desc"), limit(4));
          // execute the query
          const querySnap = await getDocs(q);
          const destination = [];
          querySnap.forEach((doc)=>{
            return destination.push({
              id:doc.id,
              data:doc.data(),
            });
          });
          setInternationalDesination(destination);
          console.log(destination);
          
        } catch (error){
        console.log(error);
        }
      }
      fetchDestination()
    },[])
   return (
     <div>
      <SliderHotel />
      <div className='max-w-6xl mx-auto pt-4 space-y-6' >
       {offerDestination && offerDestination.length >0 && (
          <div className='m-2 mb-6 '>
            <h2  className='px-3 text-2xl mt-6 font-semibold'>Recent Offers</h2>
            <Link to="/offerhotel">
              <p className='px-3 text-sm text-blue-500 
              hover:text-blue-900 transition duration-150 ease-in-out'>Show more offers</p>
              <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {offerDestination.map((desti) =>(
                  <Listingdestitems key={desti.id} listing={desti.data} id={desti.id} category={category}/>
                ))}
              </ul>
            </Link>
          </div>
         
        )} 
       {nationalDestination && nationalDestination.length >0 && (
          <div className='m-2 mb-6 '>
            <h2  className='px-3 text-2xl mt-6 font-semibold'>National destination</h2>
            <Link to="/categoryhotel/national">
              <p className='px-3 text-sm text-blue-500 
              hover:text-blue-900 transition duration-150 ease-in-out'>Show more nationl places</p>
              <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {nationalDestination.map((desti) =>(
                  <Listingdestitems key={desti.id} listing={desti.data} id={desti.id} category={category}/>
                ))}
              </ul>
            </Link>
          </div>
         
        )} 
       {internationalDestination && internationalDestination.length >0 && (
          <div className='m-2 mb-6 '>
            <h2  className='px-3 text-2xl mt-6 font-semibold'>International destination</h2>
            <Link to="/categoryhotel/international">
              <p className='px-3 text-sm text-blue-500 
              hover:text-blue-900 transition duration-150 ease-in-out'>Show more internationl places</p>
              <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {internationalDestination.map((desti) =>(
                  <Listingdestitems key={desti.id} listing={desti.data} id={desti.id} category={category}/>
                ))}
              </ul>
            </Link>
          </div>
         
        )} 
      </div>
     </div>
   )
 }
 