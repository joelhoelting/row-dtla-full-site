import React from 'react';
import styled from '@emotion/styled';
import { mediaMin } from '~/styles/mediaQueries';

const HomeContainer = styled.div``;

const MobileImage = styled.img`
  width: 100%;
  object-fit: cover;
  ${props =>
    props.slideStyle === 'Image Left' || props.slideStyle === 'Image Right' ? 'height: 50%;' : 'height: 100%;'}
  ${mediaMin('tabletLandscape')} {
    display: none !important;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  text-align: left;
  max-width: 100%;
  padding: 8px 0 0 0;
  height: 50%;
  span {
    margin: 0 0 8px 0;
    font-size: 15px;
    letter-spacing: 1px;
    line-height: 20px;
  }
  h3 {
    margin: 0;
    font-size: 40px;
    line-height: 44px;
  }
  p {
    font-family: 'SangBleu Kingdom';
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }
  a {
    border: 1px solid #000;
    padding: 1em 2em;
    cursor: pointer;
    text-decoration: none;
    color: #000;
    letter-spacing: 1px;
    font-weight: 500;
    transition: background 200ms ease, color 200ms ease;
    font-size: 15px;

    &:hover {
      background: #000;
      color: #fff;
    }
  }
`;

const ContentBlock = ({ title, sectionName, body, linkName, linkUrl }) => {
  return (
    <ContentColumn>
      <span>{sectionName}</span>
      <h3>{title}</h3>
      <p>{body}</p>
      <a href={linkUrl}>{linkName}</a>
    </ContentColumn>
  );
};

const HomeSlideInner = ({ slide }) => {
  const { style, sectionName, title, body, linkName, linkUrl, heroImage } = slide;
  return (
    <HomeContainer slideStyle={style}>
      <MobileImage slideStyle={style} src={heroImage.file.url} alt={heroImage.description} />
      {style !== 'Image Full' && (
        <ContentBlock sectionName={sectionName} title={title} body={body} linkName={linkName} linkUrl={linkUrl} />
      )}
    </HomeContainer>
  );
};

export default HomeSlideInner;
