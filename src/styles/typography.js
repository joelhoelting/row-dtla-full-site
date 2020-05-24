import { css } from '@emotion/core';

const typography = css`
  * {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'SangBleu Kingdom';
    font-style: normal;
    font-weight: 500;
    text-transform: none;
  }

  button,
  select,
  span,
  div,
  textarea,
  p {
    font-family: 'Apercu';
    font-weight: 300;
  }

  strong {
    font-weight: 500;
  }

  button,
  span {
    text-transform: uppercase;
    font-size: 15px;
    letter-spacing: 1px;
    line-height: 20px;
    font-weight: 500;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:visited {
    color: inherit;
  }

  a:hover: {
    color: inherit;
  }

  a:active {
    color: inherit;
  }

  .no-margin {
    margin: 0;
  }
`;

export default typography;
