import React from 'react';
import styled from '@emotion/styled';
import Fade from 'react-reveal/Fade';
import ReactPlayer from 'react-player';

import HomeSlideInner from './HomeSlideInner';

const HomeSlide = styled.div`
  margin-bottom: 18px;
  padding: 0;
  width: 100%;
  border: 0px solid #000;
  overflow: hidden;
  min-height: calc(((100vw - 24px) * 9) / 16);
  display: flex;
  padding-bottom: 18px;
  border-bottom: 1px solid #000;
  &:last-child {
    border: none;
    margin-bottom: 64px;
  }
  .react-reveal {
    height: 100%;
    width: 100%;
  }
  .react-player__preview,
  iframe {
    min-height: calc(((100vw - 24px) * 9) / 16);
  }
  img {
    width: 100%;
  }
`;

const HomeSlideMobile = ({ slide }) => {
  const { style, videoUrl, videoPlaceholder, autoplay } = slide;
  return (
    <HomeSlide>
      <Fade>
        {style === 'Video' ? (
          <ReactPlayer
            url={videoUrl}
            config={{
              preload: true
            }}
            width="100%"
            height="100%"
            controls
            playsinline
            playing={autoplay}
            loop={autoplay}
            light={autoplay ? false : videoPlaceholder.file.url}
          />
        ) : (
          <HomeSlideInner slide={slide} />
        )}
      </Fade>
    </HomeSlide>
  );
};

export default HomeSlideMobile;
