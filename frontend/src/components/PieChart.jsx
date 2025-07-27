import React, { useMemo, useState } from 'react';
import { Label, Pie, PieChart, Sector, Tooltip } from 'recharts';

const SubjectPieChart = ({ subjects }) => {
  // Tailwind class to hex color map
  const colorMap = {
    'bg-blue-500': '#3B82F6',
    'bg-purple-500': '#8B5CF6',
    'bg-green-500': '#10B981',
    'bg-orange-500': '#F59E0B',
    'bg-red-500': '#EF4444',
    'bg-indigo-500': '#6366F1',
    'bg-gray-500': '#6B7280',
  };

  // Convert subjects to chart data format with points
  const chartData = useMemo(() => 
    subjects.map((subject) => ({
      month: subject.name.toLowerCase(),
      desktop: subject.points,
      fill: colorMap[subject.color] || '#6B7280',
      name: subject.name,
      points: subject.points,
      accuracy: subject.accuracy,
    })), [subjects]);

  const [activeSubject, setActiveSubject] = useState(chartData[0]?.month || '');

  const activeIndex = useMemo(
    () => chartData.findIndex((item) => item.month === activeSubject),
    [activeSubject, chartData]
  );

  const subjectsList = useMemo(() => chartData.map((item) => item.month), [chartData]);

  // Calculate total points
  const totalPoints = useMemo(() => 
    chartData.reduce((sum, item) => sum + item.points, 0), [chartData]);

  // Calculate average accuracy
  const averageAccuracy = useMemo(() => 
    Math.round(chartData.reduce((sum, item) => sum + item.accuracy, 0) / chartData.length), [chartData]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / totalPoints) * 100).toFixed(1);
      return (
        <div className="bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: data.fill }}
            ></div>
            <span className="font-medium">{data.payload.name}</span>
            <span className="ml-auto font-bold">{data.value} XP</span>
          </div>
          <div className="text-xs text-gray-300 mt-1">
            {percentage}% of total points
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="grid gap-1">
          <h3 className="text-xl font-bold text-gray-800">Subject Points</h3>
          <p className="text-sm text-gray-500">Points Distribution • Avg. Accuracy: {averageAccuracy}%</p>
        </div>
      </div>

      <div className="flex flex-1 justify-center pb-0">
        <div className="mx-auto aspect-square w-full max-w-[300px]">
          <PieChart width={300} height={300}>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={chartData}
              dataKey="desktop"
              nameKey="month"
              cx="50%"
              cy="50%"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const activeData = chartData[activeIndex];
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                          style={{ fill: '#1f2937' }}
                        >
                          {activeData ? `${activeData.points} XP` : '0 XP'}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                          style={{ fill: '#6b7280', fontSize: '14px' }}
                        >
                          Points
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default SubjectPieChart;
