import { useState } from "react";
import WeatherChart from "./WeatherChart";
import WeatherTable from "./WeatherTable";
const ViewTabs = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState("chart");
  return (
    <>
      <div className="flex flex-row mt-2 mb-1 bg-[#e8eaec] px-1 py-1 w-fit rounded-md text-gray-500 cursor-pointer">
        <div
          className={`px-12 py-2 ${
            selectedTab === "chart" ? "bg-white rounded-md text-gray-900" : null
          }`}
          onClick={() => setSelectedTab("chart")}
        >
          <span className="font-semibold">CHART</span>
        </div>
        <div
          className={`px-12 py-2 ${
            selectedTab === "table" ? "bg-white rounded-md text-gray-900" : null
          }`}
          onClick={() => setSelectedTab("table")}
        >
          <span className="font-semibold">TABLE</span>
        </div>
      </div>
      {/* View Area based on tab selection */}
      <div className="w-full h-fit justify-center items-center">
        {selectedTab === "chart" ? (
          <WeatherChart data={data} />
        ) : (
          <WeatherTable data={data}/>
        )}
      </div>
    </>
  );
};

export default ViewTabs;
