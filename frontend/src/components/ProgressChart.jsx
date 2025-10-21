import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function ProgressChart({ data }) {
    if (!data || data.length === 0) {
        return <p>No data available for this exercise.</p>
    }
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 50, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#333" }}
                    tickLine={false}
                    axisLine={false}
                    height={10}
                    dy={8}
                    tickFormatter={(str) => {
                        const date = new Date(str);
                        return date.toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit"
                        });
                    }}
                />
                <YAxis
                    tick={{ fontSize: 12, fill: "#333" }}
                    tickLine={false}
                    axisLine={false}
                    domain={['auto', (dataMax) => dataMax + 1]}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#303030"
                    strokeWidth={1}
                    dot={{ r: 4, stroke: "#303030", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}