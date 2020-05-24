import React, { useContext, useCallback } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import Context from '~/context/Context';

import { navRoutes } from '~/data/routes';
import { mediaMin } from '~/styles/mediaQueries';

import FacebookLogoBlack from '~/assets/images/icons/fb-black.svg';
import InstagramLogoBlack from '~/assets/images/icons/insta-black.svg';
import FacebookLogoWhite from '~/assets/images/icons/fb-white.svg';
import InstagramLogoWhite from '~/assets/images/icons/insta-white.svg';

const NavRow = styled.nav`
  display: none;
  ${mediaMin('tabletLandscape')} {
    display: block;
    height: 100%;
  }
  ul {
    list-style-type: none;
    display: flex;
    height: 100%;
    margin: 0;
    li {
      margin-left: 2em;
      height: 100%;
      a {
        text-decoration: none;
        color: ${props => (props.dark ? '#fff' : '#000')};
        text-transform: uppercase;
        height: 100%;
        display: flex;
        transition: border-top 400ms ease, color 400ms ease;
        align-items: center;
        .creative-btn {
          border: ${props => (props.dark ? '1px solid #fff' : '1px solid #000')};
          background: none;
          padding: 12px 15px 10px;
          cursor: pointer;
          transition: all 200ms ease;
          color: ${props => (props.dark ? '#fff' : '#000')};
          &:hover {
            background: ${props => (props.dark ? '#fff' : '#000')};
            color: ${props => (props.dark ? '#000' : '#fff')};
          }
        }
        span {
          display: flex;
          align-items: center;
          height: 100%;
        }
        &:hover {
          color: ${props => (props.dark ? '#fff' : '#000')};
        }
      }
    }
  }
`;

const SocialMedia = styled.li`
  display: flex;
  a {
    border-top: 4px solid transparent;
    margin-left: 2em;
  }
  a:first-of-type {
    margin-left: 0;
  }
`;

const DesktopNavigation = () => {
  const { darkTheme } = useContext(Context);

  const generateNav = useCallback(() => {
    const navigation = navRoutes.map(route => {
      return (
        <li key={route.link}>
          <Link
            to={route.url}
            getProps={({ isCurrent, isPartiallyCurrent }) => {
              return {
                style: {
                  borderTop:
                    isCurrent || isPartiallyCurrent
                      ? `4px solid ${darkTheme ? '#fff' : '#000'}`
                      : '4px solid transparent'
                }
              };
            }}
          >
            <span>{route.link}</span>
          </Link>
        </li>
      );
    });

    navigation.push(
      <li key="Creative Office Button">
        <a href="https://office-brochure.rowdtla.com/" target="_blank" rel="noopener noreferrer">
          <button className="creative-btn">Creative Office</button>
        </a>
      </li>
    );

    navigation.push(
      <SocialMedia key="social-media">
        <a href="https://www.instagram.com/rowdtla" target="_blank" rel="noopener noreferrer">
          <img src={darkTheme ? InstagramLogoWhite : InstagramLogoBlack} alt="instagram logo" />
        </a>
        <a href="https://www.facebook.com/ROWDTLA/" target="_blank" rel="noopener noreferrer">
          <img src={darkTheme ? FacebookLogoWhite : FacebookLogoBlack} alt="facebook logo" />
        </a>
      </SocialMedia>
    );
    return navigation;
  }, [darkTheme]);

  return (
    <NavRow dark={darkTheme}>
      <ul>{generateNav()}</ul>
    </NavRow>
  );
};

export default DesktopNavigation;
