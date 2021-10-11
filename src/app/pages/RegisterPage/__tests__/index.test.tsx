import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import '@testing-library/jest-dom';

import { BrowserRouter } from 'react-router-dom';

import { RegisterPage } from '..';

const renderer = createRenderer();

describe('<RegisterPage />', () => {
  it('should render the initial registration page', () => {
    renderer.render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
