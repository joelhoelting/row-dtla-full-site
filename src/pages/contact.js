import React from 'react';
import styled from '@emotion/styled';

import SEO from '~/components/seo';
import { mediaMin } from '~/styles/mediaQueries';

import ContactForm from '~/components/pages/contact/ContactForm';

const ContactWrapper = styled.div`
  color: #fff;
  margin: 24px auto 0;
  ${mediaMin('tabletLandscape')} {
    margin: 64px 0 0 0;
    width: 100%;
  }
  h2 {
    margin: 0 0 32px;
    font-size: 40px;
    line-height: 44px;
    ${mediaMin('tabletLandscape')} {
      font-size: 72px;
      line-height: 80px;
      margin: 0 0 32px 0;
    }
  }
`;

const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  ${mediaMin('tabletLandscape')} {
    flex-direction: row;
  }
`;

const ContactColumn = styled.div`
  &.left {
    ${mediaMin('tabletLandscape')} {
      width: 66.66%;
      padding-right: 7%;
    }
  }

  &.right {
    ${mediaMin('tabletLandscape')} {
      width: 33.33%;
    }
  }
`;

const ContactSection = styled.div`
  margin-bottom: 3em;
  display: flex;
  flex-direction: column;
  h6 {
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 10px;
  }
  span,
  a {
    margin: 0 0 5px 0;
  }
  .contact {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ContactPage = () => {
  return (
    <>
      <SEO title="Contact" />
      <ContactWrapper>
        <h2>
          Get
          <br />
          Connected.
        </h2>
        <ContactContent>
          <ContactColumn width="60%" className="left">
            <ContactForm />
          </ContactColumn>
          <ContactColumn width="40%" className="right">
            <ContactSection>
              <h6>General Inquiries</h6>
              <div className="contact">
                <a href="mailto:info@url.com">
                  <span>INFO@ROWDTLA.COM</span>
                </a>
                <a href="tel:2139888890">
                  <span>213.988.8890</span>
                </a>
              </div>
            </ContactSection>
            <ContactSection>
              <h6>Retail Leasing</h6>
              <div className="contact">
                <span>RUNYON</span>
                <a href="mailto:INFO@RUNYONGROUP.COM">
                  <span>INFO@RUNYONGROUP.COM</span>
                </a>
                <a href="tel:3102750483">
                  <span>310.275.0483</span>
                </a>
              </div>
            </ContactSection>
            <ContactSection>
              <h6>Creative Office Leasing</h6>
              <div className="contact">
                <span>Joshua Wrobel (License #01237972)</span>
                <a href="mailto:JEFF.PION@CBRE.COM">
                  <span>JOSH.WROBEL@AM.JLL.COM</span>
                </a>
                <a href="tel:2132396001">
                  <span>213.239.6001</span>
                </a>
              </div>
              <div className="contact">
                <span>Jaclyn Ward (License #01912455)</span>
                <a href="mailto:MICHELLE.ESQUIVEL@CBRE.COM">
                  <span>JACLYN.WARD@AM.JLL.COM</span>
                </a>
                <a href="tel:3105953618">
                  <span>310.595.3618</span>
                </a>
              </div>
              <div className="contact">
                <span>Matt Johnson (LICENSE #02104644)</span>
                <a href="mailto:matt.johnson@am.jll.com">
                  <span>matt.johnson@am.jll.com</span>
                </a>
                <a href="tel:8054443428">
                  <span>805.444.3428</span>
                </a>
              </div>
            </ContactSection>
            <ContactSection>
              <h6>Venue Leasing</h6>
              <div className="contact">
                <a href="mailto:events@rowdtla.com">
                  <span>EVENTS@ROWDTLA.COM</span>
                </a>
                <a href="tel:2139888890">
                  <span>213.988.8890</span>
                </a>
              </div>
            </ContactSection>
            <ContactSection>
              <h6>PR & Media Inquiries</h6>
              <a href="mailto:ROWDTLA@WAGSTAFFWORLDWIDE.COM">
                <span>ROWDTLA@WAGSTAFFWORLDWIDE.COM</span>
              </a>
            </ContactSection>
          </ContactColumn>
        </ContactContent>
      </ContactWrapper>
    </>
  );
};

export default ContactPage;
