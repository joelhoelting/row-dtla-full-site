import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import styled from '@emotion/styled';

import Context from '~/context/Context';
import Logo from './logo';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import { mediaMin } from '~/styles/mediaQueries';

import { darkThemeRoutes } from '~/data/routes';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 84px;
  padding: 32px 14px;
  background: ${props => (props.darkTheme ? '#000' : '#fff')};
  transition: background 400ms ease;

  ${mediaMin('tabletLandscape')} {
    height: 100px;
    padding: 0 2.5%;
  }

  a {
    z-index: 101;
    height: 100%;
    ${mediaMin('tabletLandscape')} {
      height: initial;
    }
    svg {
      height: 20px;
    }
  }
`;

const Header = () => {
  const { setDarkTheme, darkTheme } = useContext(Context);

  return (
    <Location>
      {({ location }) => {
        const currentRoute = location.pathname.replace('/', '').split('/')[0];

        const isDarkTheme = darkThemeRoutes[currentRoute] || false;
        setDarkTheme(isDarkTheme);

        return (
          <HeaderContainer darkTheme={darkTheme}>
            <Link to="/">
              <Logo />
            </Link>
            <DesktopNavigation />
            <MobileNavigation />
          </HeaderContainer>
        );
      }}
    </Location>
  );
};

export default Header;
