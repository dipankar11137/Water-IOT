import { signOut } from "firebase/auth";
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  FaAngleDoubleRight,
  FaBatteryFull,
  FaSave,
  FaUser,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth from '../../../firebase.init';
import SaveDatas from '../SaveData/SaveDatas';
import ImportExcel from './ImportExcel/ImportExcel';
import Text from './Text/Text';

const Home = () => {
  const [user] = useAuthState(auth);
  const [ph, setPh] = useState('');
  const [table, setTable] = useState(false);
  const [battery, setBattery] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const [voltage, setVoltage] = useState('');
  const logout = () => {
    signOut(auth);
  };
  const data = { ph };

  const phV = parseFloat(data?.ph);
  // console.log(phV);

  const currentDate = new Date();

  // Get individual components of the date and time
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const day = currentDate.getDate();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  let hours = currentDate.getHours();

  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const time = `${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }:${seconds < 10 ? '0' + seconds : seconds} ${amPm}`;

  const date = `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`;

  const handleClick = () => {
    const updateData = {
      name,
      address,
      ph: phV,
      battery,
      voltage,
      date,
      time,
    };
    console.log(updateData);
    Swal.fire({
      icon: 'success',
      title: 'Saved in Dataset',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="  pb-44">
      <div className=" bg-blue-800 flex justify-between items-center px-20 pt-5 text-white border-b-[1px] border-cyan-700">
        <div onClick={() => setTable(true)}>
          <Text />
        </div>

        <div className="flex gap-x-6 items-center">
          <div className="flex gap-x-2 items-center">
            <FaBatteryFull className="text-4xl text-yellow-400" />
            <h1>{battery}</h1>
          </div>
          {user ? (
            <button
              className=" font-bold  flex gap-2 items-center"
              onClick={logout}
            >
              <FaUser className="text-yellow-400" /> Sign Out
            </button>
          ) : (
            <Link className="text-xl flex gap-2 items-center" to="/login">
              <FaUser className="text-yellow-400" /> Login
            </Link>
          )}
        </div>
      </div>

      {table ? (
        <div>
          {/* save data modal */}
          <div className="fixed right-0 mr-10 mt-0">
            <label
              htmlFor="my_modal_6"
              className="btn btn-secondary text-white font-semibold"
            >
              Save Data
              <FaSave className="ml-2 text-orange-100" />
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box w-[450px]">
                <div>
                  <h1 className="text-3xl font-semibold">
                    Enter Dataset Name :
                  </h1>
                  <input
                    onChange={e => setName(e.target.value)}
                    className="text border-[1px] border-black rounded-md py-2 pl-2 w-full mt-4"
                    placeholder="Dataset Name"
                    type="text"
                  />
                  <h1 className="text-3xl mt-3 font-semibold">
                    Enter Address :
                  </h1>
                  <input
                    onChange={e => setAddress(e.target.value)}
                    className="text border-[1px] border-black rounded-md py-2 pl-2 w-full mt-4"
                    placeholder="Enter Address"
                    type="text"
                  />
                </div>
                <div className="modal-action">
                  {name === '' || address === '' ? (
                    <label
                      htmlFor="my_modal_6"
                      className="btn btn-primary text-white w-full"
                    >
                      Closed
                    </label>
                  ) : (
                    <label
                      onClick={handleClick}
                      htmlFor="my_modal_6"
                      className="btn btn-secondary text-white w-full"
                    >
                      Saved
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* <div class="grid grid-rows-3 grid-flow-col gap-4 mx-32 mt-14"> */}
          <div class="mx-32 mt-14">
            <div class=" col-span-2">
              <div className="border-[1px] shadow-md shadow-blue-300 p-5 w-[450px] rounded-md flex items-center gap-x-10">
                <h1 className="text-4xl font-semibold text-center">
                  Average Ph value :{' '}
                </h1>
                <p className=" text-4xl text-center font-semibold text-orange-500">
                  {ph}
                </p>
              </div>
            </div>
            <div class="col-span-2 mt-5">
              <div className="border-[1px] shadow-md shadow-blue-300 p-5 w-[450px] rounded-md flex gap-x-10">
                <h1 className="text-4xl font-semibold text-center">
                  Voltage :{' '}
                </h1>
                <p className=" text-4xl text-center font-semibold text-orange-500">
                  {voltage}
                </p>
              </div>
            </div>
            <div class="col-span-2 mt-5">
              <div className="border-[1px] shadow-md shadow-blue-300 p-5 w-[450px] rounded-md flex gap-x-10">
                <h1 className="text-4xl font-semibold text-center">
                  Buttery :{' '}
                </h1>
                <p className=" text-4xl text-center font-semibold text-orange-500">
                  {battery}
                </p>
              </div>
            </div>
            <div class="row-span-3 ...">
              {' '}
              <div className="flex items-center gap-10 mt-5 ">
                <div className="border-[1px] shadow-md  shadow-blue-300 p-5 w-[450px] rounded-md flex items-center gap-x-5 text-4xl font-semibold  mr-2 ">
                  <h1> Result :</h1>
                  <p>The Water is </p>
                </div>
                <FaAngleDoubleRight className="text-5xl" />
                <div className="  ">
                  {phV >= 0 && phV <= 7.5 ? (
                    <>
                      {phV >= 0 && phV <= 6.5 ? (
                        <div className="border-[1px] border-slate-300 py-8 px-10 rounded-lg bg-red-600 ">
                          <div className="bg-red-600 w-[250px] text-white h-[20px] flex justify-center gap-4 items-center rounded-xl text-5xl font-semibold">
                            <h1>Acid</h1>
                            <img
                              className="h-20  w-20"
                              src="https://media2.giphy.com/media/jTfmBts5vvjK651km0/giphy.gif"
                              alt="acid"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="border-[1px] border-slate-300 py-10 px-5 text-white rounded-lg bg-green-600">
                          <div className="bg-green-600 w-[440px] h-[20px] flex justify-center items-center rounded-xl text-5xl gap-x-4 font-bold">
                            <h1>Ready to Drink</h1>
                            <img
                              className="h-20 rounded-full w-20"
                              src="https://clipart-library.com/image_gallery/n988621.gif"
                              alt="drink"
                            />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="border-[1px] bg-purple-800 text-white border-slate-300 py-10 px-16 rounded-lg">
                      <div className="bg-purple-800 w-[300px] h-[20px] flex justify-center items-center rounded-xl text-5xl font-bold">
                        <h1>Alkaline</h1>
                      </div>
                    </div>
                  )}
                </div>{' '}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <SaveDatas />
        </div>
      )}

      <ImportExcel
        ph={ph}
        setPh={setPh}
        setBattery={setBattery}
        setVoltage={setVoltage}
      />
    </div>
  );
};

export default Home;
