import { useState } from "react";
import axios from "axios";
import Button from "./Button";
import LabelledInput from "./LabelledInput";
import DatePickerInput from "./DatePickerInput";

const Dashboard = ({ onSubmitData }) => {
  const today = new Date();
  const [formData, setFormData] = useState({
    latitude: "28.644800",
    longitude: "77.216721",
    endDate: today,
    startDate: new Date(new Date().setMonth(today.getMonth() - 1)),
  });
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const onInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onDateChange = (date, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const formValidation = () => {
    const newErrors = {};
    const { latitude, longitude, startDate, endDate } = formData;

    if (!latitude || isNaN(latitude) || latitude < -90 || latitude > 90) {
      newErrors.latitude = "Must be under -90 to 90";
    }
    if (!longitude || isNaN(longitude) || longitude < -180 || longitude > 180) {
      newErrors.longitude = "Must be under -180 to 180";
    }
    if (!startDate || startDate > new Date()) {
      newErrors.startDate = "Start date must be before today";
    }
    if (!endDate || endDate > new Date()) {
      newErrors.endDate = "End date must be before today";
    }
    if (startDate && endDate && startDate > endDate) {
      newErrors.startDate = "Start date must be before end date";
      newErrors.endDate = "End date must be after start date";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    setLoading(true);
    if (!formValidation()) {
      setLoading(false);
      return;
    }

    const { latitude, longitude, startDate, endDate } = formData;
    const newStartDate = startDate.toISOString().split("T")[0];
    const newEndDate = endDate.toISOString().split("T")[0];
    const apiURL = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${newStartDate}&end_date=${newEndDate}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean&timezone=auto`;
    try {
      const data = await axios.get(apiURL);
      onSubmitData(data.data.daily, formData);
    } catch (error) {
      console.error("Error while fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 border-solid border-2 border-slate-200 px-12 py-6 rounded-xl space-y-2">
      <h2 className="text-2xl font-bold">Weather parameters</h2>
      <span className="mb-8 text-muted-foreground">
        Enter location coordinates and date range to fetch historical weather
        data.
      </span>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-2">
        {/* Form parameters */}
        <LabelledInput
          type="number"
          value={formData.latitude}
          label="Latitude"
          name="latitude"
          min={-90}
          max={90}
          placeholder="Enter Latitude"
          onChange={onInputChange}
          isError={errors.latitude}
        />
        <LabelledInput
          type="number"
          value={formData.longitude}
          label="Longitude"
          name="longitude"
          placeholder="Enter Longitude"
          min={-180}
          max={180}
          onChange={onInputChange}
          isError={errors.longitude}
        />
        <DatePickerInput
          label="Start Date"
          placeholder="Enter start date"
          value={formData.startDate}
          onChange={(date) => onDateChange(date, "startDate")}
          isError={errors.startDate}
        />
        <DatePickerInput
          label="End Date"
          onChange={(date) => onDateChange(date, "endDate")}
          placeholder="Enter end date"
          value={formData.endDate}
          isError={errors.endDate}
        />
      </div>
      <Button
        className="bg-black text-white hover:bg-[#262628] disabled:opacity-50"
        text={loading ? "Fetching weather data..." : "Fetch Weather Data"}
        disabled={loading}
        onClick={onSubmit}
      />
    </div>
  );
};

export default Dashboard;
