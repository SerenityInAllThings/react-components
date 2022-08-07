import React from 'react';
import styled from 'styled-components';
import { useOverflowY } from '../hooks';

interface Props {
  options: any[];
}

const OptionsContainer = styled.div<{ overflow: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: ${({ overflow }) => (overflow ? 'inherit' : '100%')};
  bottom: ${({ overflow }) => (overflow ? '100%' : 'inherit')};
  margin-top: 2%;
  z-index: 2;
  width: 100%;
  border-radius: 0.25rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  box-shadow: 0.15rem 0.15rem 0.8rem gray;
  background-color: white;
  text-indent: 0.6rem;
  max-height: 30vh;
  overflow-y: auto;
`;

export default ({ options }: Props) => {
  const { ref, isOverflowY } = useOverflowY();
  return (
    <OptionsContainer ref={ref} overflow={isOverflowY}>
      {options.map((o) => (
        <p>{o.toString()}</p>
      ))}
    </OptionsContainer>
  );
};
