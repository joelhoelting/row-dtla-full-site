import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import ResponsiveImg from '../images/ResponsiveImg';
import SubscribeForm from '~/components/includes/forms/SubscribeForm';
import InstagramLogo from '~/assets/images/icons/insta-white.svg';
import FacebookLogo from '~/assets/images/icons/fb-white.svg';
import { mediaMin } from '~/styles/mediaQueries';

const FooterWrapper = styled.footer`
  display: flex;
  background-color: #000;
  color: #fff;
  flex-direction: column;
  padding: 40px 14px;
  ${mediaMin('tabletLandscape')} {
    padding: 64px 2.5% 48px 2.5%;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  ${mediaMin('tabletLandscape')} {
    width: 33.3333%;
    margin-bottom: 0px;
  }
  h2 {
    font-size: 40px;
    line-height: 44px;
    margin: 0;
    ${mediaMin('tabletLandscape')} {
      font-size: 55px;
      line-height: 60px;
    }
  }
  br {
    ${mediaMin('tabletLandscape')} {
      display: none;
    }
  }
  p {
    display: flex;
    flex-direction: column;
    margin: 0;
  }
  .row {
    display: flex;
    a {
      margin-right: 1em;
      color: #fff;
      &:visited,
      &:hover {
        color: #fff;
      }
    }
  }

  .copyright {
    opacity: 0.5;
    font-size: 12px;
    letter-spacing: 0.4px;
    line-height: 18px;
    margin-top: 24px;
  }
`;

const Section = styled.div`
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterColumn>
        <Section>
          <h2>
            Visit <br />
            ROW DTLA
          </h2>
          <p>
            <span>777 S ALAMEDA ST</span>
            <span>LOS ANGELES CA 90021</span>
          </p>
        </Section>
        <Section>
          <span>MONDAY TO SUNDAY 8AM - 10PM</span>
        </Section>
        <Section>
          <div className="row">
            <a
              href="https://www.google.com/maps/place/Parking+Structure+--+ROW+DTLA/@34.033383,-118.2406877,19z/data=!4m5!3m4!1s0x80c2c7a66edf4251:0xa1aa81e6fc050d31!8m2!3d34.0333118!4d-118.2405382"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>DIRECTIONS</span>
            </a>
            <Link to="/parking">
              <span>PARKING RATES</span>
            </Link>
          </div>
        </Section>
        <Section>
          <div className="row">
            <a href="https://www.instagram.com/rowdtla" target="_blank" rel="noopener noreferrer">
              <img src={InstagramLogo} alt="instagram logo" />
            </a>
            <a href="https://www.facebook.com/ROWDTLA/" target="_blank" rel="noopener noreferrer">
              <img src={FacebookLogo} alt="facebook logo" />
            </a>
          </div>
        </Section>
      </FooterColumn>
      <FooterColumn>
        <a href="https://g.page/Best-Mall-In-Los-Angeles?share" target="_blank" rel="noopener noreferrer">
          <ResponsiveImg srcPath="footer/map" alt="map of area surrounding row dtla" desktopWidth="80%" />
        </a>
      </FooterColumn>
      <FooterColumn>
        <Section>
          <h2>Subscribe</h2>
          <span>
            CHOOSE YOUR ROW DTLA NEWS AND BE THE FIRST TO KNOW ABOUT LA&apos;S BEST RETAIL, DINING, EVENTS, POP-UPS,
            GIVEAWAYS AND CREATIVE OFFICE SPACE FOR LEASE.
          </span>
        </Section>
        <Section>
          <SubscribeForm />
        </Section>
        <Section>
          <span className="copyright">© 2019 ROW DTLA</span>
        </Section>
      </FooterColumn>
    </FooterWrapper>
  );
};

export default Footer;
