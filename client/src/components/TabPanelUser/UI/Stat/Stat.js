import React from 'react';

export default function Stat() {
  return (
    <div>
      <label htmlFor="file">Downloading progress:</label>
      <progress id="file" value="32" max="100"> 32% </progress>

    </div>
  );
}
