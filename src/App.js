import React from "react";
import { Routes, Route } from "react-router-dom";

import FoodOrder from "./FoodOrder";
import Dashboard from "./Dashboard";
import FoodAdd from "./FoodAdd";

function App() {
  return (
    <div>
      <div>
        <h1 className=" text-center p-2 mt-[1%] text-[25px] font-bold text-gray-700 ">
          Food Delivery App
        </h1>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orderfood" element={<FoodOrder />} />
        <Route path="/addfood" element={<FoodAdd />} />
      </Routes>
    </div>
  );
}

export default App;
