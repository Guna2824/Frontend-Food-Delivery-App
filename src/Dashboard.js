import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [searchDish, setSearchDish] = useState("");

  useEffect(() => {
    getData();
  }, [navigate]);

  const getData = async () => {
    const response = await axios.get(
      "https://backend-food-delivery-app.onrender.com/api/getdata"
    );
    setData(response.data);
  };

  const filterData =
    data && data.filter((item) => item.dish.includes(searchDish));

  return (
    <div className="h-auto my-[3%] ">
      <div className=" h-[10vh] my-[3%] flex flex-row justify-around items-center ">
        <button
          onClick={() => navigate("/addfood")}
          className="block border px-4 py-1.5 text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-md shadow-xl "
        >
          ADD FOOD
        </button>
        <input
          onChange={(e) => setSearchDish(e.target.value)}
          className="block py-1.5 pl-6 text-[18px] md:w-[500px] text-gray-700 font-semibold outline-none border rounded-[25px] "
          placeholder="search food"
        />
        <button
          onClick={() => navigate("/orderfood")}
          className="block border px-4 py-1.5 text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-md shadow-xl "
        >
          ORDER FOOD
        </button>
      </div>
      <div className="h-[50vh] mx-[10%] py-[10px] grid grid-cols-2 gap-4 md:grid-cols-5 text-center overflow-y-auto ">
        {data ? (
          filterData.map((item) => {
            return (
              <div
                key={item._id}
                className="h-[140px] w-[190px] text-white font-semibold border bg-gradient-to-t from-purple-400 to-pink-400 p-4 rounded-md shadow-xl"
              >
                <p className="text-[22px] font-bold text-gray-800">
                  {item.dish}
                </p>
                <p>Type: {item.type}</p>
                <p>Unit: {item.unit}</p>
                <p>Unit Price: {item.unitPrice}</p>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
