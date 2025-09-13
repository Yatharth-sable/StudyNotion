import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#38BDF8", "#D946EF", "#FACC15", "#22C55E", "#F97316"];

const InstructorChart = ({ courses }) => {
  const [activeTab, setActiveTab] = useState("students");

  const chartData = courses.map((course) => ({
    name:
      course.courseName.length > 20
        ? course.courseName.substring(0, 20) + "..."
        : course.courseName,
    value:
      activeTab === "students"
        ? course.totalStudentsEnrolled
        : course.totalAmountGenerated,
  }));

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-md">
      {/* Toggle Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md text-sm transition ${
            activeTab === "students"
              ? "bg-yellow-50 text-black font-semibold"
              : "bg-yellow-700 text-black"
          }`}
          onClick={() => setActiveTab("students")}
        >
          Students
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm transition ${
            activeTab === "income"
              ? "bg-yellow-50 text-black font-semibold"
              : "bg-yellow-700 text-black"
          }`}
          onClick={() => setActiveTab("income")}
        >
          Income
        </button>
      </div>

      {/* Pie Chart */}
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InstructorChart;
