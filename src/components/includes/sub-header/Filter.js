import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import Context from '~/context/Context';

import { mediaMin } from '~/styles/mediaQueries';

const FilterMenu = styled.div`
  width: 100%;
  display: flex;
  background-color: #000;
  justify-content: center;
  height: 32px;
  position: sticky;
  z-index: 50;
  top: 84px;
  ${mediaMin('tabletLandscape')} {
    top: 100px;
  }
`;

const FilterButton = styled.button`
  color: #fff;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 16px;
  border-bottom: 4px solid transparent;
  border-bottom: ${props => (props.active ? '4px solid #fff' : '4px solid transparent')};
  font-size: 12px;
  line-height: 12px;
  ${mediaMin('tabletLandscape')} {
    font-size: 15px;
    letter-spacing: 1px;
    line-height: 20px;
  }
`;

const PageTitle = styled.h2`
  white-space: pre-line;
  font-size: 40px;
  line-height: 44px;
  margin: 0 0 24px 0;
  ${mediaMin('tabletLandscape')} {
    margin: 0 0 32px 0;
    font-size: 72px;
    line-height: 80px;
  }
`;

const Filter = ({ filters, title, contextTitle }) => {
  const { activeFilters, updateActiveFilters } = useContext(Context);

  const generateFilters = () => {
    const activeFilter = activeFilters[contextTitle];

    return filters.map(filter => {
      return (
        <FilterButton
          active={activeFilter === filter}
          onClick={() => {
            updateActiveFilters(contextTitle, filter);
            updateURL(filter);
          }}
          key={filter}
          dangerouslySetInnerHTML={{ __html: filter }}
        />
      );
    });
  };

  const updateURL = filter => {
    const newurl =
      window.location.protocol + '//' + window.location.host + window.location.pathname + `?filter=${filter}`;
    window.history.pushState({ path: newurl }, '', newurl);
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const filter = query.get('filter');
    if (filter) {
      updateActiveFilters(
        window.location.pathname.slice(1),
        filter.toUpperCase() === 'POP-UP' ? 'POP&#8209;UP' : filter.toUpperCase()
      );
    }
  }, []);

  return (
    <>
      <PageTitle>{title}</PageTitle>
      <FilterMenu>{generateFilters()}</FilterMenu>
    </>
  );
};

export default Filter;
