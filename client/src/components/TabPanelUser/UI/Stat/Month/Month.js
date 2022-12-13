import React from 'react';
import MounthEffectivity from './MonthEffectivity/MonthEffectivity';
import MounthStat from './MonthStat/MonthStat';

export default function Month() {
  return (
    <div className="year">
      <MounthStat />
      <MounthEffectivity />
    </div>
  );
}
