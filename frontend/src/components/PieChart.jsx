import React, { useMemo } from 'react';
import { PieChart as MinimalPieChart } from 'react-minimal-pie-chart';
import { Target } from 'lucide-react';

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

  // Memoized pie chart data
  const pieData = useMemo(() => 
    subjects.slice(0, 4).map((subject) => ({
      title: subject.name,
      value: subject.accuracy,
      color: colorMap[subject.color] || '#6B7280',
    })), [subjects]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Target className="w-5 h-5 mr-2 text-green-500" />
          Subject Accuracy
        </h3>
        <span className="text-sm text-gray-500">Points Distribution</span>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
        <div className="w-40 h-40">
          <MinimalPieChart
            data={pieData}
            label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}%`}
            labelStyle={{
              fontSize: '5px',
              fontFamily: 'sans-serif',
              fill: '#fff',
            }}
            labelPosition={60}
            radius={42}
            animate
          />
        </div>

        <p className="text-sm mt-4 text-gray-500">
          Pie Chart showing accuracy in subjects
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 w-full text-xs">
          {subjects.slice(0, 4).map((subject) => (
            <div key={subject.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${subject.color}`}></div>
                <span>{subject.name}</span>
              </div>
              <span className="font-medium">{subject.accuracy}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectPieChart;
