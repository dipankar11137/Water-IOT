import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";
import Text from "./Text/Text";

const Home = () => {
  const [user] = useAuthState(auth);
   const logout = () => {
     signOut(auth);
   };
  return (
    <div className="bg-slate-900 text-white h-screen">
      <div className="flex justify-between items-center px-20 pt-5">
        <Text/>
        <div>
          {user ? (
            <button className=" font-bold text-orange-500" onClick={logout}>
              Sign Out
            </button>
          ) : (
            <Link className="text-xl" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
