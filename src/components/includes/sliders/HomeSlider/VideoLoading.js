import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const spinAnimation = keyframes`
  25% { 
    transform: translateX(42px) rotate(-90deg) scale(0.5);
  } 50% { 
    transform: translateX(42px) translateY(42px) rotate(-179deg);
  } 50.1% { 
    transform: translateX(42px) translateY(42px) rotate(-180deg);
  } 75% { 
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  } 100% { 
    transform: rotate(-360deg);
  }
`;

const LoadingDiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  z-index: 999;
  display: flex;
  align-items: center;
  opacity: ${props => (!props.videoLoaded ? 1 : 0)};
  visibility: ${props => (!props.videoLoaded ? 'visible' : 'hidden')};
  transition: all 300ms ease;

  .loader {
    margin: 100px auto;
    width: 40px;
    height: 40px;
    position: relative;
    .cube1,
    .cube2 {
      background-color: #000;
      width: 15px;
      height: 15px;
      position: absolute;
      top: 0;
      left: 0;

      animation: ${spinAnimation} 1.8s infinite ease-in-out;
    }
    .cube2 {
      animation-delay: -0.9s;
    }
  }
`;

const VideoLoading = ({ videoLoaded }) => {
  return (
    <LoadingDiv videoLoaded={videoLoaded}>
      <div className="loader">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
    </LoadingDiv>
  );
};

export default VideoLoading;
