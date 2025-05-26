const LabelledInput = ({
  type,
  label,
  name,
  onChange,
  value,
  placeholder,
  isError,
  min,
  max,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black-[#262628]"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
      />
      {isError && <span className="text-red-500 text-sm mt-1">{isError}</span>}
    </div>
  );
};

export default LabelledInput;
