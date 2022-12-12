import React from 'react';
import MounthEffectivity from './MounthEffectivity/MounthEffectivity';
import MounthStat from './MounthStat/MounthStat';

export default function Year() {
  return (
    <div className="year">
      <MounthStat />
      <MounthEffectivity />
    </div>
  );
}
