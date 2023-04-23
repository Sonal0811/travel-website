import React, { useState } from 'react'
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import {v4 as uuidv4} from "uuid";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';


export default function CreateListingHotels() {
    const [formData, setFormData] = useState({
        type: 'international',
        name: "",
        room: 1,
        adult: 1,
        star: 2,
        address: "",
        description: "",
        offer: "true",
        regularPrice: 0,
        discountedPrice: 0,
        latitude:0,
        longitude: 0,
    })
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { type, name, room, adult, star, address, description, offer, regularPrice,latitude, longitude, discountedPrice,images } = formData;
    function onChange(e) {
        let boolean = null;
        if (e.target.value === "true") {
            boolean = true;
          }
          if (e.target.value === "false") {
            boolean = false;
          }
          // Files
          if (e.target.files) {
            setFormData((prevState) => ({
              ...prevState,
              images: e.target.files,
            }));
          }
          // Text/Boolean/Number
          if (!e.target.files) {
            setFormData((prevState) => ({
              ...prevState,
              [e.target.id]: boolean ?? e.target.value,
            }));
          }
    }
    async function onSubmit(e){
      e.preventDefault();
      setLoading(true);
      if (+discountedPrice >= +regularPrice) {
       setLoading(false);
       toast.error("Discounted price needs to be less than regular price");
       return;
     }
     if (images.length > 50) {
       setLoading(false);
       toast.error("maximum 50 images are allowed");
       return;
     }
     let geolocation = {};
   //   let location;
        geolocation.lat = latitude;
        geolocation.lng = longitude;
        async function storeImage(image){
           return new Promise((resolve, reject) => {
               const storage = getStorage();
               const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
               const storageRef = ref(storage, filename);
               const uploadTask = uploadBytesResumable(storageRef, image);  
               uploadTask.on(
                   "state_changed",
                   (snapshot) => {
                     // Observe state change events such as progress, pause, and resume
                     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                     const progress =
                       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                     console.log("Upload is " + progress + "% done");

                     switch (snapshot.state) {
                       case "paused":
                         console.log("Upload is paused");
                         break;
                       case "running":
                         console.log("Upload is running");
                         break;
                         default:
                          break;
                     }
                   },
                   (error) => {
                     // Handle unsuccessful uploads
                     reject(error);
                   },
                   () => {
                     // Handle successful uploads on complete
                     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                       resolve(downloadURL);
                     });
                   }
                 );   
        } );
       }
        const imgUrls = await Promise.all(
           [...images].map((image) => storeImage(image))).catch(error => {
               setLoading(false);
               toast.error("Images not uploaded");
               return;
           } 
       
       )
       const formDataCopy = {
           ...formData,
           imgUrls,
           geolocation,
           timestamp : serverTimestamp(),
           userRef: auth.currentUser.uid,
       };
       delete formDataCopy.images;
       !formDataCopy.offer && delete formDataCopy.discountedPrice; 
       delete formDataCopy.latitude;
       delete formDataCopy.longitude;
       const docRef = await addDoc(collection(db, "listing-hotels"), formDataCopy);
       setLoading(false);
       toast.success("Hotel Listed");
       navigate(`/categoryhotel/${formDataCopy.type}/${docRef.id}`)
   }

    if(loading){
      return <Spinner/>
  }
  return (
    <main className='max-w-md px-2 mx-auto'><h1 className='text-3xl text-center mt-6 font-bold'>
        Create a listing of Hotels
        </h1>
        <form onSubmit={onSubmit}>
            <p className='text-lg mt-6 font-semibold'>Add Hotels</p>
            <div className='flex'>
                <button type='button' id='type' value="national" onClick={onChange}
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out
                w-full ${type === "international" ? "bg-white text-black" : "bg-teal-600 text-white"}`}>
                  National
                </button>
                <button type='button' id='type' value="international" onClick={onChange}
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out
                w-full ${type === "national" ? "bg-white text-black" : "bg-teal-600 text-white"}`}>
                  international
                </button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Name of Hotel </p>
            <input type="text" id='name' value={name} onChange={onChange}
            placeholder='Name' maxLength="100" minLength="4" required className='w-full rounded px-4 py-2 text-xl text-grey-700 bg-white border border-gray-300
            transition  duration-150 ease-in-out focus:text-gray-700 focus:bg-white
            focus:border-teal-600 '/>
            <div className='flex space-x-6 mt-6 '>
                <div className=''>
                    <p className='w-full text-lg font-semibold'>Room</p>
                    <input type="number" id="room" value={room} onChange={onChange} min="1" max="365" required
                    className='px-4 py-2 text-xl text-grey-700 bg-white border border-grey-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white
                    focus:border-teal-600 text-center'/>
                </div>
                <div className=''>
                    <p className='w-full text-lg font-semibold'>Adult</p>
                    <input type="number" id="adult" value={adult} onChange={onChange} min="1" max="365" required
                    className='px-4 py-2 text-xl text-grey-700 bg-white border border-grey-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white
                    focus:border-teal-600 text-center'/>
                </div>
                </div>
                <div className='flex space-x-2 mt-6 '>
                <div className=''>
                    <p className='w-full text-lg font-semibold'>Star Category</p>
                    <input type="number" id="star" value={star} onChange={onChange} min="1" max="7" required
                    className='px-4 py-2 text-xl text-grey-700 bg-white border border-grey-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white
                    focus:border-teal-600 text-center'/>
                </div>
                {/* <div className=''>
                    <p className='w-full text-lg font-semibold'>Hotels</p>
                    <input type="number" id="night" value={hotels} onChange={onChange} min="1" max="50" required
                    className='px-4 py-2 text-xl text-grey-700 bg-white border border-grey-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white
                    focus:border-teal-600 text-center'/>
                </div>
                <div className=''>
                    <p className='w-full text-lg font-semibold'>Activities</p>
                    <input type="number" id="day" value={activities} onChange={onChange} min="3" max="50" required
                    className='px-4 py-2 text-xl text-grey-700 bg-white border border-grey-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white
                    focus:border-teal-600 text-center'/>
                </div>
                <div className=''>
                    <p className='w-full text-lg font-semibold'>Transfer</p>
                    <input type="number" id="night" value={transfer} onChange={onChange} min="1" max="10" required
                    className='px-4 py-2 text-xl text-grey-700 bg-white border border-grey-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white
                    focus:border-teal-600 text-center'/>
                </div> */}
            </div>
            <p className='text-lg mt-6 font-semibold'>Address </p>
            <textarea id='address' value={address} onChange={onChange}
            placeholder='Enter address' maxLength="500" minLength="4" required className='w-full rounded px-4 py-2 text-xl text-grey-700 bg-white border border-gray-300
            transition  duration-150 ease-in-out focus:text-gray-700 focus:bg-white
            focus:border-teal-600 '/>

              <div className='flex space-x-6 justify-start mb-6'>
                    <div className=''>
                        <p className='text-lg font-semibold '>Latitude</p>
                        <input type="text" id="latitude" value={latitude} onChange={onChange} 
                        maxLength="90" minLength="-90" className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-teal-600 text-center"/>
                    </div>
                    <div className="">
              <p className="text-lg font-semibold">Longitude</p>
              <input
                type="text"
                id="longitude"
                value={longitude}
                onChange={onChange}
                required
                min="-180"
                max="180"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
              />
            </div>
                </div>

            <p className='text-lg mt-6 font-semibold mb-1'>Description </p>
            <textarea id='description' value={description} onChange={onChange}
            placeholder='Description' maxLength="500" minLength="4" required className='w-full rounded px-4 py-2 text-xl text-grey-700 bg-white border border-gray-300
            transition  duration-150 ease-in-out focus:text-gray-700 focus:bg-white
            focus:border-teal-600 '/>
             <p className="text-lg font-semibold">Offer</p>
        <div className="flex mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-teal-600 text-white" : "bg-white text-black"  
            }`}
          >
            yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-teal-600 text-white" : "bg-white text-black"  
            }`}
          >
            no
          </button>
        </div>
        <div className="flex items-center mb-6">
          <div className="">
            <p className="text-lg font-semibold">Regular price</p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                min="50"
                max="400000000"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
              
            </div>
          </div>
        </div>
        {offer && (
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold">Discounted price</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onChange}
                  min="50"
                  max="400000000"
                  required={offer}
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
              </div>
            </div>
          </div>
        )}
        <div className='mb-6'>
            <p className='text-lg font-semibold'>Images</p>
            <p className='text-gray-600'>The First Image will be the cover (max 50)</p>
            <input type="file" id="images" onChange={onChange} accept='.jpg, .png, .jpeg'
            multiple required className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-teal-600'/>
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Add Hotel
        </button>
        </form>
        </main>
  )
}
