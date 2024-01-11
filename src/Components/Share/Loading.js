import React from 'react';
import { PacmanLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      {/* <button className="btn btn-square loading  "></button> */}
      <PacmanLoader color="#E00813" />
    </div>
  );
};

export default Loading;
