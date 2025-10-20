import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function ProgressChart({ data }) {
    if (!data || data.length === 0) {
        return <p>No data available for this exercise.</p>
    }
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
                <CartesianGrid />
                <XAxis dataKey="date" />
                <YAxis dataKey="weight" />
                <Tooltip />
                <Line
                    dataKey="weight"
                    stroke="black"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}