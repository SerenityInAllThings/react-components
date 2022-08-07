import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import VerticalDivider from '../dividers';
import { ArrowDown, Loading } from '../icons';
import { isClickOutside } from '../utils/isClickOutside';

const Container = styled.div<{ open: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border: 1.9px solid black;
  border-radius: ${({ open }) => (open ? '0.25rem' : '1.3rem')};
  padding-left: '0.65rem';
  padding-right: '0.65rem';
  text-indent: ${({ open }) => (open ? '0.1rem' : '0.6rem')};
  min-width: 120px;
  min-height: 1rem;
  transition-property: border-radius, text-indent;
  transition-duration: 0.4s;
  background-color: white;
`;

const IconContainer = styled.div`
  display: flex;
  height: 100%;
`;

export interface Props {
  text: string;
  loading?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export default ({ text, loading = false, onOpen, onClose }: Props) => {
  console.log('render');
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => {
    setOpen(true);
    onOpen?.();
  }, [setOpen, onOpen]);
  const close = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [setOpen, onClose]);
  const onClick = useCallback(() => {
    if (loading) return;
    if (isOpen) close();
    else open();
  }, [isOpen, open, close, loading]);

  // Close on click outside
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (isClickOutside(ref, event)) close();
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  const optionsAvailable = isOpen && !loading;

  return (
    <Container ref={ref} open={optionsAvailable} onClick={onClick}>
      <span>{text}</span>
      <IconContainer>
        {loading && <Loading />}
        <VerticalDivider />
        <ArrowDown />
      </IconContainer>
      {optionsAvailable && <Options />}
    </Container>
  );
};

const OptionsContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100%;
  margin-top: 2%;
  z-index: 2;
  width: 100%;
  border-radius: 0.25rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  box-shadow: 0.15rem 0.15rem 0.8rem gray;
  background-color: white;
  text-indent: 0.6rem;
`;

const Options = () => {
  return (
    <OptionsContainer>
      <p>1</p>
      <p>2</p>
      <p>3</p>
    </OptionsContainer>
  );
};
