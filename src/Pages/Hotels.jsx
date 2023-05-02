import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { collection, collectionGroup, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import Spinner from '../components/Spinner';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import Listingdestitems from '../components/Listingitems';
import SliderHotel from '../components/SliderHotel';
import Questions from './Footer/Questions';
import Footer from './Footer/Footer';
 
 export default function Hotels() {
    //offers 
    const [category ,setCategory ] = useState("categoryhotel");
    const [ searchterm , setSearchterm] = useState("");
    const [ filteredDataDesti , setFilteredDataDesti] = useState();
    const [offerDestination , setOfferDesination] =useState(null);
    const [ showComponent , setShowComponent] = useState(false);
    useEffect( () => {
      setInterval(() => {
      setShowComponent(true)
      },3000); },[]);
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
          const destinationRef = collection(db, "listing-hotels")
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

    //national
    const [internationalDestination , setInternationalDesination] =useState(null);
    const [ filteredDataInter , setFilteredDataInter] = useState();
    useEffect(()=>{
      async function fetchDestination(){
        try{
            //getting reference
          const destinationRef = collection(db, "listing-hotels")
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
      <SliderHotel />
      <div className="flex justify-center items-center">
        <h2 className='pr-3'>Search with names...     </h2> 
        <input 
         type="text"
         
         placeholder="Filtering all section ..."
         className="bg-white px-3 text-center py-1.5 text-gray-700 border
             border-gray-300  mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
         onChange={(event) => {
             setSearchterm(event.target.value);
         }} />
          </div>
      <div className='max-w-6xl mx-auto mb-4 pd-4 pt-4 space-y-6' >
       {filteredDataDesti && filteredDataDesti.length >0 && (
          <div className='m-2 mb-6 '>
            <h2  className='px-3 text-2xl mt-6 font-semibold'>Recent Offers</h2>
            <Link to="/offerhotel">
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
            <Link to="/categoryhotel/national">
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
            <Link to="/categoryhotel/international">
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
      
      {showComponent && <Footer />}
     </div>
   )
 }
 