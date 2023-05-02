import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import Listingdestitems from '../components/Listingitems';
import { Link } from 'react-router-dom';
import Footer from './Footer/Footer';

export default function Offers() {
  const [destination , setDestination] = useState(null);
  const [loading , setLoading] = useState(true);
  const [lastFetchDestination , setLastFetchDestination] = useState(null);
  const [category , setCategory] = useState("category")
  const [ searchterm , setSearchterm] = useState("")
  useEffect(()=>{
   async function fetchDestination(){
    
     try{
        const destinationRef = collection(db,"listing-destinations")
        const  q =query (destinationRef , where("offer" , "==", true ), orderBy("timestamp", "desc"));
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
         toast.error("could not find destinations")
     }
   } 
   fetchDestination()
 
  },[]);

 async function onFetchMoreListing(){
  try{
    const destinationRef = collection(db,"listing-destinations")
    const  q =query (destinationRef , where("offer" , "==", true), orderBy("timestamp", "desc"),
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
     toast.error("could not find destinations")
 }
    
  }

  const [ filteredDataDesti , setFilteredDataDesti] = useState();
  const [offerDestination , setOfferDesination] =useState(null);
 
  useEffect(()=>{
    async function fetchDestination(){
      try{
          //getting reference
        const destinationRef = collection(db, "listing-destinations")
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
  
  useEffect(()=>{

    async function findFiteredData(){
      let destination = [];
      try{
      
      offerDestination.filter((val) => {
        if (searchterm === ""){ 
          return val
          
        } else if (val.data.name.toLowerCase().includes(searchterm.toLowerCase()) ){ 
          return val
          
        };
      }).slice(0,4).map((doc)=>{
          
        return destination.push({
          id:doc.id,
          data:doc.data,
        });
   
      
      });
    }catch (error){
      console.log(error);
      }
     
      setFilteredDataDesti(destination)
      console.log(filteredDataDesti);
     } 

    
    findFiteredData()
    console.log("hello their");
    console.log(filteredDataDesti);
    
  }, [filteredDataDesti , searchterm])

  const [ filteredDataDestiflight , setFilteredDataDestiflight] = useState();
  const [offerDestinationflight , setOfferDesinationflight] =useState(null);
  useEffect(()=>{
    async function fetchDestination(){
      try{
          //getting reference
        const destinationRef = collection(db, "listing-flight")
        //create query 
        const  q =query (destinationRef , where("offer" , "==", true), orderBy("timestamp", "desc"));
        // execute the query
        const querySnap = await getDocs(q);
        const destination = [];
        querySnap.forEach((doc)=>{
          return destination.push({
            id:doc.id,
            data:doc.data(),
          });
        });
        setOfferDesinationflight(destination);
        console.log(destination);
        
      } catch (error){
      console.log(error);
      }
    }
    fetchDestination()
  },[])
  
  useEffect(()=>{

    async function findFiteredData(){
      let destination = [];
      try{
      
      offerDestinationflight.filter((val) => {
        if (searchterm === ""){ 
          return val
          
        } else if (val.data.name.toLowerCase().includes(searchterm.toLowerCase()) ){ 
          return val
          
        };
      }).slice(0,4).map((doc)=>{
          
        return destination.push({
          id:doc.id,
          data:doc.data,
        });
   
      
      });
    }catch (error){
      console.log(error);
      }
     
      setFilteredDataDestiflight(destination)
      console.log(filteredDataDestiflight);
     } 

    
    findFiteredData()
    console.log("hello their");
    console.log(filteredDataDestiflight);
    
  }, [filteredDataDestiflight , searchterm])


  const [ filteredDataDestiHotel , setFilteredDataDestiHotel] = useState();
  const [offerDestinationHotel , setOfferDesinationHotel] =useState(null);
  useEffect(()=>{
    async function fetchDestination(){
      try{
          //getting reference
        const destinationRef = collection(db, "listing-hotels")
        //create query 
        const  q =query (destinationRef , where("offer" , "==", true), orderBy("timestamp", "desc"));
        // execute the query
        const querySnap = await getDocs(q);
        const destination = [];
        querySnap.forEach((doc)=>{
          return destination.push({
            id:doc.id,
            data:doc.data(),
          });
        });
        setOfferDesinationHotel(destination);
        console.log(destination);
        
      } catch (error){
      console.log(error);
      }
    }
    fetchDestination()
  },[])

  useEffect(()=>{

    async function findFiteredData(){
      let destination = [];
      try{
      
      offerDestinationHotel.filter((val) => {
        if (searchterm === ""){ 
          return val
          
        } else if (val.data.name.toLowerCase().includes(searchterm.toLowerCase()) ){ 
          return val
          
        };
      }).slice(0,4).map((doc)=>{
          
        return destination.push({
          id:doc.id,
          data:doc.data,
        });
   
      
      });
    }catch (error){
      console.log(error);
      }
     
      setFilteredDataDestiHotel(destination)
      console.log(filteredDataDestiHotel);
     } 

    
    findFiteredData()
    console.log("hello their");
    console.log(filteredDataDestiHotel);
    
  }, [filteredDataDestiHotel , searchterm])


  return (
    <>
    <div className='max-w-6xl mx-auto px-3' >
      <h1 className='text-3xl text-center mt-6 front-bold mb-6'>Offers</h1>
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
         <div className='max-w-6xl mx-auto pt-4 space-y-6' >
       {filteredDataDesti && filteredDataDesti.length >0 && (
          <div className='m-2 mb-6 '>
            <h2  className='px-3 text-2xl mt-6 font-semibold'>Recent Offers on Destinations</h2>
            <Link to="/offerdestination">
              <p className='px-3 text-sm text-blue-500 
              hover:text-blue-900 transition duration-150 ease-in-out'>Show more offers</p>
              <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                
                {filteredDataDesti.map((desti) =>(

                  <Listingdestitems key={desti.id} listing={desti.data} id={desti.id} category={category}/>
                ))}
              </ul>
            </Link>
          </div>
         
        )}
        {filteredDataDestiHotel && filteredDataDestiHotel.length >0 && (
          <div className='m-2 mb-6 '>
            <h2  className='px-3 text-2xl mt-6 font-semibold'>Recent Offers On Hotels</h2>
            <Link to="/offerhotel">
              <p className='px-3 text-sm text-blue-500 
              hover:text-blue-900 transition duration-150 ease-in-out'>Show more offers</p>
              <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {filteredDataDestiHotel.map((desti) =>(
                  <Listingdestitems key={desti.id} listing={desti.data} id={desti.id} category={category}/>
                ))}
              </ul>
            </Link>
          </div>
         
        )} 

{filteredDataDestiflight && filteredDataDestiflight.length >0 && (
          <div className='m-2 mb-6 '>
            <h2  className='px-3 text-2xl mt-6 font-semibold'>Recent Offers on Flights</h2>
            <Link to="/offerflight">
              <p className='px-3 text-sm text-blue-500 
              hover:text-blue-900 transition duration-150 ease-in-out'>Show more offers</p>
              <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {filteredDataDestiflight.map((desti) =>(
                  <Listingdestitems key={desti.id} listing={desti.data} id={desti.id} category={category}/>
                ))}
              </ul>
            </Link>
          </div>
         
        )} 

        </div>
        </main>
        
        {/* {lastFetchDestination && (
          <div className="flex justify-center items-center">
            <button
            onClick={onFetchMoreListing} className=" bg-white px-3 py-1.5 text-gray-700 border
             border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out">
               Load More</button>
          </div>
        )} */}
        </>
      ): (
        <p>There are no current offers</p>
      ) }
      </div>
      <Footer />
      </>
  )
}
