import { css } from '@emotion/core';
import { mediaMin } from '~/styles/mediaQueries';

const containers = css`
  .container {
    min-height: 100%;
    padding: 84px 14px 0 14px;
    transition: background-color 400ms ease;
    ${mediaMin('tabletLandscape')} {
      padding: 100px 2.5% 0;
    }
    &.dark {
      background-color: #000;
    }
    main {
      height: 100%;
    }
  }

  .ReactModal__Overlay {
    z-index: 101;
  }
`;

export default containers;
