import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function FoodAdd() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    dish: "",
    type: "",
    unit: "",
    unitPrice: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.dish || data.dish === "") {
      toast.error("Please enter dish name");
    } else if (data.type === "Select Type" || data.type === "") {
      toast.error("Please select dish type");
    } else if (data.unit === "Select Unit" || data.unit === "") {
      toast.error("Please select unit");
    } else if (!data.unitPrice || data.unitPrice === "") {
      toast.error("Please enter unit price");
    } else {
      try {
        await axios.put(
          "https://backend-food-delivery-app.onrender.com/api/additem",
          data
        );
        toast.success("FoodItem Add Successfully");
        setData({
          dish: "",
          type: "",
          unit: "",
          unitPrice: "",
        });
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="h-auto">
      <div className=" h-[10vh] my-[1%] flex flex-row justify-around items-center ">
        <button
          onClick={() => navigate("/")}
          className="block border px-4 py-1.5 text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-md shadow-xl "
        >
          DASHBOARD
        </button>

        <button
          onClick={() => navigate("/orderfood")}
          className="block border px-4 py-1.5 text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-md shadow-xl "
        >
          ORDER FOOD
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="border h-[60vh] w-[50vh] flex flex-col gap-5 justify-center items-center bg-violet-400 "
        >
          <h2 className="  text-[18px] font-semibold text-white">
            Add New Food Menu
          </h2>
          <input
            type="text"
            name="dish"
            onChange={handleChange}
            value={data.dish}
            className=" w-[75%] p-2 pl-4 text-[16px] rounded-md font-semibold outline-none  "
            placeholder="Enter dish name"
          />
          <select
            name="type"
            onChange={handleChange}
            value={data.type}
            className="w-[75%] p-2 text-[16px] rounded-md font-semibold outline-none "
          >
            <option>Select Type</option>
            <option>persihable</option>
            <option>non-persihable</option>
          </select>

          <select
            name="unit"
            onChange={handleChange}
            value={data.unit}
            className="w-[75%] p-2 text-[16px] rounded-md font-semibold outline-none "
          >
            <option>Select Unit</option>
            <option>Nos</option>
            <option>Kg</option>
            <option>Ltr</option>
          </select>
          <input
            type="text"
            name="unitPrice"
            onChange={handleChange}
            value={data.unitPrice}
            className=" w-[75%] p-2 pl-4 text-[16px] rounded-md font-semibold outline-none  "
            placeholder="Enter unit price"
          />
          <button
            type="submit"
            className="block border px-4 py-1.5 text-white font-semibold bg-green-500 hover:bg-green-700 rounded-md shadow-xl "
          >
            ADD FOOD
          </button>
        </form>
      </div>
    </div>
  );
}

export default FoodAdd;
