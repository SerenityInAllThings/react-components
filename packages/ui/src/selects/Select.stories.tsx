import { Meta, Story } from '@storybook/react';
import Select, { Props } from './Select';
import styled from 'styled-components';

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
    options: [1, 2, 3, 4, 5, 6],
  },
} as Meta<Props>;

const Template: Story<Props & WithContainerType> = ({ ...args }) => {
  const Container = GetContainer(args.type);

  return (
    <Container>
      <Select {...args} />
    </Container>
  );
};

export const Primary = Template.bind({});

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
