import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { StyleConstants } from 'styles/StyleConstants';

const SidebarWrapper = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  transform: translateX(-100%);
  width: ${StyleConstants.SIDEBAR_WIDTH};
  background-color: ${StyleConstants.WHITE};
  box-shadow: 0px 12px 15px rgba(140, 152, 164, 0.05);
  z-index: 1000;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  will-change: transform;

  .btn-trigger {
    position: absolute;
    top: 15px;
    left: calc(100% + 10px);
  }

  &.show {
    transform: translateX(0);
  }

  .logout {
    justify-self: flex-end;
  }

  .sp-logo {
    display: block;
    margin: 0 auto;
    width: 150px;
  }

  .user-info {
    display: flex;
    align-items: center;
    padding: 55px 0;

    .user-short-details {
      flex: 1;
      padding: 0 10px;
      max-width: 175px;
    }

    .name,
    .mobile,
    .status {
      margin: 0 0;
    }

    .name {
      font-weight: 700;
    }

    .mobile {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .mobile,
    .status {
      font-size: 0.875em;
    }

    .status {
      strong {
        color: ${StyleConstants.GOLD};
      }
    }

    .svg-inline--fa {
      font-size: 1.5rem;
    }
  }

  ${media.medium`
    transform: translateX(0);

    .btn-trigger {
      display: none;
    }
  `}
`;

export default SidebarWrapper;
