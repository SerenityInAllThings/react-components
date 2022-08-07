import React from 'react';
import loading from './svgs/loading.svg';
import styled from 'styled-components';
import { WithAlt } from './interfaces';

const SvgImage = styled.img`
  animation: rotate 1s infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default ({ alt }: WithAlt) => {
  return <SvgImage src={loading} alt={alt}></SvgImage>;
};
