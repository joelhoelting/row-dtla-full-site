import { css } from '@emotion/core';

const base = css`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #___gatsby {
    height: 100%;
    overscroll-behavior-y: none;
  }

  body {
    margin: 0;
    padding: 0;
  }

  textarea,
  input {
    outline: none;
  }

  div[role='group'][tabindex] {
    height: 100%;
  }
`;

export default base;
