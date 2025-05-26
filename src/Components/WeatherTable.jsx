import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Button from "./Button";

const WeatherTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowperPage, setRowsperPage] = useState(10);

  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / rowperPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowperPage;
    const end = start + rowperPage;
    return data.slice(start, end);
  }, [data, currentPage, rowperPage]);

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold mb-6">
          Daily Temperature Table Overview
        </h3>
        <Select
          value={rowperPage.toString()}
          onValueChange={(val) => {
            setRowsperPage(parseInt(val));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Rows per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Max Temp (°C)</TableHead>
            <TableHead>Min Temp (°C)</TableHead>
            <TableHead>Mean Temp (°C)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((day, index) => (
            <TableRow key={index}>
              <TableCell>{day.date}</TableCell>
              <TableCell>{day.tempMax}</TableCell>
              <TableCell>{day.tempMin}</TableCell>
              <TableCell>{day.tempMean}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center pt-4">
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex">
          <div className="space-x-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border rounded-md disabled:opacity-50 bg-black text-white"
              text="Prev"
            />
          </div>
          <div className="space-x-2">
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="border rounded-md disabled:opacity-50 bg-black text-white"
              text="Next"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherTable;
