import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';

import { mediaMin } from '~/styles/mediaQueries';

const animateChildren = ({ numChildren, mounted }) => {
  let childStyles = ``;
  for (let idx = 1; idx < numChildren; idx += 1) {
    childStyles += `
      &:nth-child(${idx}) {
        opacity: ${mounted ? '1' : '0'};
        transform: ${mounted ? 'translateY(0)' : 'translateY(-8px)'};
        transition: opacity 0.25s ease-in-out ${idx * 0.125}s, transform 0.25s ease-in-out ${idx * 0.125}s;
      }
    `;
  }
  return css`
    ${childStyles}
  `;
};

const animateChildrenImages = ({ numChildren, mounted }) => {
  let childStyles = ``;
  for (let idx = 2; idx < numChildren + 1; idx += 1) {
    childStyles += `
      &:nth-child(${idx - 1}) {
        opacity: ${mounted ? '1' : '0'};
        transition: opacity 1s ease-in-out ${idx * 0.5}s;
      }
    `;
  }
  return css`
    ${childStyles}
  `;
};

const bounceArrow = keyframes`
  0%{
    transform: translateX(0);
  }
  25%{
    transform: translateX(16px);
  }
  50%{
    transform: translateX(0);
  }
  100%{
    transform: translateX(0);
  }
`;

const ShowOuter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .back-arrow {
    animation: ${bounceArrow} 5s ease-in-out infinite;
  }
`;

const ShowInner = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column-reverse;
  margin: 24px 0;
  ${mediaMin('tabletLandscape')} {
    margin: 24px 0 128px 0;
    flex-direction: row;
  }
`;

const CopyColumn = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaMin('tabletLandscape')} {
    padding-right: 10%;
    width: 50%;
  }
`;

const Copy = styled.div`
  & > * {
    ${animateChildren}
  }
  ${mediaMin('tabletLandscape')} {
    position: sticky;
    top: 100px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  span,
  p {
    min-height: 24px;
  }
  h1 {
    margin: 0;
    font-size: 40px;
    font-weight: bold;
    line-height: 44px;
    margin: 16px 0;
    ${mediaMin('tabletLandscape')} {
      font-size: 55px;
      line-height: 60px;
    }
  }
  h2,
  h6 {
    font-family: Apercu;
    font-size: 15px;
    letter-spacing: 1px;
    line-height: 20px;
    text-transform: uppercase;
    margin: 0;
  }
  h3 {
    font-size: 28px;
    line-height: 32px;
    margin: 16px 0;
  }
  h4 {
    font-size: 20px;
    line-height: 24px;
    margin: 16px 0;
  }
  h5 {
    font-family: Apercu;
    font-size: 15px;
    letter-spacing: 1px;
    line-height: 20px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    padding: 0 10%;
    border: 1px solid #000;
    height: 40px;
    font-size: 15px;
    letter-spacing: 1px;
    line-height: 20px;
    text-decoration: none !important;
    margin: 16px 0 !important;
    &:hover {
      background-color: #000;
      color: #fff;
    }
    a {
      text-decoration: none;
    }
  }
  p {
    font-family: 'SangBleu Kingdom';
    font-size: 16px;
    line-height: 24px;
    margin: 8px 0;
    display: block;
    &:first-child {
      margin-top: 28px;
    }
  }
  blockquote {
    p {
      font-family: 'SangBleu Kingdom';
      font-weight: bold;
      font-style: italic;
    }
  }
  a {
    font-weight: 500;
    text-decoration: underline;
    margin: 0;
  }

  .row {
    display: flex;
    flex-direction: row;
    margin: 16px 0 0 0;
    ${mediaMin('tabletLandscape')} {
      margin: 0;
    }
  }

  .parking-btn {
    font-size: 1.4rem;
    border: 1px solid #000;
    background: none;
    padding: 10px 50px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 100ms ease;
  }

  .contact-link {
    display: block;
    border: none;
    padding: 0;
    margin: 16px 0 0 0;
    text-decoration: none;
    ${mediaMin('tabletLandscape')} {
      margin: 20px 0 0 0;
    }
    &:hover {
      background: transparent;
      color: #000;
    }
  }

  .parking-link {
    display: block;
    border: 1px solid #000;
    padding: 8px 16px;
    margin: 0;
    width: fit-content;
    text-decoration: none;
    margin: 1em 0;

    ${mediaMin('tabletLandscape')} {
      margin: 8px 0 0 0;
    }
    &:hover {
      transition: background 200ms ease, color 200ms ease;
      background: #000;
      color: #fff;
    }
  }

  .social-icon {
    border: none;
    padding: 0;
    margin: 8px 10px 0 0;
    ${mediaMin('tabletLandscape')} {
      margin: 20px 24px 0 0;
    }
    &:hover {
      background: transparent;
      color: #000;
    }
  }
`;

const HeroImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  opacity: ${props => (props.mounted ? '1' : '0')};
  transition: opacity 1s ease-in-out;
`;

const SmallImageContainer = styled.div`
  & > * {
    ${animateChildrenImages}
  }
  img {
    object-fit: scale-down;
  }
  ${mediaMin('tabletLandscape')} {
    display: flex;
    flex-wrap: wrap;
  }
`;

const SmallImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 50%;
  padding: 16px 8px 0 8px;
  ${props => (props.position ? 'padding-left: 0;' : 'padding-right: 0;')}
`;

const SmallBGImage = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: calc(50% - 8px);
  height: ${props => props.height}px;
  margin: 16px 8px 0 8px;
  ${props => (props.position ? 'margin-left: 0;' : 'margin-right: 0;')}
`;

const ImageColumn = styled.div`
  margin-bottom: 16px;
  display: ${props => (props.noDesktop ? 'none' : 'block')};
  ${mediaMin('tabletLandscape')} {
    margin-bottom: 0;
    width: 50%;
    display: block;
  }
  img {
    max-width: 100%;
  }
`;

const Images = styled.div`
  position: sticky;
  top: 100px;
`;

const MobileImages = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  ${mediaMin('tabletLandscape')} {
    display: none;
  }
`;

const InlineImg = styled.img`
  width: 100%;
`;
const InlineImage = props => {
  const { file, title } = props;
  return <InlineImg src={file.url} alt={title} />;
};

export {
  ShowOuter,
  ShowInner,
  CopyColumn,
  Copy,
  ImageColumn,
  HeroImage,
  SmallImageContainer,
  SmallImage,
  SmallBGImage,
  Images,
  InlineImage,
  MobileImages
};
