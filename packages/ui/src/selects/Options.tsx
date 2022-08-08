import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useOverflowY } from '../hooks';

export interface Selectable<T> {
  text: string;
  value: T;
}

interface Props<T> {
  options: Selectable<T>[];
  onSelection: (selected: T) => void;
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

export default <T,>({ options, onSelection }: Props<T>) => {
  const { ref, isOverflowY } = useOverflowY();
  return (
    <OptionsContainer ref={ref} overflow={isOverflowY}>
      {options.map((o, i) => (
        <SingleOption option={o} key={i} onSelected={onSelection} />
      ))}
    </OptionsContainer>
  );
};

const OptionContainer = styled.div`
  padding-bottom: 0.2rem;
  padding-top: 0.2rem;
  background-color: white;
  animation-duration: 0.5s;
  &:hover {
    background-color: LightSkyBlue;
  }
`;

interface OptionProps<T> {
  option: Selectable<T>;
  onSelected: (value: T) => void;
}

const SingleOption = <T,>({ option, onSelected }: OptionProps<T>) => {
  const onSelection = useCallback(
    () => onSelected(option.value),
    [onSelected, option]
  );
  return <OptionContainer onClick={onSelection}>{option.text}</OptionContainer>;
};
