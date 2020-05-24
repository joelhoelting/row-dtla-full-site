import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import ReactPlayer from 'react-player';

import VideoLoading from './VideoLoading';
import { mediaMin } from '~/styles/mediaQueries';
import PlayIcon from '~/images/icons/videoplay_icon.svg';

const SliderSlide = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  position: relative;
  ${props => (props.videoPlaceholder ? `background-image: url(${props.videoPlaceholder});` : '')}
  ${mediaMin('tabletLandscape')} {
    min-width: 100%;
    flex-direction: ${props => (props.slideStyle === 'Image Left' ? 'row-reverse' : 'row')};
  }
  .react-player__preview {
    .react-player__shadow {
      background: none !important;
      border-radius: 0 !important;
      height: 200px !important;
      width: 200px !important;
      .react-player__play-icon {
        border-style: none !important;
        border-width: 0 !important;
        margin-left: 0 !important;
        background-image: url(${PlayIcon});
        height: 100%;
        width: 100%;
      }
    }
  }
`;

const DesktopImage = styled.div`
  display: none;
  ${mediaMin('tabletLandscape')} {
    display: block;
    background-image: url(${props => props.imgsrc});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    ${props => (props.slideStyle === 'Image Left' || props.slideStyle === 'Image Right' ? 'width: 50%;' : null)}
  }
`;

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
  margin: 24px 0;
  height: 50%;
  ${mediaMin('tabletLandscape')} {
    height: 100%;
    margin: 0;
    padding: 4em;
    width: 50%;
  }
  span {
    margin: 20px 0;
    font-size: 15px;
    letter-spacing: 1px;
    line-height: 20px;
  }
  h3 {
    margin: 0;
    font-size: 40px;
    line-height: 44px;
    ${mediaMin('tabletLandscape')} {
      font-size: 55px;
      line-height: 60px;
    }
  }
  p {
    font-family: 'SangBleu Kingdom';
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    ${mediaMin('tabletLandscape')} {
      font-size: 21px;
      letter-spacing: -0.3px;
      line-height: 28px;
    }
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
    text-transform: uppercase;

    &:hover {
      background: #000;
      color: #fff;
    }
  }
`;

const Quote = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  ${mediaMin('tabletLandscape')} {
    justify-content: center;
    padding-right: ${props => (props.slideStyle === 'Quote Full' ? '20%' : '50%')};
  }
  blockquote {
    font-family: 'SangBleu Kingdom';
    font-style: italic;
    font-weight: 600;
    font-size: 26px;
    line-height: 35px;
    margin: 15px 0;
    ${mediaMin('tabletLandscape')} {
      font-size: 48px;
      line-height: 64px;
    }
  }
`;

const Progress = styled.span`
  position: fixed;
  bottom: 5%;
  left: 80vw;
  ${mediaMin('tabletLandscape')} {
    left: 0.5%;
    bottom: 4%;
  }
`;

const VideoContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  opacity: ${props => (props.videoLoaded ? 1 : 0)};
  visibility: ${props => (props.videoLoaded ? 'visible' : 'hidden')};
  transition: all 500ms ease;
  cursor: pointer;
  video {
    width: 100%;
    object-fit: cover;
    height: 100%;
    object-position: 50% 40%;
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

const QuoteSlide = ({ slideStyle, quote, quoteAttribution }) => {
  return (
    <Quote slideStyle={slideStyle}>
      <blockquote>{quote}</blockquote>
      <span>{quoteAttribution}</span>
    </Quote>
  );
};

const Slide = ({ slide, arrayLength, slideHeight, currentSlide, slideIdx }) => {
  const SlideRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const {
    heroImage,
    linkName,
    linkUrl,
    style,
    title,
    sectionName,
    body,
    videoUrl,
    videoType,
    autoplay,
    order,
    quoteAttribution,
    quote
  } = slide;

  const setSliderDivHeight = useCallback(() => {
    if (window.innerWidth > 1024) {
      SlideRef.current.parentElement.style.height = '100%';
    } else {
      SlideRef.current.parentElement.style.height = '90%';
    }
  }, [SlideRef]);

  useEffect(() => {
    setSliderDivHeight();

    document.addEventListener('resize', () => {
      setSliderDivHeight();
    });
    return () => {
      document.removeEventListener('resize', () => {
        setSliderDivHeight();
      });
    };
  }, []);

  const renderVideoSlide = () => {
    const isBackground = videoType === 'background';

    return (
      <>
        {currentSlide === slideIdx && <VideoLoading videoLoaded={videoLoaded} />}
        <VideoContainer videoLoaded={videoLoaded}>
          <ReactPlayer
            onStart={() => {
              setVideoLoaded(true);
            }}
            url={videoUrl}
            config={{
              vimeo: {
                playerOptions: {
                  background: isBackground
                }
              },
              preload: true
            }}
            width="100%"
            height="100%"
            controls
            playsinline
            playing={currentSlide === slideIdx}
            loop={autoplay}
            light={false}
          />
        </VideoContainer>
      </>
    );
  };

  return (
    <SliderSlide ref={SlideRef} slideStyle={style} slideHeight={slideHeight}>
      {style === 'Video' && renderVideoSlide()}
      {(style === 'Quote Full' || style === 'Quote Left') && (
        <QuoteSlide slideStyle={style} quote={quote.quote} quoteAttribution={quoteAttribution} />
      )}
      {style !== 'Video' &&
        style !== 'Quote Full' &&
        (style !== 'Quote Left' && (
          <>
            <DesktopImage slideStyle={style} imgsrc={heroImage.file.url} alt={heroImage.description} />
            <MobileImage slideStyle={style} src={heroImage.file.url} alt={heroImage.description} />
            {(style === 'Image Left' || style === 'Image Right') && (
              <ContentBlock title={title} sectionName={sectionName} body={body} linkName={linkName} linkUrl={linkUrl} />
            )}
          </>
        ))}
      <Progress>{`${order.toString().padStart(2, '0')}/${arrayLength.toString().padStart(2, '0')}`}</Progress>
    </SliderSlide>
  );
};

export default Slide;
