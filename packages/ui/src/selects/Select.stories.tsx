import { Meta, Story } from '@storybook/react';
import Select, { Props } from './Select';
import styled from 'styled-components';
import { useState } from '@storybook/addons';

const InlineContainer = styled.div`
  display: flex;
  height: 1.75rem;
  width: 12vw;
  min-width: 110px;
`;

const ViewContainer = styled.div`
  display: flex;
  padding: 1vw;
  width: 40vw;
  height: 12vh;
  border: 2px solid purple;
`;

const SmallContainer = styled.div`
  display: flex;
  height: 1rem;
  width: 110px;
  max-width: 110px;
`;

type ContainerType = 'small' | 'view' | 'inline';

interface WithContainerType {
  type?: ContainerType;
}

const GetContainer = (type?: ContainerType) => {
  switch (type) {
    case 'small':
      return SmallContainer;
    case 'inline':
      return InlineContainer;
    case 'view':
      return ViewContainer;
    default:
      return SmallContainer;
  }
};

export default {
  component: Select,
  title: 'Select',
  argTypes: {
    type: {
      options: ['small', 'view', 'inline'],
      control: { type: 'select' },
    },
  },
  args: {
    text: 'Selecione...',
    loading: false,
    type: 'small',
    options: [
      { text: '1', value: 1 },
      { text: '2', value: 2 },
      { text: '3', value: 3 },
      { text: '4', value: 4 },
      { text: '5', value: 5 },
      { text: '6', value: 6 },
    ],
  },
} as Meta<Props<number>>;

const Template: Story<Props<number> & WithContainerType> = ({ ...args }) => {
  const Container = GetContainer(args.type);
  const [selected, setSelected] = useState(args.text);
  const onSelection = (n: number) => setSelected(n.toString());

  return (
    <Container>
      <Select {...args} text={selected} onSelection={onSelection} />
    </Container>
  );
};

export const Primary = Template.bind({});

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
