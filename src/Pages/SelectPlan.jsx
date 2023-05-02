import { getAuth } from 'firebase/auth';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import Spinner from '../components/Spinner';

export default function SelectPlan() {
    const auth = getAuth()
    const navigate = useNavigate();
    const [destination , setDestination] =useState(null);
    const [destinationId , setDestinationId] =useState(null);
    const [destinationType , setDestinationType] =useState(null);
    const [selectedDestination , setSelectedDestination] =useState(null);
    const [loading ,setLoading] = useState(true);
   
      const name= auth.currentUser.displayName;
     const email= auth.currentUser.email;

     useEffect(()=>{
      async function fetchDestination(){
        try{
            //getting reference
          const destinationRef = collection(db, "listing-destinations")
          //create query 
          const  q =query (destinationRef, orderBy("timestamp", "desc"));
          // execute the query
          const querySnap = await getDocs(q);
          const destination = [];
          querySnap.forEach((doc)=>{
            
            return destination.push({
              id:doc.id,
              data:doc.data(),
            });
       
          
          });
          setDestination(destination);
          console.log(destination);
          
        } catch (error){
        console.log(error);
        }
      }
      fetchDestination()
      setLoading(false)
    },[])

    useEffect(()=>{
      if(destination !== null){
      destination.map((card) =>{
        if(selectedDestination === card.data.name){
          setDestinationId(card.id)
          setDestinationType(card.data.type)

          console.log(destinationId +"yo yo yoy " + destinationType);
        }
      })
    }
     
    },[selectedDestination,destination])

   

  

    if(loading == true || destination == null){
        return <Spinner />
    }
  return (
    <section className='w-full h-full mx-auto flex justify-center flex-col bg-[url("https://images.unsplash.com/photo-1446038236174-69712e24d137?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fG9jZWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60")] bg-no-repeat bg-cover' >
       <h1 className='text-3xl text-center mt-6 font-bold text-black'>Create Your Own Travel Itinerary</h1>
       <div className='max-w-8xl mx-12 flex justify-between flex-row'>
       <div className='w-full md:w-[50%] mt-6 px-3 flex-row justify-center rounded-[2%] py-8'>
        <div className='flex justify-center flex-row'>
            {/* <div className='flex flex-row'>TRAVEL</div>
            <div className='flex flex-row'>THE WORLD</div> */}
            <img className='rounded-[2%]' src="https://images.unsplash.com/photo-1528382324962-85858f70f39b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYXZlbCUyMHF1b3Rlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=350&h=400&q=50" alt="pic" />
        </div>
       </div>
       <div className='w-full md:w-[50%] mt-6 px-3 justify-center '>
        <div>
        <input type="text" id="name" value={name} disabled
            className={`mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white 
            border border-gray-300 rounded transition ease-in-out`}></input>
          </div>
           <div className='flex-col'><input type="email" value={email} disabled 
            className='mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white 
            border border-gray-300 rounded transition ease-in-out'/></div>
             <div>
        
            <select
            className='mb-4 w-full px-4 py-2 text-xl text-gray-500 bg-white 
            border border-gray-300 rounded transition ease-in-out'
            value ={selectedDestination}
            onChange ={e => {
               setSelectedDestination(e.target.value)}}>
               <option value="">Enter Destination (country, region or city)</option>
               {destination.map((card) => ( 
                <option value={card.data.name}>{card.data.name}</option>
                ))} 
                </select> 
        </div>

        <div>
            <p><b>Date Range</b></p>
            <input type="date" id="startDate" placeholder='Start Date'className='mb-6 w-[47%] mr-4 px-4 py-2 text-xl text-gray-500 bg-white 
            border border-gray-300 rounded transition ease-in-out'/>
            {/* Start Date</input> */}
            <input type="date" id="endDate" placeholder='End Date'  className='mb-6 w-[47%] ml-3 px-4 py-2 text-xl text-gray-500 bg-white 
            border border-gray-300 rounded transition ease-in-out'/>
            {/* End Date</input> */}
        </div>
        <div className='mb-2 w-full mr-4 px-4 py-2 text-xl text-black bg-white 
            border border-gray-300 rounded transition ease-in-out'>
            <p className='mb-4'>Activities Preference (optional)</p>
            <input type="checkbox" id="culture" className='px-4 mr-1'/>CULTURE
            <input type="checkbox" id="outdoor" className='px-4 mr-1 ml-7'/>OUTDOOR
            <input type="checkbox" id="wildlife" className='px-4 mr-1 ml-7'/>WILDLIFE
            <input type="checkbox" id="beaches" className='px-4 mr-1 ml-7'/>BEACHES
        </div>
        <button onClick={()=>{navigate(`/category/${destinationType}/${destinationId}`)}} className='mt-3 mb-6 w-full bg-red-600 text-white
        uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-red-700 cursor-pointer
        transition duration-150 ease-in-out hover:shadow-lg active:bg-red-800'>Build Package</button>
        </div>
        </div>
        </section>
  )
}
