import { useState } from "react";
import WeatherChart from "./WeatherChart";
import WeatherTable from "./WeatherTable";
const ViewTabs = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState("chart");
  return (
    <>
      <div className="flex w-full flex-wrap mt-2 mb-3 justify-center gap-2 sm:max-w-sm rounded-md bg-[#e8eaec] p-1 text-gray-500">
        <div
          className={`flex-1 min-w-[100px] text-center px-4 py-2 text-sm font-semibold rounded-md transition ${
            selectedTab === "chart" ? "bg-white rounded-md text-gray-900" : ""
          }`}
          onClick={() => setSelectedTab("chart")}
        >
          <span className="font-semibold">CHART</span>
        </div>
        <div
          className={`flex-1 min-w-[100px] text-center px-4 py-2 text-sm font-semibold rounded-md transition ${
            selectedTab === "table" ? "bg-white rounded-md text-gray-900" : ""
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
          <WeatherTable data={data} />
        )}
      </div>
    </>
  );
};

export default ViewTabs;
