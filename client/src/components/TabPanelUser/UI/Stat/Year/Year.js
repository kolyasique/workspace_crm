import React from 'react';
import YearEffectivity from './YearEffectivity/YearEffectivity';
import YearStat from './YearStat/YearStat';

export default function Year() {
  return (
    <div className="year">
      <YearStat />
      <YearEffectivity />
    </div>
  );
}
