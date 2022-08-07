import React from 'react';
import styled from 'styled-components';

const Divider = styled.div`
  display: flex;
  align-self: center;
  height: 90%;
  background-color: gray;
  width: 0.15rem;
`;

export default () => {
  return <Divider />;
};
