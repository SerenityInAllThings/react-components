import React from 'react';
import { WithAlt } from './interfaces';
import arrowDown from './svgs/arrow-down.svg';

export default ({ alt }: WithAlt) => {
  return <img src={arrowDown} alt={alt}></img>;
};
