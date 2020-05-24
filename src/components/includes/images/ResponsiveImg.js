/* eslint-disable react/prop-types */
import React from 'react';
import styled from '@emotion/styled';

import { mediaMin } from '~/styles/mediaQueries';

const ResponsiveImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  ${mediaMin('tabletLandscape')} {
    width: ${props => props.desktopWidth || 'auto'};
  }
`;

const ResponsiveImage = ({ ariaHidden, srcPath, imgClass, imgAlt, onClickProp, onLoadProp, refProp, desktopWidth }) => {
  const defaultPath = require(`~/assets/images/${srcPath}.jpg`);

  const srcSetPaths = {
    '400w': require(`~/assets/images/${srcPath}_400.jpg`),
    '800w': require(`~/assets/images/${srcPath}_800.jpg`),
    '1100w': require(`~/assets/images/${srcPath}_1100.jpg`),
    '1500w': require(`~/assets/images/${srcPath}_1500.jpg`),
    '2000w': require(`~/assets/images/${srcPath}_2000.jpg`),
    '2500w': require(`~/assets/images/${srcPath}_2500.jpg`),
  };

  const srcSet = Object.entries(srcSetPaths)
    .map(([name, path]) => `${path} ${name}`)
    .join(', ');

  return (
    <ResponsiveImg
      src={defaultPath}
      srcSet={srcSet}
      alt={imgAlt}
      ref={refProp || null}
      className={`responsive-image ${imgClass} `}
      onClick={onClickProp}
      aria-hidden={ariaHidden === undefined ? false : ariaHidden}
      onLoad={onLoadProp}
      desktopWidth={desktopWidth}
    />
  );
};
export default ResponsiveImage;
