import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const SubjectPieChart = ({ subjects }) => {
  // Safe data preparation with fallback values
  const data = useMemo(() => {
    if (!subjects || subjects.length === 0) {
      return [{ name: 'No Data', value: 100, color: '#e0e0e0' }];
    }
    
    return subjects.map(subject => ({
      name: subject?.name || 'Unnamed Subject', // Provide fallback for name
      value: subject?.points || 0,              // Provide fallback for points
      color: subject?.color || '#e0e0e0'        // Provide fallback for color
    }));
  }, [subjects]);

  // Custom legend with safe text transformation
  const renderCustomizedLegend = (props) => {
    const { payload } = props;
    
    return (
      <ul className="flex flex-col gap-2 text-sm">
        {payload.map((entry, index) => {
          const legendText = entry.value || 'Unknown';
          
          return (
            <li key={`item-${index}`} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-700">
                {legendText}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        <span className="mr-2">🎯</span>
        Progress Distribution
      </h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend content={renderCustomizedLegend} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubjectPieChart;
