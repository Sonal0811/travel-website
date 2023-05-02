import React, { useEffect } from 'react'
import { getAuth, updateProfile } from "firebase/auth"
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { NavLink, useNavigate , Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { db } from '../firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import {FaHotel} from "react-icons/fa";
import {MdFlight} from "react-icons/md";
import {SiYourtraveldottv} from "react-icons/si";
import Listingdestitems from '../components/Listingitems';
import Spinner from '../components/Spinner';
export default function Profile() {
    const auth = getAuth()
    const navigate = useNavigate();
    const [changeDetail, setChangeDetail] = useState(false)
    const [listingdestinations, setListingdestinations] = useState(null);
    const [listingFlights, setListingFlights] = useState(null);
    const [listingHotels, setListingHotels] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ userRole , setUserRole] = useState();

    const[FormData, setFormData]= useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });
    const {name, email} = FormData;
    function onLogout(){
       auth.signOut() 
       navigate("/");
    }
    function onChange(e){
       setFormData((prevState) =>({
        ...prevState,
        [e.target.id]: e.target.value,
       }));
    }
    async function onSubmit(){
      try{
        if(auth.currentUser.displayName !== name){
            //update display name in Firebase auth
            await updateProfile(auth.currentUser, {
                displayName: name,
            });
            //update name in the Firestore
            const docRef = doc(db, "users", auth.currentUser.uid)
            await updateDoc(docRef, {
                name,
            });
        }
        toast.success('Profile details updated')
      } catch(error){
        toast.error("Could not update the profile details")
      }
    }
    useEffect(() =>{
        
    }, [auth.currentUser.uid])

    async function onDelete(listingID) {
      if (window.confirm("Are you sure you want to delete?")) {
        await deleteDoc(doc(db, "listing-destinations", listingID));
        const updatedListings = listingdestinations.filter(
          (listing) => listing.id !== listingID
        );
        setListingdestinations(updatedListings);
        toast.success("Successfully deleted the listing");
      }
    }
    function onEdit(listingID) {
      navigate(`/edit-listing-destination/${listingID}`);
    }


    useEffect(() =>{
      console.log("startted this part  ");
      async function fetchUserRole(){
        const listingRef = doc(db,"users",auth.currentUser.uid);
        let docdata = await getDoc(listingRef)
        if (docdata.exists()) {
          setUserRole(docdata.data().role);
         
        }
      
        // setListingdestinations(listingdestinations);
        // setLoading(false);
      }
      fetchUserRole();
      
    }, [])

    async function onDeleteHotel(listingID) {
      if (window.confirm("Are you sure you want to delete?")) {
        await deleteDoc(doc(db, "listing-hotels", listingID));
        const updatedListings = listingHotels.filter(
          (listing) => listing.id !== listingID
        );
        setListingHotels(updatedListings);
        toast.success("Successfully deleted the listing");
      }
    }
    async function onDeleteFlight(listingID) {
      if (window.confirm("Are you sure you want to delete?")) {
        await deleteDoc(doc(db, "listing-flight", listingID));
        const updatedListings = listingFlights.filter(
          (listing) => listing.id !== listingID
        );
        setListingFlights(updatedListings);
        toast.success("Successfully deleted the listing");
      }
    }
    function onEditHotel(listingID) {
      navigate(`/edit-listing-hotels/${listingID}`);
    }

    useEffect(() =>{
      async function fetchstaffdestinationlisting(){
        const listingRef = collection(db,"listing-destinations");
        const q =query(listingRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"));
        const querySnap = await getDocs(q);
        let listingdestinations = [];
        querySnap.forEach((doc)=>{
          return listingdestinations.push({
           id: doc.id,
           data: doc.data(),
          });
        });
        setListingdestinations(listingdestinations);
        // setLoading(false);
      }
      fetchstaffdestinationlisting();
      async function fetchstaffhotelslisting(){
        const listingRef = collection(db,"listing-hotels");
        const q =query(listingRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"));
        const querySnap = await getDocs(q);
        let listinghotel = [];
        querySnap.forEach((doc)=>{
          return listinghotel.push({
           id: doc.id,
           data: doc.data(),
          });
        });
        setListingHotels(listinghotel);
     
      }
      fetchstaffhotelslisting();
      async function fetchstaffflightslisting(){
        const listingRef = collection(db,"listing-flight");
        const q =query(listingRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"));
        const querySnap = await getDocs(q);
        let listingflights = [];
        querySnap.forEach((doc)=>{
          return listingflights.push({
           id: doc.id,
           data: doc.data(),
          });
        });
        setListingFlights(listingflights);
     
        setLoading(false);
      }
      fetchstaffflightslisting();
    }, [auth.currentUser.uid])
  
    
  
    function onEditFlights(listingID) {
      navigate(`/edit-listing-flights/${listingID}`);
    }


    console.log(userRole);

    if(loading) {
      return <Spinner />
    }


    if(userRole === "staff") {
      return (

        <>
         
        
          <>
              <section className='max-w-6xl mx-auto flex justify-center items-center
         flex-col '>
            <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
         <div className='w-full md:w-[50%] mt-6 px-3'>
            <form>
                {/* Name Input */ }
                <input type="text" id='name' value={name} disabled={!changeDetail}
                onChange={onChange}
                className={`mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white 
                border border-gray-300 rounded transition ease-in-out ${changeDetail && "border-2 border-red-600 bg-red-200 focus:border-red-600"}`}/>
                {/* Email Input */} 
                <input type="email" id='email' value={email} disabled 
                className='mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white 
                border border-gray-300 rounded transition ease-in-out'/>
                <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
                    <p onClick={() => {
                        changeDetail && onSubmit();
                        setChangeDetail((prevState) => !prevState)
                    } }className='flex bg-white px-2 border-2 border-blue-600 rounded text-blue-600 hover:text-white hover:bg-blue-600
                    transition ease-in-out duration-200 cursor-pointer'><FaEdit className="text-2xl"/> {changeDetail ? "Apply change" : "Edit"} </p><p onClick={onLogout} className='text-blue-600 hover:text-white hover:bg-blue-600
                    transition duration-200 ease-in-out cursor-pointer px-2 border-2 border-blue-600 rounded'>Sign Out</p>
                </div>
            </form>
            <button type="submit" className='mt-6 w-full bg-blue-600 text-white
            uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 cursor-pointer
            transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>
             <NavLink to="/create-listing-destination" className="flex justify-center items-center">
             <SiYourtraveldottv className='mr-2 text-2xl'/>
              Add Destination
             </NavLink>
            </button>
            <button type="submit" className='mt-6 w-full bg-blue-600 text-white
            uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 cursor-pointer
            transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>
              <NavLink to="/create-listing-hotels" className="flex justify-center items-center">
              <FaHotel className="mr-2 text-xl"/>
              Add Hotels Information
              </NavLink>
            </button>
            <button type="submit" className='mt-6 w-full bg-blue-600 text-white
            uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 cursor-pointer
            transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>
             <NavLink to="/create-listing-flights" className="flex justify-center items-center">
             <MdFlight className='mr-2 text-2xl'/>
              Add Flights Information
             </NavLink>
            </button>
         </div>
        </section>
        <div className="max-w-6xl px-3 mt-6 mx-auto">
          {!loading && listingdestinations.length > 0 &&(
            <>
            <h2 className='text-2xl text-center font-semibold mb-6'>My Destination Listing</h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  {listingdestinations.map((listing) => (
                    <Listingdestitems
                      key={listing.id}
                      id={listing.id}
                      listing={listing.data}
                      onDelete={() => onDelete(listing.id)}
                      onEdit={() => onEdit(listing.id)}
                      category = {"category"}
                    />
                  ))}
                </ul>
            </>
            )}
        </div>
        <div className="max-w-6xl px-3 mt-6 mx-auto">
          {!loading && listingHotels.length > 0 &&(
            <>
            <h2 className='text-2xl text-center font-semibold mb-6'>My Hotels Listing</h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  {listingHotels.map((listing) => (
                    <Listingdestitems
                      key={listing.id}
                      id={listing.id}
                      listing={listing.data}
                      onDelete={() => onDeleteHotel(listing.id)}
                      onEdit={() => onEditHotel(listing.id)}
                      category= {"categoryhotel"}
                    />
                  ))}
                </ul>
            </>
            )}
        </div>
        <div className="max-w-6xl px-3 mt-6 mx-auto">
          {!loading && listingFlights.length > 0 &&(
            <>
            <h2 className='text-2xl text-center font-semibold mb-6'>My Flights Listing</h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  {listingFlights.map((listing) => (
                    <Listingdestitems
                      key={listing.id}
                      id={listing.id}
                      listing={listing.data}
                      onDelete={() => onDeleteFlight(listing.id)}
                      onEdit={() => onEditFlights(listing.id)}
                      category= {"categoryflight"}
                    />
                  ))}
                </ul>
            </>
            )}
        </div> 
          
          </>
    
       
        
     
      
        </>
      )
    } else {
      navigate("/profileuser") 
    
    }

 
}
