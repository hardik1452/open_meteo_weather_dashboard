import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerInput = ({ label, onChange, value, placeholder, isError }) => {
  return (
    <div className="flex flex-col w-full hover:cursor-pointer">
      <label className="mb-1 text-sm font-semibold text-gray-700">
        {label}
      </label>
      <DatePicker
        className="px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-black-[#262628]"
        onChange={onChange}
        selected={value}
        placeholderText={placeholder}
        popperPlacement="bottom-start"
        dateFormat='MMMM d, yyyy'
      />
      {isError && <span className="text-red-500 text-sm mt-1">{isError}</span>}
    </div>
  );
};

export default DatePickerInput;
