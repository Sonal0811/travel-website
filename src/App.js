import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignInStaff from "./Pages/SignInStaff";
import SignUp from "./Pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPass from "./Pages/ForgotPass";
import ForgotPassStaff from "./Pages/ForgotPassStaff";
import Offers from "./Pages/Offers";
import Header from "./components/Header";
import Hotels from "./Pages/Hotels";
import Flights from "./Pages/Flights";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateListingDestination from "./Pages/CreateListingDestination";
import CreateListingHotels from "./Pages/CreateListingHotels";
import CreateListingFlights from "./Pages/CreateListingFlights";
import EditListingDestination from "./Pages/EditListingDestination";
import EditListingFlights from "./Pages/EditListingFlights";
import EditListingHotels from "./Pages/EditListingHotels";
import DestinationDetail from "./Pages/DestinationDetail";
import Category from "./Pages/Category";
function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
           <Route path='/' element={<Home />}/>
           <Route path="/profile" element={<PrivateRoute/>}>
           <Route path='/profile' element={<Profile />}/>
           </Route>
           <Route path='/sign-in' element={<SignIn />}/>
           <Route path="/sign-in-staff" element={<SignInStaff />}/>
           <Route path='/sign-up' element={<SignUp />}/>
           <Route path='/forgot-Password' element={<ForgotPass />}/>
           <Route path="/forgot-password-staff" element={<ForgotPassStaff />}/>
           <Route path='/offers' element={<Offers />}/>
           <Route path='/category/:categoryName' element={<Category />}/>
           <Route path='/category/:categoryName/:listingID' element={<DestinationDetail />}/>
           <Route path='/flights' element={<Flights />}/>
           <Route path='/hotels' element={<Hotels />}/>
           <Route path="/create-listing-destination" element={<PrivateRoute/>}>
           <Route path='/create-listing-destination' element={<CreateListingDestination/>}/>
           </Route>
           <Route path="/create-listing-hotels" element={<PrivateRoute/>}>
           <Route path='/create-listing-hotels' element={<CreateListingHotels />}/>
           </Route>
           <Route path="/create-listing-flights" element={<PrivateRoute/>}>
           <Route path='/create-listing-flights' element={<CreateListingFlights />}/>
           </Route>
           <Route path="/edit-listing-destination" element={<PrivateRoute/>}>
           <Route path='/edit-listing-destination/:listingID' element={<EditListingDestination/>}/>
           </Route>
           <Route path="/edit-listing-hotels" element={<PrivateRoute/>}>
           <Route path='/edit-listing-hotels' element={<EditListingFlights />}/>
           </Route>
           <Route path="/edit-listing-flights" element={<PrivateRoute/>}>
           <Route path='/edit-listing-flights' element={<EditListingHotels />}/>
           </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
 

// hello