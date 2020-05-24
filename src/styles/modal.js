import { css } from '@emotion/core';
import { mediaMin } from '~/styles/mediaQueries';

const modal = css`
  .modal {
    position: relative;
    border: 1px solid rgb(204, 204, 204);
    background: rgb(0, 0, 0);
    overflow: auto;
    border-radius: 4px;
    outline: none;
    color: rgb(255, 255, 255);
    z-index: 101;
    ${mediaMin('tabletLandscape')} {
      padding: 20px;
      width: 50%;
      max-width: 650px;
    }
  }

  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }
`;

export default modal;
