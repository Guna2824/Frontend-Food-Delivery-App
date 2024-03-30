import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function FoodOrder() {
  const navigate = useNavigate();
  const [getAllData, setGetAllData] = useState();
  const [result, setResult] = useState(null);
  const [data, setData] = useState({
    dish: "",
    count: "",
    city: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      "https://backend-food-delivery-app.onrender.com/api/getdata"
    );
    setGetAllData(response.data);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!data.dish || data.dish === "Select Dish") {
      toast.error("Please Select Dish");
    } else if (data.count < 1) {
      toast.error("minimum order 1 no");
    } else if (data.city === "Select Zone" || data.city === "") {
      toast.error("Please Select Zone");
    } else {
      try {
        const response = await axios.post(
          "https://backend-food-delivery-app.onrender.com/api/orderfood",
          data
        );
        setResult(response.data);

        toast.success("Order Placed Successfully");
        setData({
          dish: "",
          count: "",
          city: "",
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="h-auto mt-[20%] xs:mt-[10%] md:mt-[8%] lg:mt-[5%] ">
      <div className=" h-[10vh] my-[3%] flex flex-row justify-evenly items-center ">
        <button
          onClick={() => navigate("/addfood")}
          className="block border px-4 py-1.5 text-white font-semibold bg-gradient-to-r from-lime-400 to-yellow-400 rounded-md shadow-xl "
        >
          ADD FOOD
        </button>

        <button
          onClick={() => navigate("/")}
          className="block border px-4 py-1.5 text-white font-semibold bg-gradient-to-l from-lime-400 to-yellow-400 rounded-md shadow-xl "
        >
          DASHBOARD
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={submit}
          className="h-[65vh] lg:h-[50vh] sm:w-[60vh]  mb-[2%] bg-gradient-to-b from-orange-500 to-yellow-500 flex flex-col justify-center items-center gap-6 border"
        >
          <h2 className="  text-[18px] font-semibold text-white">
            Select and Order Food
          </h2>
          <select
            name="dish"
            onChange={handleChange}
            value={data.dish}
            className="w-[75%] p-2 text-[16px] rounded-md font-semibold outline-none "
          >
            <option>Select Dish</option>
            {getAllData &&
              getAllData.map((item) => {
                return <option key={item._id}>{item.dish}</option>;
              })}
          </select>
          <input
            className=" w-[75%] p-2 pl-4 text-[16px] rounded-md font-semibold outline-none  "
            type="number"
            name="count"
            value={data.count}
            placeholder="Enter Qty"
            onChange={handleChange}
          />
          <select
            name="city"
            value={data.city}
            onChange={handleChange}
            className="w-[75%] p-2 text-[16px] rounded-md font-semibold outline-none "
          >
            <option>Select Zone</option>
            <option value={"center"}>Center</option>
            <option value={"north"}>North</option>
            <option value={"east"}>East</option>
            <option value={"west"}>West</option>
            <option value={"south"}>South</option>
          </select>
          <button
            type="submit"
            className="px-4 py-1.5 text-white font-semibold bg-green-500 hover:bg-green-700 rounded-md border w-[50%] "
          >
            ORDER
          </button>
        </form>

        <div className="mb-[5%] mt-[2%]  ">
          {result &&
            result.map((item) => {
              return (
                <table
                  key={item.dish}
                  className="sm:w-[300px] w-[40vh] text-center border "
                >
                  <caption className="text-[18px] font-semibold text-white bg-red-500 p-2 animate-bounce">
                    Food App Price Breakup Detail
                  </caption>
                  <tbody>
                    <tr>
                      <td>dish</td>
                      <th>{item.dish}</th>
                    </tr>
                    <tr>
                      <td>foodType</td>
                      <th>{item.type}</th>
                    </tr>
                    <tr>
                      <td>unit</td>
                      <th>{item.unit}</th>
                    </tr>
                    <tr>
                      <td>zone</td>
                      <th>{item.zone}</th>
                    </tr>
                    <tr>
                      <td>dishPrice</td>
                      <th>{item.unitPrice}</th>
                    </tr>
                    <tr>
                      <td>Quentity</td>
                      <th>{item.count}</th>
                    </tr>
                    <tr>
                      <td>typePrice</td>
                      <th>{item.typePrice}</th>
                    </tr>
                    <tr>
                      <td>base 5Km Price</td>
                      <th>{item.baseKmPrice}</th>
                    </tr>
                    <tr>
                      <td>zonePrice</td>
                      <th>{item.kmPrice}</th>
                    </tr>
                    <tr className="text-[20px] font-semibold text-white bg-green-500 hover:bg-blue-700 ">
                      <td className="p-2">TotalPrice</td>
                      <th>{item.total}</th>
                    </tr>
                  </tbody>
                </table>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default FoodOrder;
