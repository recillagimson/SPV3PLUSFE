/**
 * Error Boundary
 * This will component will be the top most component in our app, shows an error and where it occur for debugging purposes
 */
import * as React from 'react';
import styled from 'styled-components/macro';

import H5 from 'app/components/Elements/H5';
import Button from 'app/components/Elements/Button';
import e500 from 'app/components/500/e500.jpg';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Museo Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;

  .content {
    width: 90%;
    max-width: 500px;
    text-align: center;

    img {
      display: block;
      margin: 0 auto;
    }

    .error-stack {
      font-size: 0.9rem;
      text-align: left;

      strong,
      small {
        display: block;
      }

      span {
        display: block;
        max-height: 250px;
        overflow-y: auto;
        margin: 5px 0;
        white-space: pre-wrap;
      }
    }
  }
`;

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: any;
  errorInfo?: any;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Wrapper>
          <div className="content">
            <img src={e500} alt="Error" />
            <H5>Oops, something went wrong</H5>
            <p>
              Click the button to go back or feel free to contact us if the
              problem persists.
            </p>
            <p className="error-stack">
              <strong>
                {this.state.error
                  ? this.state.error && this.state.error.toString()
                  : ''}
              </strong>
              <span>
                {this.state.errorInfo
                  ? this.state.errorInfo.componentStack
                  : ''}
              </span>
              <small>
                Note: This Error Stack should be copied for debugging purposes
              </small>
            </p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.replace('/')}
              fullWidth
              size="large"
            >
              Go Back
            </Button>
          </div>
        </Wrapper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
