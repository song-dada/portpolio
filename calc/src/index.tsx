import React from 'react';
import ReactDOM from 'react-dom/client';
import Calc from '../src/calc.tsx';
import '../src/sass/calc.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Calc></Calc>
);