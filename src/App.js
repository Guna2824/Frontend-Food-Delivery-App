import React from "react";
import { Routes, Route } from "react-router-dom";

import FoodOrder from "./FoodOrder";
import Dashboard from "./Dashboard";
import FoodAdd from "./FoodAdd";

function App() {
  return (
    <div>
      <h1 className="p-2 mt-[3%] text-[25px] font-bold text-gray-700 text-center ">
        Food Delivery App
      </h1>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orderfood" element={<FoodOrder />} />
        <Route path="/addfood" element={<FoodAdd />} />
      </Routes>
    </div>
  );
}

export default App;
