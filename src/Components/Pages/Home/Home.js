import { signOut } from "firebase/auth";
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaBatteryFull, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import ImportExcel from './ImportExcel/ImportExcel';
import Text from './Text/Text';

const Home = () => {
  const [user] = useAuthState(auth);
  const [ph, setPh] = useState(null);
  const [battery, setBattery] = useState(null);

  const logout = () => {
    signOut(auth);
  };
  return (
    <div className="bg-slate-900 text-white ">
      <div className="flex justify-between items-center px-20 pt-5 border-b-[1px] border-cyan-700">
        <Text />
        <div className="flex gap-x-6 items-center">
          <div className="flex gap-x-2 items-center">
            <FaBatteryFull className="text-4xl text-yellow-500" />
            <h1>100%</h1>
          </div>
          {user ? (
            <button
              className=" font-bold  flex gap-2 items-center"
              onClick={logout}
            >
              <FaUser className="text-yellow-500" /> Sign Out
            </button>
          ) : (
            <Link className="text-xl flex gap-2 items-center" to="/login">
              <FaUser className="text-yellow-500" /> Login
            </Link>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-5 ">
        <div className="border-[1px] border-slate-300 py-10 px-16 rounded-lg">
          <h1 className="text-4xl font-semibold">
            Ph value : {ph} {battery}
          </h1>
          <h1 className="mt-10 text-2xl">We Eat this</h1>
        </div>
      </div>
      <ImportExcel ph={ph} setPh={setPh} setBattery={setBattery} />
      {/* <ImportTest setPh={setPh} setBattery={setBattery} /> */}
    </div>
  );
};

export default Home;
