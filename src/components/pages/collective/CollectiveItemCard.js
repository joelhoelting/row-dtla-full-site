import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Fade from 'react-reveal/Fade';

import { mediaMin } from '~/styles/mediaQueries';
import placeholderImg from '~/images/backup/backup_image.jpg';

const CollectiveItemCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-style: outset;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  visibility: ${props => (props.placeholder ? 'hidden' : 'visible')};
  ${mediaMin('tablet')} {
    margin-bottom: 40px;
  }
  ${mediaMin('tabletLandscape')} {
    transition: box-shadow 0.5s ease, border 0.5s ease;
    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
      .image-container {
        transform: scale(1.025);
        transform-origin: center;
        border: none !important;
      }
    }
  }
  &.small-square {
    ${mediaMin('tablet')} {
      width: calc(50% - 20px);
    }
    ${mediaMin('tabletLandscape')} {
      width: calc(25% - 30px);
    }
    .image-container {
      height: 100%;
      padding-bottom: 100%;
    }
  }
  &.large-square {
    ${mediaMin('tabletLandscape')} {
      width: calc(50% - 20px);
    }
    .image-container {
      height: 100%;
      padding-bottom: 100%;
    }
  }
  &.large-horizontal {
    ${mediaMin('tabletLandscape')} {
      width: calc(50% - 20px);
    }
    .image-container {
      height: 100%;
      padding-bottom: 100%;
      ${mediaMin('tablet')} {
        height: 50%;
        padding-bottom: 50%;
      }
    }
  }
  .image-container {
    background-image: ${props => `url(${props.imgsrc})`};
    background-size: cover;
    background-position: ${props => props.backgroundCoverCSS};
    transition: transform 0.5s ease-in-out;
    border: none !important;
  }
  .description-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 172px;
    ${mediaMin('tabletLandscape')} {
      height: 200px;
    }
    ${mediaMin('desktopLarge')} {
      height: 172px;
    }

    .title-container {
      margin: 0;
      h2 {
        margin: 0;
        font-weight: bold;
        font-size: 32px;
        line-height: 36px;
        ${mediaMin('tabletLandscape')} {
          font-size: 28px;
          line-height: 32px;
        }
        ${mediaMin('desktopSmall')} {
          font-size: 32px;
          line-height: 36px;
        }
        ${mediaMin('desktop')} {
          font-size: 40px;
          line-height: 44px;
        }
      }
    }
    span {
      margin: 0 0 16px 0;
    }
  }
`;

const parseTitle = title => {
  const titleArray = title.split('\n');

  return (
    <div className="title-container">
      {titleArray.map(el => (
        <h2 key={el}>{el}</h2>
      ))}
    </div>
  );
};

export const backgroundImageHashMap = {
  'small-square': 'smallSquareCardBackgroundPosition',
  'large-square': 'largeSquareCardBackgroundPosition',
  'large-horizontal': 'largeHorizontalCardBackgroundPosition'
};

const getCardClass = idx => {
  let gridPosition = idx % 8;

  const classObj = {
    0: 'large-square',
    1: 'large-horizontal',
    2: 'small-square',
    3: 'small-square',
    4: 'large-horizontal',
    5: 'large-square',
    6: 'small-square',
    7: 'small-square'
  };

  return classObj[gridPosition];
};

const CollectiveItemCard = ({ cardData, idx, placeholder }) => {
  if (placeholder) {
    return <CollectiveItemCardWrapper className="small-square" key={`collective-item-${idx}`} placeholder />;
  } else {
    const { slug, image, subtitle, displayTitle } = cardData;

    return (
      <CollectiveItemCardWrapper
        className={`${getCardClass(idx)}`}
        key={`collective-item-${idx}`}
        imgsrc={image ? image.file.url : placeholderImg}
        backgroundCoverCSS={cardData[backgroundImageHashMap[getCardClass(idx)]] || 'center'}
      >
        {
          <Fade>
            <Link to={`/collective/${slug}`}>
              <div className="image-container" title={image ? image.description : 'Placeholder Image'} />
              <div className="description-container">
                <span>{subtitle}</span>
                {displayTitle && parseTitle(displayTitle.displayTitle)}
              </div>
            </Link>
          </Fade>
        }
      </CollectiveItemCardWrapper>
    );
  }
};

export default CollectiveItemCard;
