import React, { useState, useCallback, useContext, useEffect } from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Masonry from 'react-masonry-component';
import moment from 'moment';

import SEO from '~/components/seo';

import Context from '~/context/Context';

import { mediaMin } from '~/styles/mediaQueries';

import Filter from '~/components/includes/sub-header/Filter';
import EventCard from '~/components/pages/events/EventCard';

const masonryOptions = {
  transitionDuration: '0.25s',
  gutter: '.gutter-sizer',
  horizontalOrder: true
};

const EventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .masonry {
    margin: calc(64px / 3) 0 0 0;
    padding: 0;
    list-style-type: none;
    .gutter-sizer {
      width: calc(64px / 3);
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
    width: 25%;
  }
  &:hover {
    color: #fff;
    background-color: #000;
  }
`;

const EventsPage = ({ data }) => {
  const { activeFilters } = useContext(Context);

  const [loaded, setLoaded] = useState(12);
  const [listLength, setListLength] = useState(0);
  const [eventList, setEventList] = useState([]);
  const events = data.allContentfulEvent.nodes;

  const generateEvents = useCallback(() => {
    const filter = activeFilters.events;

    let filteredEvents = events;
    if (filter === 'ARCHIVE') {
      filteredEvents = filteredEvents.filter(event => {
        const today = new Date();
        const yesterday = today.setDate(today.getDate() - 1);
        const compareDate = event.endDate || event.date;
        return moment(yesterday).isSameOrAfter(compareDate);
      });
      filteredEvents = filteredEvents.sort((a, b) => {
        const aCompare = a.endDate || a.date;
        const bCompare = b.endDate || b.date;
        return new Date(bCompare) - new Date(aCompare);
      });
    } else {
      filteredEvents = filteredEvents.filter(event => {
        const today = new Date();
        const yesterday = today.setDate(today.getDate() - 1);
        const compareDate = event.endDate || event.date;
        return moment(yesterday).isSameOrBefore(compareDate);
      });
      filteredEvents = filteredEvents.sort((a, b) => {
        const aCompare = a.date;
        const bCompare = b.date;
        return new Date(aCompare) - new Date(bCompare);
      });
      if (filter !== 'ALL') {
        filteredEvents = filteredEvents.filter(event => event.type === filter);
      }
    }
    setListLength(filteredEvents.length);
    return filteredEvents.slice(0, loaded).map(event => {
      const { id } = event;
      return <EventCard className="event" event={event} key={id} />;
    });
  }, [activeFilters, events, loaded, listLength]);

  const loadMore = useCallback(() => {
    setLoaded(loaded + 8);
  }, [setLoaded, loaded]);

  useEffect(() => {
    setEventList(generateEvents());
  }, []);

  useEffect(() => {
    setEventList(generateEvents());
  }, [activeFilters, loaded]);

  return (
    <>
      <SEO title="Events" />
      <EventsWrapper>
        <Filter
          title={"What's on at\nROW DTLA"}
          contextTitle="events"
          filters={['ALL', 'FOOD TRUCKS', 'EVENTS', 'ARCHIVE']}
        />
        <Masonry options={masonryOptions} className="masonry">
          {eventList}
          <div className="gutter-sizer" />
        </Masonry>
        <LoadMoreButton onClick={loadMore} visible={loaded < listLength}>
          LOAD MORE
        </LoadMoreButton>
      </EventsWrapper>
    </>
  );
};

export default EventsPage;

export const query = graphql`
  {
    allContentfulEvent(sort: { fields: date, order: ASC }) {
      nodes {
        date
        endDate
        id
        slug
        title
        type
        image {
          file {
            url
          }
          description
        }
        body {
          body
        }
        endTime
        startTime
      }
    }
  }
`;
