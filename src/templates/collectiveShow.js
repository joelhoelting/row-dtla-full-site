import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, graphql } from 'gatsby';
import RichText from '@madebyconnor/rich-text-to-jsx';

import SEO from '~/components/seo';
import { rtfBodyToMetaDescription } from '~/helpers/seo';

import { parsePhone } from '~/utils/helpers';
import {
  ShowOuter,
  ShowInner,
  CopyColumn,
  ImageColumn,
  HeroImage,
  Copy,
  Images,
  SmallImageContainer,
  SmallBGImage,
  MobileImages,
  SmallImage
} from './styles';

import BackArrow from '~/assets/images/icons/arrow-back.svg';
import FacebookLogo from '~/assets/images/icons/fb-black.svg';
import InstagramLogo from '~/assets/images/icons/insta-black.svg';
import placeholderImg from '~/images/backup/backup_image.jpg';

const CollectiveShow = ({ data }) => {
  console.log(data);
  const [mounted, setMounted] = useState(false);
  const CopyRef = useRef(null);
  const ImageRef = useRef(null);

  const {
    body,
    image,
    additionalImages,
    subtitle,
    phoneNumber,
    facebook,
    instagram,
    title,
    email,
    websiteString,
    websiteURL,
    parkingLink,
    parkingText
  } = data.contentfulCollectiveItem;

  const fixLinks = useCallback(() => {
    const bodyLinks = CopyRef.current.getElementsByTagName('a');
    for (let idx = 0; idx < bodyLinks.length; idx += 1) {
      let link = bodyLinks[idx];
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  }, [CopyRef]);

  useEffect(() => {
    setMounted(true);
    fixLinks();
  }, []);

  return (
    <>
      <SEO title={title} description={body ? rtfBodyToMetaDescription(JSON.parse(body.body)) : false} />
      <ShowOuter>
        <Link to="/collective">
          <img className="back-arrow" src={BackArrow} alt="back arrow" />
        </Link>
        <ShowInner>
          <CopyColumn>
            <Copy mounted={mounted} ref={CopyRef} numChildren={CopyRef.current ? CopyRef.current.children.length : 50}>
              <h2 className="subtitle">{subtitle}</h2>
              <h1 className="title">{title}</h1>
              <MobileImages>
                {image && <HeroImage src={image.file.url} mounted={mounted} />}
                {additionalImages && (
                  <SmallImageContainer mounted={mounted}>
                    {additionalImages.map((image, idx) => {
                      return <SmallImage src={image.file.url} key={image.file.url} position={idx % 2 === 0} />;
                    })}
                  </SmallImageContainer>
                )}
              </MobileImages>
              {body && <RichText richText={JSON.parse(body.body)} />}
              {parkingLink && parkingText && (
                <>
                  <span>{parkingText}</span>
                  <a className="parking-link" href={parkingLink}>
                    <span>PARKING DIRECTIONS</span>
                  </a>
                </>
              )}
              {websiteString && (
                <a className="contact-link" target="_blank" rel="noopener noreferrer" href={websiteURL}>
                  <h6 className="info-paragraph">{websiteString}</h6>
                </a>
              )}
              {email && (
                <a className="contact-link" target="_blank" rel="noopener noreferrer" href={`mailto:${email}`}>
                  <h6 className="info-paragraph">{email}</h6>
                </a>
              )}
              {phoneNumber && (
                <a className="contact-link" target="_blank" rel="noopener noreferrer" href={`tel:${phoneNumber}`}>
                  <h6 className="info-paragraph">{parsePhone(phoneNumber)}</h6>
                </a>
              )}
              <div className="row">
                {instagram && (
                  <a className="social-icon" href={instagram} target="_blank" rel="noopener noreferrer">
                    <img src={InstagramLogo} alt="instagram logo" />
                  </a>
                )}
                {facebook && (
                  <a className="social-icon" href={facebook} target="_blank" rel="noopener noreferrer">
                    <img src={FacebookLogo} alt="facebook logo" />
                  </a>
                )}
              </div>
            </Copy>
          </CopyColumn>
          <ImageColumn className="column right" noDesktop>
            <Images>
              <HeroImage
                mounted={mounted}
                src={image ? image.file.url : placeholderImg}
                alt={image ? image.description : 'Placeholder Image'}
              />
              <SmallImageContainer
                mounted={mounted}
                ref={ImageRef}
                numChildren={CopyRef.current ? CopyRef.current.children.length : 50}
              >
                {additionalImages &&
                  additionalImages.map((image, idx) => {
                    if (image.file) {
                      return (
                        <SmallBGImage
                          src={image.file.url}
                          key={image.file.url}
                          position={idx % 2 === 0}
                          height={ImageRef.current ? ImageRef.current.children[0].clientWidth : 0}
                        />
                      );
                    }
                  })}
              </SmallImageContainer>
            </Images>
          </ImageColumn>
        </ShowInner>
      </ShowOuter>
    </>
  );
};

export default CollectiveShow;

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulCollectiveItem(slug: { eq: $slug }) {
      id
      title
      subtitle
      seoDescription {
        seoDescription
      }
      body {
        body
      }
      instagram
      facebook
      email
      websiteString
      websiteURL
      phoneNumber
      parkingLink
      parkingText
      image {
        file {
          url
        }
        description
      }
      additionalImages {
        file {
          url
        }
        description
      }
    }
  }
`;
