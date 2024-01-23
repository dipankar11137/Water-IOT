import React from 'react';
import './text.css';

const Text = () => {
  return (
    <div className="flex justify-center cursor-pointer">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center flex gap-x-3 text-5xl  pb-4">
            <h3 class="animate-character font-extrabold ">Sustainable</h3>
            <h3 class="animate-character2 font-extrabold ">Water</h3>
            <h3 class="animate-character font-extrabold ">Solutions</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;