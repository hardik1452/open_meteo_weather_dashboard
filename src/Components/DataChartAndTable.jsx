import { format } from "date-fns";
import ViewTabs from "./ViewTabs";
const DataChartAndTable = ({ data, weatherParams }) => {
  const { latitude, longitude, startDate, endDate } = weatherParams;
  return (
    <div className="mt-4 border-solid border-2 border-slate-200 px-12 py-6 rounded-xl space-y-2">
      <h2 className="text-2xl font-bold">Weather Data Visualization</h2>
      <span className="mb-8 text-muted-foreground">
        Historical weather data for {latitude}, {longitude} from{" "}
        {format(startDate, "PPP")} to {format(endDate, "PPP")}
      </span>
      <ViewTabs data={data}/>
    </div>
  );
};

export default DataChartAndTable;
