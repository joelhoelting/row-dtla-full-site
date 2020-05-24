import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { navRoutes } from '~/data/routes';
import { mediaMin } from '~/styles/mediaQueries';
import FacebookLogo from '~/assets/images/icons/fb-white.svg';
import InstagramLogo from '~/assets/images/icons/insta-white.svg';
import Hamburger from './Hamburger';

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #000;
  justify-content: center;
  align-items: center;
  padding: 84px 14px 14px 14px;
  opacity: ${props => (props.navActive ? '1' : '0')};
  visibility: ${props => (props.navActive ? 'visible' : 'hidden')};
  transition: opacity 0.5s ease, visibility 0.5s ease;
  ${mediaMin('tabletLandscape')} {
    display: none;
  }
  span {
    color: #fff;
    opacity: 0.5;
    width: 100%;
  }
  ul {
    width: 100%;
    padding: 0 0 30px;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    margin: 0;
    ${mediaMin('tablet')} {
      justify-content: center;
    }
    li {
      opacity: ${props => (props.navActive ? '1' : '0')};
      transform: ${props => (props.navActive ? 'translateX(0)' : 'translateX(-16px)')};
      transition: opacity 0.3s ease, transform 0.5s ease;
      ${mediaMin('tablet')} {
        margin-bottom: 10%;
      }
      &:nth-child(2) {
        transition-delay: 0.1s;
      }
      &:nth-child(3) {
        transition-delay: 0.2s;
      }
      &:nth-child(4) {
        transition-delay: 0.3s;
      }
      &:nth-child(5) {
        transition-delay: 0.4s;
      }
      &:nth-child(5) {
        transition-delay: 0.5s;
      }
      &:last-child {
        margin-bottom: 0;
      }
      a {
        color: #fff;
        text-decoration: none;
        font-size: 28px;
        letter-spacing: -0.3px;
        line-height: 43px;
        ${mediaMin('tablet')} {
          font-size: 36px;
        }
        .creative-btn {
          background: none;
          border: 1px solid #fff;
          color: #fff;
          font-size: 16px;
          padding: 20px 10px;
          ${mediaMin('tablet')} {
            font-size: 24px;
          }
        }
        &:visited {
          color: #fff;
        }
        h3 {
          margin: 0;
        }
      }
    }
  }
`;

const NavFooter = styled.div`
  width: 100%;
`;

const SocialMedia = styled.div`
  a {
    margin-left: 16px;
  }
  a:first-of-type {
    margin-left: 0;
  }
`;

const MobileNavigation = () => {
  const [navActive, setNavActive] = useState(false);

  const toggleActive = useCallback(() => {
    setNavActive(!navActive);
  }, [navActive]);

  const generateNav = useCallback(() => {
    const navigation = navRoutes.map(route => {
      return (
        <li key={route.link}>
          <Link
            to={route.url}
            onClick={() => {
              setNavActive(false);
            }}
          >
            <h3>{route.link}</h3>
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

    return navigation;
  }, []);

  return (
    <>
      <Hamburger navActive={navActive} toggleActive={toggleActive} />
      <MobileMenu navActive={navActive}>
        <ul>{generateNav()}</ul>
        <NavFooter>
          <SocialMedia>
            <a href="https://www.instagram.com/rowdtla" target="_blank" rel="noopener noreferrer">
              <img src={InstagramLogo} alt="instagram logo" />
            </a>
            <a href="https://www.facebook.com/ROWDTLA/" target="_blank" rel="noopener noreferrer">
              <img src={FacebookLogo} alt="facebook logo" />
            </a>
          </SocialMedia>
          <span>© 2019 ROW DTLA</span>
        </NavFooter>
      </MobileMenu>
    </>
  );
};

export default MobileNavigation;
