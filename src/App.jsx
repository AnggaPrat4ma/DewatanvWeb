import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import NoPage from "./pages/NoPage";
import PlacesRoute from "./pages/PlacesRoute";
import About from "./pages/About";
import BlogsDetails from "./pages/BlogsDetails";
import AOS from "aos";
import "aos/dist/aos.css";
import Culinary from "./pages/Culinary";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import CrudPage from "./pages/CRUD_w";
import WisataCRUD from "./pages/CRUD_w";
import Admin from "./pages/admin";
import BeritaCRUD from "./pages/Berita";
import TravelCRUD from "./pages/Travel";
import Berita from "./components/Places/Places";
import DetailBerita from "./components/Places/detailBerita";
import AuthProvider from "./providers/AuthProvider";
import DetailTravel from "./components/Culinary/DetailTravel";
import JenisCRUD from "./pages/price";
import PrivateRoute from "./components/Layout/PrivateRoute";
import ProfileCard from "./pages/Profile";
import ACCbooking from "./pages/ACC";
import FormOrders from "./pages/ACC";
// import BlogCardDetail from "./components/Places/PlaceCard";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blogs/:id" element={<BlogsDetails />} />
              <Route path="berita" element={<PlacesRoute />} />
              <Route path="about" element={<About />} />
              <Route path="travel" element={<PrivateRoute component={<Culinary/>} />} />
              <Route path="lokasi" element={<Location />} />
              <Route path="berita/:id" element={<DetailBerita />} />
              <Route path="travel/:id" element={<DetailTravel />} />
              <Route path="profile" element={<ProfileCard />} />
              <Route path="*" element={<NoPage />} />
            </Route>
            <Route path="/admin" element={<Admin />} />
            <Route path="login" element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
            <Route path="wisataCRUD" element={<WisataCRUD />} />
            <Route path="travelCRUD" element={<TravelCRUD />} />
            <Route path="beritaCRUD" element={<BeritaCRUD />} />
            <Route path="jenis" element={<JenisCRUD/>}/>
            <Route path="accbooking" element={<FormOrders/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
