import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import VerticalDivider from '../dividers';
import { ArrowDown, Loading } from '../icons';
import { isClickOutside } from '../utils';
import Options, { Selectable } from './Options';

const Container = styled.div<{ open: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border: 1.9px solid black;
  border-radius: ${({ open }) => (open ? '0.25rem' : '1.3rem')};
  min-width: 120px;
  min-height: 1rem;
  transition-property: border-radius, text-indent;
  transition-duration: 0.4s;
  background-color: white;
`;

const SearchSizer = styled.div<{ open: boolean }>`
  display: flex;
  flex: 5;
  margin-left: ${({ open }) => (open ? '0.25rem' : '0.65rem')};
  transition-property: margin-left;
  transition-duration: 0.4s;
`;

const SearchInput = styled.input`
  padding: 0;
  width: 90%;
  border: none;
  -webkit-appearance: none;
  &:focus {
    outline: none;
  }
`;

const IconContainer = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
`;

export interface Props<T> {
  filter: string;
  placeholder?: string;
  options: Selectable<T>[];
  loading?: boolean;
  onSelection?: (value: T) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onFilter?: (filter: string) => void;
}

export default <T,>({
  filter,
  options,
  placeholder,
  loading = false,
  onSelection,
  onOpen,
  onClose,
  onFilter,
}: Props<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const focusFilter = useCallback(() => {
    const { current } = inputRef;
    if (!current) return;
    current.focus();
  }, [inputRef]);

  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => {
    focusFilter();
    setOpen(true);
    onOpen?.();
  }, [setOpen, onOpen, focusFilter]);
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
      <SearchSizer open={optionsAvailable}>
        <SearchInput
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={filter}
          onChange={({ target: { value } }) => onFilter?.(value)}
        />
      </SearchSizer>
      <IconContainer>
        {loading && <Loading />}
        <VerticalDivider />
        <ArrowDown />
      </IconContainer>
      {optionsAvailable && (
        <Options
          options={options}
          onSelection={(v) => {
            close();
            onSelection?.(v);
          }}
        />
      )}
    </Container>
  );
};
