import { getAuth, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { db } from '../firebase';
import { doc, updateDoc, } from 'firebase/firestore';
import { FaEdit } from "react-icons/fa";
export default function Profileuser() {
    const [changeDetail, setChangeDetail] = useState(false)
    const navigate = useNavigate();
    const auth = getAuth()
    const[FormData, setFormData]= useState({

        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        phoneNo :"",
        birthday: "",
        martial:"",
        gender: "",

      
    });
    const {name, email,phoneNo ,birthday,martial,gender} = FormData;
    function onLogout(){
       auth.signOut() 
      navigate("/");
    }
    async function onSubmit(){
        try{
          if(auth.currentUser.displayName !== name || phoneNo !== "" || birthday !== "" || martial !== "" || gender !== ""){
              //update display name in Firebase auth
              await updateProfile(auth.currentUser, {
                  displayName: name,
              });
              //update name in the Firestore
              const docRef = doc(db, "users", auth.currentUser.uid)
              await updateDoc(docRef, {
                  name,
                  phoneNo,
                  birthday,
                  martial,
                  gender
              });
          }
          toast.success('Profile details updated')
        } catch(error){
          toast.error("Could not update the profile details")
        }
      }
      function onChange(e){
        setFormData((prevState) =>({
         ...prevState,
         [e.target.id]: e.target.value,
        }));
     }
  return (
    <section className='max-w-6xl mx-auto flex justify-center flex-col '>
       <h1 className='text-3xl text-center mt-6 font-bold text-sky-800'>Hi {name}</h1>
       <div className='max-w-8xl mx-12 flex justify-between flex-row'>
       <div className='w-full md:w-[35%] mt-6 px-3 flex-row justify-center rounded-[2%] py-8'>
        <div className='flex justify-center'>
            <img src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=612x612&w=0&h=NGxdexflb9EyQchqjQP0m6wYucJBYLfu46KCLNMHZYM=
            " alt="profile-pic" className=' border-4 border-gray-300 rounded-[50%] md:w-[50%] mt-6 px-3 bg-white'/>
        </div>
        <div className='flex justify-center'>
        <button className='mt-6 w-[60%] bg-blue-500 text-white
        uppercase px-5 py-3 text-xs font-medium rounded shadow-md hover:bg-blue-700 cursor-pointer
        transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>Edit profile picture</button>
        </div>
        <div className='flex flex-row justify-center'>
        <button  onClick={onLogout} className='mt-6 w-[60%] bg-blue-500 text-white
        uppercase px-5 py-3 text-xs font-medium rounded shadow-md hover:bg-blue-700 cursor-pointer
        transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>Logout</button>
        </div>
       </div>
    <div className='w-full md:w-[50%] mt-6 px-3 justify-center '>
        <div> <p>Name<span className='text-red-600'>*</span></p>
        <input type="text" id="name" value={name} disabled={!changeDetail}
            onChange={onChange} className={`mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white 
            border border-gray-300 rounded transition ease-in-out ${changeDetail && "border-2 border-red-600 bg-red-200 focus:border-red-600"}`}></input>
          </div>
           <div className='flex-col'> <p>Email<span className='text-red-600'>*</span></p><input type="email" value={email} disabled 
            className='mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white 
            border border-gray-300 rounded transition ease-in-out'/></div>
           <div> <p>Password</p> <input type="password" value="password" className='mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white 
            border border-gray-300 rounded transition ease-in-out' /></div>
           <div> <p>Phone Number</p><input type="number" id="phoneNo" value={phoneNo} 
            onChange={onChange} className='mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white 
            border border-gray-300 rounded transition ease-in-out' placeholder='Phone number'/> </div>
           <div> <p>Gender</p>
           <select id="gender" value={gender} 
            onChange={onChange} className='mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white 
            border border-gray-300 rounded transition ease-in-out' placeholder='Married or Single'>
                 <option value=""></option>
                 <option value="female">Female</option>
                 <option value="male">Male</option>
            </select> </div>
            <div> <p> Birthday</p>
            <input type="date" id="birthday" value={birthday}
            onChange={onChange} className='mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white 
            border border-gray-300 rounded transition ease-in-out'/>
            </div>
            <div>
                <p>Marital Status</p>
            </div>
            <select id="martial" value={martial} 
            onChange={onChange} className='mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white 
            border border-gray-300 rounded transition ease-in-out' placeholder='Married or Single'>
                 <option value=""></option>
                 <option value="married">Married</option>
                 <option value="single">Single</option>
            </select>




            {/* <select mode="multiple" style={{ width: 120 }}>
    <Select.Option value="jack">Jack</Select.Option>
    <Select.Option value="lucy">Lucy</Select.Option>
    <Select.Option value="disabled" disabled>
      Disabled
    </Select.Option>
    <Select.Option value="Yiminghe">yiminghe</Select.Option>
  </select> */}
            {/* <input list="brow"> */}
{/* <datalist id="brow">
  <option value="Internet Explorer" />
  <option value="Firefox" />
  <option value="Chrome"/>
  <option value="Opera" />
  <option value="Safari" />
</datalist>   */}
{/* </input> */}
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
            <p onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState)
                } }className='md:w-[40%] flex bg-blue-500 px-2 py-2 border-2 border-blue-600 rounded text-white hover:text-white hover:bg-blue-800
                transition ease-in-out duration-200 cursor-pointer'><FaEdit className="text-2xl"/> {changeDetail ? "Apply change" : "Edit profile details"} </p>
              <p onClick={() => {
                    onSubmit();
                    setChangeDetail((prevState) => !prevState)
                } } className='md:w-[40%] flex bg-blue-500 py-2 text-white justify-center hover:text-white hover:bg-blue-600
                transition duration-200 ease-in-out cursor-pointer px-2 border-2 border-blue-600 rounded'><b className='text-xl'>+ </b> Add Details</p>
            </div>
        </div>
        </div>
        </section>
  )
}
