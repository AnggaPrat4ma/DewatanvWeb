/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";


// import MainLayout from "./Main";
import SignIn from "../../pages/signin";

const PrivateRoute = ({ component }) => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log("PrivateRoute -> isLoggedIn", isLoggedIn);

  if (isLoggedIn) {
    // Redirect to login page or any other public route
    return component;
  }
  // return <Navigate to="/login" replace />;
  return <SignIn />;

  // Render the child component or outlet
};

export default PrivateRoute;
