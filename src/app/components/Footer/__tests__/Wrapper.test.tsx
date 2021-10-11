import React from 'react';
import Wrapper from '../Wrapper';
import { render } from '@testing-library/react';

describe('<Wrapper />', () => {
  it('renders correctly', () => {
    const tree = render(<Wrapper />).baseElement;
    expect(tree).toMatchSnapshot();
  });
});
