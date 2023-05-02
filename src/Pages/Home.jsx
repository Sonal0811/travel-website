 import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { collection, collectionGroup, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import Spinner from '../components/Spinner';
import { db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import Listingdestitems from '../components/Listingitems';
import Questions from './Footer/Questions';
import Footer from './Footer/Footer';
import { Button } from "@material-tailwind/react";
import { GiExplodingPlanet } from 'react-icons/gi';
 
 export default function Home() {
    //offers 
    const navigate = useNavigate();
    const [category ,setCategory ] = useState("category")
    const [ searchterm , setSearchterm] = useState(""); 
    const [ filteredDataDesti , setFilteredDataDesti] = useState();
    const [offerDestination , setOfferDesination] =useState(null);
    const [ showComponent , setShowComponent] = useState(false);
    useEffect( () => {
      setInterval(() => {
      setShowComponent(true)
      },1000); },[]);
   
    useEffect(()=>{
      async function fetchDestination(){
        try{
            //getting reference
          const destinationRef = collection(db, "listing-destinations")
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

   

    //national
    const [nationalDestination , setNationalDesination] =useState(null)
    const [ filteredDataNational , setFilteredDataNational] = useState();
    useEffect(()=>{
      async function fetchDestination(){
        try{
            //getting reference
          const destinationRef = collection(db, "listing-destinations")
          //create query 
          const  q =query (destinationRef , where("type" , "==", "national"), orderBy("timestamp", "desc"));
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
    useEffect(()=>{

      async function findFiteredData(){
        let destination = [];
        try{
        
        nationalDestination.filter((val) => {
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
       
        setFilteredDataNational(destination)
        
       } 

      
      findFiteredData()
   
      
    }, [filteredDataNational, searchterm])




    //inter   national
    const [internationalDestination , setInternationalDesination] =useState(null)
    const [ filteredDataInter , setFilteredDataInter] = useState();
    useEffect(()=>{
      async function fetchDestination(){
        try{
            //getting reference
          const destinationRef = collection(db, "listing-destinations")
          //create query 
          const  q =query (destinationRef , where("type" , "==", "international"), orderBy("timestamp", "desc"));
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
    useEffect(()=>{

      async function findFiteredData(){
        let destination = [];
        try{
        
        internationalDestination.filter((val) => {
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
       
        setFilteredDataInter(destination)
        
       } 

      
      findFiteredData()
   
      
    }, [filteredDataInter, searchterm])


  


    

   return (
     <div>
      <Slider/>
      {showComponent && <div className="flex justify-center items-center">
        <h2 className='pr-3'>Search with names...     </h2> 
        <input 
         type="text"
         
         placeholder="Filtering all sections...."
         className="bg-white px-3 text-center py-1.5 text-gray-700 border
             border-gray-300  mb-6 mt-6 mr-5 hover:border-slate-600 rounded transition duration-150 ease-in-out"
         onChange={(event) => {
             setSearchterm(event.target.value);
         }} />
         <Button  color="white" className="ml-4 flex items-center gap-3"  onClick={()=>{navigate("/selectplan")}}>
         {/* <img src="/icons/metamask.svg" alt="" className="h-6 w-6" /> */}
         <GiExplodingPlanet size={"1.2rem"} color="blue" onMouseOver={({target})=>target.style.color="red"} 
         onMouseOut={({target})=>target.style.color="blue"}/>
        Create Your Plan

         </Button>
         {/* import { Button } from "@material-tailwind/react";
 
export default function Example() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button size="lg" color="white" className="flex items-center gap-3">
        <img src="/icons/metamask.svg" alt="metamask" className="h-6 w-6" />
        Connect Wallet
      </Button>
      <Button
        size="lg"
        variant="outlined"
        color="blue-gray"
        className="flex items-center gap-3"
      >
        <img src="/icons/google.svg" alt="metamask" className="h-6 w-6" />
        Continue with Google
      </Button>
      <Button
        size="lg"
        variant="gradient"
        color="light-blue"
        className="group relative flex items-center gap-3 overflow-hidden pr-[72px]"
      >
        Sign in with Twitter
        <span className="absolute right-0 grid h-full w-12 place-items-center bg-light-blue-600 transition-colors group-hover:bg-light-blue-700">
          <img src="/icons/twitter.svg" alt="metamask" className="h-6 w-6" />
        </span>
      </Button>
    </div>
  );
} */} 
         </div> }
      <div className='max-w-6xl mx-auto pt-4 space-y-6' >
       {filteredDataDesti && filteredDataDesti.length >0 && (
          <div className='m-2 mb-6 '>
            <h2  className='px-3 text-2xl mt-6 font-semibold'>Recent Offers</h2>
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
       {filteredDataNational && filteredDataNational.length >0 && (
          <div className='m-2 mb-6 '>
            <h2  className='px-3 text-2xl mt-6 font-semibold'>National destination</h2>
            <Link to="/category/national">
              <p className='px-3 text-sm text-blue-500 
              hover:text-blue-900 transition duration-150 ease-in-out'>Show more nationl places</p>
              <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {filteredDataNational.map((desti) =>(
                  <Listingdestitems key={desti.id} listing={desti.data} id={desti.id} category={category}/>
                ))}
              </ul>
            </Link>
          </div>
         
        )} 
       {filteredDataInter && filteredDataInter.length >0 && (
          <div className='m-2 mb-6 '>
            <h2  className='px-3 text-2xl mt-6 font-semibold'>International destination</h2>
            <Link to="/category/international">
              <p className='px-3 text-sm text-blue-500 
              hover:text-blue-900 transition duration-150 ease-in-out'>Show more internationl places</p>
              <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {filteredDataInter.map((desti) =>(
                  <Listingdestitems key={desti.id} listing={desti.data} id={desti.id} category={category}/>
                ))}
              </ul>
            </Link>
          </div>
         
        )} 
      </div>
      {showComponent &&<Questions /> }
      {showComponent &&<Footer/> }
     </div>
   )
 }
 