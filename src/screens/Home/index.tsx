import React from 'react';
import ParagrafoExemplo from './style';

export default () => {
  const message = 'hello world';
  return (
    <div>
      <h1>{message}</h1>
      <ParagrafoExemplo />
    </div>
  );
};
