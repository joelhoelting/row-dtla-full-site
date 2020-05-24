/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { mediaMin } from '~/styles/mediaQueries';
import Slide from './Slide';
import LeftArrow from '~/assets/images/icons/arrow-left.svg';
import RightArrow from '~/assets/images/icons/arrow-right.svg';

const NextArrow = ({ className, onClick }) => (
  <img src={RightArrow} alt="next arrow" className={className} onClick={onClick} />
);

const PrevArrow = ({ className, onClick }) => (
  <img src={LeftArrow} alt="previous arrow" className={className} onClick={onClick} />
);

const SliderContainer = styled.div`
  ${props => `height: ${props.slideHeight}px;`}
  ${mediaMin('tabletLandscape')} {
    height: calc(100vh - 100px);
  }
  .slick-slider {
    width: 100%;
    height: 100%;
    .slick-list {
      margin: 0 auto;
      height: 100%;
      width: 100%;
      .slick-track {
        height: 100%;
        .slick-slide {
          visibility: hidden;
          ${mediaMin('tabletLandscape')} {
            height: 90%;
          }
        }
        .slick-active {
          visibility: visible;
        }
      }
    }
    .slick-arrow {
      display: block;
      z-index: 10;
      top: initial;
      width: 10px;
      bottom: 5%;
      left: unset;
      right: 20%;
      ${mediaMin('tabletLandscape')} {
        right: unset;
        left: 1%;
        bottom: 4%;
      }
    }
    .slick-next {
      transform: translateX(10px);
    }
    .slick-prev {
      transform: translateX(-10px);
    }
  }
`;

const getTallestSlide = htmlCollection => {
  let tallest = 0;
  for (let idx = 0; idx < htmlCollection.length; idx += 1) {
    if (htmlCollection[idx].clientHeight > tallest) {
      tallest = htmlCollection[idx].clientHeight;
    }
  }
  return tallest;
};

const HomeSlider = ({ slideArray }) => {
  const [tallestSlide, setTallestSlide] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const SliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: idx => {
      setCurrentSlide(idx);
    }
  };

  const generateSlides = useCallback(() => {
    return slideArray.map((slide, idx) => (
      <Slide
        slide={slide}
        arrayLength={slideArray.length}
        key={slide.contentful_id}
        slideHeight={tallestSlide}
        currentSlide={currentSlide}
        slideIdx={idx}
      />
    ));
  }, [tallestSlide, slideArray, currentSlide]);

  useEffect(() => {
    if (window && window.innerWidth > 1024) {
      setTimeout(() => {
        setTallestSlide(getTallestSlide(SliderRef.current.innerSlider.list.children[0].children));
      }, 500);
    }
    document.addEventListener('resize', () => {
      setTallestSlide(getTallestSlide(SliderRef.current.innerSlider.list.children[0].children));
    });
    return () => {
      document.removeEventListener('resize', () => {
        setTallestSlide(getTallestSlide(SliderRef.current.innerSlider.list.children[0].children));
      });
    };
  }, []);

  return (
    <SliderContainer slideHeight={tallestSlide}>
      <Slider ref={SliderRef} {...settings}>
        {generateSlides()}
      </Slider>
    </SliderContainer>
  );
};

export default HomeSlider;
