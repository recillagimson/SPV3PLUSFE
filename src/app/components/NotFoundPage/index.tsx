/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import ButtonLink from 'app/components/Elements/ButtonLink';

import { appActions } from 'app/App/slice';

export function NotFoundPage() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const appMain = document.querySelector('#appMain');
    appMain?.classList.add('not-found');

    dispatch(appActions.getIsBlankPage(true));

    return () => {
      appMain?.classList.remove('not-found');
      dispatch(appActions.getIsBlankPage(false));
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Wrapper>
        <svg
          width="250"
          height="234"
          viewBox="0 0 250 234"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0)">
            <path
              d="M125.953 0V54.6464"
              stroke="#EDEDED"
              strokeWidth="1.86"
              strokeMiterlimit="10"
            />
            <path
              d="M132.34 59.2654H119.57V56.9858C119.57 53.4602 122.432 50.5984 125.958 50.5984C129.483 50.5984 132.345 53.4602 132.345 56.9858V59.2654H132.34Z"
              fill="#E8BB3E"
            />
            <path
              d="M160.391 90.7399H91.5117C91.5117 72.1001 106.626 56.9858 125.266 56.9858H126.637C145.277 56.9858 160.391 72.0946 160.391 90.7399Z"
              fill="#EDEDED"
            />
            <path
              d="M159.412 90.8595H92.4913C91.1365 90.8595 90.043 89.7659 90.043 88.4112C90.043 87.0565 91.1365 85.9629 92.4913 85.9629H159.412C160.767 85.9629 161.86 87.0565 161.86 88.4112C161.86 89.7659 160.767 90.8595 159.412 90.8595Z"
              fill="#DDDBDB"
            />
            <path
              d="M250 233.406C166.665 233.586 83.3351 233.771 0 233.95C30.0163 186.072 60.0272 138.194 90.0435 90.3157H161.861C191.24 138.014 220.62 185.707 250 233.406Z"
              fill="url(#paint0_linear)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="125"
              y1="266.869"
              x2="125"
              y2="16.8692"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="0.2961" stopColor="#FEFCF7" />
              <stop offset="0.4151" stopColor="#F9EECF" />
              <stop offset="0.6182" stopColor="#F2D891" />
              <stop offset="0.7905" stopColor="#EDC864" />
              <stop offset="0.9231" stopColor="#E9BF48" />
              <stop offset="1" stopColor="#E8BB3E" />
            </linearGradient>
            <clipPath id="clip0">
              <rect width="250" height="233.95" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <Title>404</Title>
        <p>Uh-oh, page not found...</p>
        <ButtonLink variant="contained" color="primary" to="/">
          Go home
        </ButtonLink>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #38434d;

  p {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0 0 25px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 72px;
  line-height: 1.2;
  margin: 0 0;
`;
