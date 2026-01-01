import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(PointElement, LineElement, RadialLinearScale, Filler, Tooltip, Legend);

const ResumeAnalysisView = ({ analysis }) => {
  if (!analysis) return null;

  const {
    overall,
    sectionScores,
    suggestions
  } = analysis;

  const data = {
    labels: Object.keys(sectionScores),
    datasets: [
      {
        label: 'Section Scores',
        data: Object.values(sectionScores),
        backgroundColor: 'rgba(59,130,246,0.2)',
        borderColor: 'rgba(59,130,246,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59,130,246,1)'
      }
    ]
  };

  const grade = overall >= 85 ? 'A' : overall >= 70 ? 'B' : overall >= 55 ? 'C' : 'D';

  return (
    <div className="space-y-6 mt-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Overall Score: {overall}/100</h2>
        <p className="text-xl font-medium mt-1">Grade: {grade}</p>
      </div>

      <div className="max-w-md mx-auto">
        <Radar data={data} options={{ scales: { r: { suggestedMin: 0, suggestedMax: 30 } } }} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Actionable Suggestions</h3>
        <ul className="list-disc pl-5 space-y-1">
          {suggestions.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumeAnalysisView;
