import React from 'react';
import Footer from '..';
import { render } from '@testing-library/react';

describe('<Footer />', () => {
  it('renders correctly', () => {
    const tree = render(<Footer />).baseElement;
    expect(tree).toMatchSnapshot();
  });
});
