import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

import 'utils/faLibrary';

import AccountForm from '../AccountForm';
import { initialState, reducer } from '../slice';

const renderer = createRenderer();

describe('<AccountForm />', () => {
  beforeEach(() => {
    renderer.render(
      <BrowserRouter>
        <AccountForm onSuccessValidation={() => {}} />
      </BrowserRouter>,
    );
  });

  it('should render the form properly', () => {
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
  it('should return value of use selector', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
