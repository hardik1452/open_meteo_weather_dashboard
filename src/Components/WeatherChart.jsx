import { LineChart,Line, CartesianGrid, XAxis,YAxis,Tooltip, Legend,ResponsiveContainer } from "recharts"
import { Card, CardContent } from "./ui/card"

const WeatherChart = ({data}) => {
  return (
    <Card>
        <CardContent className="pt-2">
            <h2 className="text-xl font-semibold mb-6">Daily Temperature Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tempMax" stroke="#ef4444" name="Max Temp" />
                    <Line type="monotone" dataKey="tempMin" stroke="#3b82f6" name="Min Temp" />
                    <Line type="monotone" dataKey="tempMean" stroke="#10b981" name="Mean Temp" />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  )
}

export default WeatherChart