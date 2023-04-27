import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import Listingdestitems from '../components/Listingitems';
import { useParams } from 'react-router';

export default function CategoryFlight() {
  const [destination , setDestination] = useState(null);
  const [loading , setLoading] = useState(true);
  const [ searchterm , setSearchterm] = useState("")
  const [lastFetchDestination , setLastFetchDestination] = useState(null);
  const params =useParams();
  useEffect(()=>{
   async function fetchDestination(){
    
     try{
        const destinationRef = collection(db,"listing-flight")
        const  q =query (destinationRef , where("type" , "==", params.categoryName), orderBy("timestamp", "desc"), limit(8));
         const querySnap = await getDocs(q);
         const lastVisible = querySnap.docs[querySnap.docs.length-1]
         setLastFetchDestination(lastVisible);
         const destination = []
         querySnap.forEach((doc) =>{
          return destination.push(
           {
             id:doc.id,
            data:doc.data()
          }
          )

         })
         setDestination(destination)
         setLoading(false)
     } catch (err) {
         toast.error("could not find flight")
     }
   } 
   fetchDestination()
 
  },[params.categoryName]);

 async function onFetchMoreListing(){
  try{
    const destinationRef = collection(db,"listing-flight")
    const  q =query (destinationRef , where("type" , "==", params.categoryName), orderBy("timestamp", "desc"),
    startAfter(lastFetchDestination), limit(4));
     const querySnap = await getDocs(q);
     const lastVisible = querySnap.docs[querySnap.docs.length-1]
     setLastFetchDestination(lastVisible);
     const destination = []
     querySnap.forEach((doc) =>{
      return destination.push(
       {
         id:doc.id,
        data:doc.data()
      }
      )

     })
     setDestination((prevState) => [...prevState, ...destination])
     setLoading(false)
 } catch (err) {
     toast.error("could not find flight")
 }
    
  }


  return (
    <div className='max-w-6xl mx-auto px-3' >
      <h1 className='text-3xl text-center mt-6 front-bold mb-6'>
        {params.categoryName === "national" ? "National Places" : "Internationl Places"}
      </h1>
      {loading ? (
        <Spinner />
      ):destination && destination.length >0 ? (
        <>
        <main>
        <div className="flex justify-center items-center">
        <input 
         type="text"
         
         placeholder="Search..."
         className="bg-white px-3 text-center py-1.5 text-gray-700 border
             border-gray-300  mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
         onChange={(event) => {
             setSearchterm(event.target.value);
         }} />
         </div>
          <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {destination.filter((val) => {
              if (searchterm === "") return val;
               else if (val.data.name.toLowerCase().includes(searchterm.toLowerCase()) ) return val;
            }).map((doc) =>(
              <Listingdestitems key={doc.id} listing={doc.data} id={doc.id}  category={"categoryflight"}/>
            ))}
          </ul>
        </main>
        {lastFetchDestination && (
          <div className="flex justify-center items-center">
            <button
            onClick={onFetchMoreListing} className=" bg-white px-3 py-1.5 text-gray-700 border
             border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out">
               Load More</button>
          </div>
        )}
        </>
      ): (
        <p>There are no current {params.categoryName === "national" ? "national places." : "international places."}</p>
      ) }
      </div>
  )
}
