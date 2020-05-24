import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Fade from 'react-reveal/Fade';

import { mediaMin } from '~/styles/mediaQueries';
import { truncateText } from '~/utils/helpers';

const BackgroundImage = styled.div`
  background-image: url(${props => props.imgsrc});
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  background-fit: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: none;
  height: 55%;
  transition: transform 0.5s ease-in-out;
  ${mediaMin('tabletLandscape')} {
    display: block;
  }
  ${mediaMin('desktopLarge')} {
    height: 60%;
  }
`;

const NewsCardWrapper = styled.div`
  margin-bottom: 20px;
  padding: 0;
  width: 100%;
  border: 1px solid #000;
  overflow: hidden;
  .react-reveal {
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
  }
  ${mediaMin('tablet')} {
    width: calc(50% - 10px);
  }
  ${mediaMin('tabletLandscape')} {
    height: 620px;
    transition: box-shadow 0.5s ease, border 0.5s ease;
    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
      ${BackgroundImage} {
        transform: scale(1.025);
        transform-origin: center;
        border: none !important;
      }
    }
  }
  ${mediaMin('desktop')} {
    height: 620px;
    width: calc(33.33% - 14px);
  }
`;

const CopySection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 45%;
  ${mediaMin('desktopLarge')} {
    height: 40%;
  }
  h3 {
    font-size: 32px;
    line-height: 36px;
    margin: 0 0 0 0;
  }
  span {
    margin: 0 0 16px 0;
  }
  .publication {
    margin: 16px 0 0 0;
    ${mediaMin('tabletLandscape')} {
      margin: auto 0 0 0;
    }
  }
  a {
    color: #000;
    text-decoration: none;
    &:visited {
      color: #000;
    }
  }
`;

const MobileImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  ${mediaMin('tabletLandscape')} {
    display: none;
  }
`;

const NewsCard = ({ article }) => {
  const { images, date, title, slug, publication } = article;

  return (
    <NewsCardWrapper>
      <Fade>
        <Link to={`/news/${slug}`}>
          <BackgroundImage imgsrc={images[0].file.url} />
          <MobileImage src={images[0].file.url} />
          <CopySection>
            <span>{date}</span>
            <h3>{truncateText(title, 10)}</h3>
            <span className="publication">{publication}</span>
          </CopySection>
        </Link>
      </Fade>
    </NewsCardWrapper>
  );
};

export default NewsCard;
