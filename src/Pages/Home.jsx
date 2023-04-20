 import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import Spinner from '../components/Spinner';
import { db } from '../firebase';
 
 export default function Home() {

   return (
     <div>
      <Slider/>
     </div>
   )
 }
 