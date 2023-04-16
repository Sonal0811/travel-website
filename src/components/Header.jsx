import {useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
    const [pageState, setPageState] = useState("Login");
    const location =useLocation();
    const navigate =useNavigate();
    const auth = getAuth();
    useEffect(() =>{
      onAuthStateChanged(auth, (user)=>{
        if(user){
            setPageState("Profile")
        }else{
            setPageState("Login")
        }
      })
    }, [auth])
    function pathMatchRoute(route){
        if(route === location.pathname){
            return true
        }
    }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
            <div className='flex space-x-2 py-3'>
        <img src='https://tse1.mm.bing.net/th?id=OIP.HhtIdpEhFGUL1F9XpqujeAHaHu&pid=Api&P=0' alt='logo' className='h-10 cursor-pointer' onClick={()=> navigate("/")}/>
        <div className=' cursor-pointer py-2'>TravelBuddy.com</div>
        </div>
        <div>
             <ul className='flex space-x-10'>
                <li className={`cursor-pointer py-5 text-sm font-semibold text-gray-400 border-b-[4px] border-b-transparent ${
                pathMatchRoute("/") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/")}>Home</li>
                <li className={`cursor-pointer py-5 text-sm font-semibold text-gray-400 border-b-[4px] border-b-transparent ${
                pathMatchRoute("/flights") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/flights")}>Flights</li>
                <li className={`cursor-pointer py-5 text-sm font-semibold text-gray-400 border-b-[4px] border-b-transparent ${
                pathMatchRoute("/hotels") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/hotels")}>Hotels</li>
                <li className={`cursor-pointer py-5 text-sm font-semibold text-gray-400 border-b-[4px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/offers")}>Offers</li>
                <li className={`cursor-pointer py-5 text-sm font-semibold text-gray-400 border-b-[4px] border-b-transparent ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/profile")}>{pageState}</li>
             </ul>
        </div>
        </header>
    </div>
  )
}
