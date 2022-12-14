import React from 'react';
import MounthEffectivity from './MonthEffectivity/MonthEffectivity';
import MounthStat from './MonthStat/MonthStat';

export default function Month({ tasks }) {
  return (
    <div className="year">
      <MounthStat tasks={tasks} />
      <MounthEffectivity tasks={tasks} />
    </div>
  );
}
