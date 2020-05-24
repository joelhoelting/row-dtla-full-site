import React from 'react';
import styled from '@emotion/styled';

import { mediaMin } from '~/styles/mediaQueries';

const HamburgerContainer = styled.button`
  background: transparent;
  cursor: pointer;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  z-index: 101;
  height: 24px;
  ${mediaMin('tabletLandscape')} {
    display: none;
  }
  svg {
    height: 100%;
  }
`;

function toggleHamburger(navActive, toggleActive) {
  if (navActive) {
    return (
      <HamburgerContainer navActive={navActive} onClick={() => toggleActive(!navActive)}>
        <svg
          height="25"
          viewBox="0 0 18 18"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xlinkHref="http://www.w3.org/1999/xlink"
        >
          <title>Close Icon</title>
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-974.000000, -32.000000)" fill="#FFFFFF">
              <g transform="translate(974.000000, 32.000000)">
                <path d="M7.94117647,9 L1.64313008e-13,1.05882353 L1.05882353,-1.49880108e-14 L9,7.94117647 L16.9411765,1.0658141e-14 L18,1.05882353 L10.0588235,9 L18,16.9411765 L16.9411765,18 L9,10.0588235 L1.05882353,18 L1.90070182e-13,16.9411765 L7.94117647,9 Z" />
              </g>
            </g>
          </g>
        </svg>
      </HamburgerContainer>
    );
  } else {
    return (
      <HamburgerContainer navActive={navActive} onClick={() => toggleActive(!navActive)}>
        <svg
          id="hamburger"
          height="25"
          viewBox="0 0 24 18"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xlinkHref="http://www.w3.org/1999/xlink"
        >
          <title>Hamburger Icon</title>
          <g id="line-container" stroke="none" strokeWidth="1" fill="#515151" fillRule="evenodd">
            <polygon id="line-1" points="0 0 24 0 23 2 0 2" />
            <polygon id="line-2" points="0 8 21 8 20 10 0 10" />
            <polygon id="line-3" points="0 16 18 16 17 18 0 18" />
          </g>
        </svg>
      </HamburgerContainer>
    );
  }
}

function Hamburger({ navActive, toggleActive }) {
  return <React.Fragment>{toggleHamburger(navActive, toggleActive)}</React.Fragment>;
}

export default Hamburger;
