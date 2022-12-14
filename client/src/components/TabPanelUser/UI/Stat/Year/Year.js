import React from 'react';
import YearEffectivity from './YearEffectivity/YearEffectivity';
import YearStat from './YearStat/YearStat';

export default function Year({ tasks }) {
  return (
    <div className="year">
      <YearStat tasks={tasks} />
      <YearEffectivity tasks={tasks} />
    </div>
  );
}
