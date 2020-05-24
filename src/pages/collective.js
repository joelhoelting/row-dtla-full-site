import React, { useState, useCallback, useContext, useEffect } from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Masonry from 'react-masonry-component';

import Context from '~/context/Context';
import SEO from '~/components/seo';
import Filter from '~/components/includes/sub-header/Filter';
import CollectiveItemCard from '~/components/pages/collective/CollectiveItemCard';
import { mediaMin } from '~/styles/mediaQueries';

const CollectiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .masonry {
    padding: 0;
    margin: 20px 0 0 0;
    list-style-type: none;
    ${mediaMin('tablet')} {
      margin: 40px 0 160px 0;
    }
  }
`;

const LoadMoreButton = styled.button`
  opacity: ${props => (props.visible ? '1' : '0')};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  border: 1px solid #000;
  height: 40px;
  margin: 0 auto 120px auto;
  font-size: 15px;
  letter-spacing: 1px;
  line-height: 20px;
  cursor: pointer;
  background-color: #fff;
  width: 75%;
  ${mediaMin('tabletLandscape')} {
    display: none;
  }
`;

const masonryOptions = {
  transitionDuration: '0.25s',
  columnWidth: '.small-square',
  gutter: 40
};

const CollectivePage = ({ data }) => {
  const { activeFilters } = useContext(Context);

  const collectiveItems = data.allContentfulCollectiveItem.nodes;
  const [loaded, setLoaded] = useState(10);
  const [collectiveList, setCollectiveList] = useState([]);
  const [listLength, setListLength] = useState(0);

  const loadMore = useCallback(() => {
    setLoaded(loaded + 10);
  }, [loaded, setLoaded]);

  const generateCollectiveItemCards = useCallback(() => {
    const filter = activeFilters.collective;

    let filteredCollectiveItems = collectiveItems.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

    const filterCallback = collectiveItem => {
      return collectiveItem.type === filter.replace('&#8209;', '-');
    };

    if (filter !== 'ALL') {
      filteredCollectiveItems = filteredCollectiveItems.filter(filterCallback);
    }

    setListLength(filteredCollectiveItems.length);
    if (typeof window !== `undefined`) {
      return filteredCollectiveItems
        .slice(0, window.innerWidth > 1024 ? collectiveItems.length : loaded)
        .map((collectiveItem, idx) => {
          return <CollectiveItemCard key={`collective-item-card-${idx}`} idx={idx} cardData={collectiveItem} />;
        });
    }
  }, [activeFilters, collectiveItems, loaded]);

  useEffect(() => {
    setCollectiveList(generateCollectiveItemCards());
  }, []);

  useEffect(() => {
    setCollectiveList(generateCollectiveItemCards());
  }, [activeFilters, loaded]);

  return (
    <>
      <SEO title="Collective" />
      <CollectiveWrapper>
        <Filter
          title={'Discover\nROW DTLA'}
          contextTitle="collective"
          filters={['ALL', 'DINE', 'SHOP', 'LIFESTYLE', 'POP&#8209;UP']}
        />
        <Masonry options={masonryOptions} className="masonry">
          {collectiveList}
          <CollectiveItemCard placeholder />
        </Masonry>
        <LoadMoreButton onClick={loadMore} visible={loaded < listLength}>
          LOAD MORE
        </LoadMoreButton>
      </CollectiveWrapper>
    </>
  );
};

export default CollectivePage;

export const query = graphql`
  query CollectiveEntriesQuery {
    allContentfulCollectiveItem {
      nodes {
        displayTitle {
          displayTitle
        }
        smallSquareCardBackgroundPosition
        largeSquareCardBackgroundPosition
        largeHorizontalCardBackgroundPosition
        title
        type
        subtitle
        slug
        image {
          file {
            url
          }
        }
        id
      }
    }
  }
`;
