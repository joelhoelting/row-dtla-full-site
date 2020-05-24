import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';

import SEO from '~/components/seo';
import HomeSlider from '~/components/includes/sliders/HomeSlider';
import HomeMobile from '~/components/pages/home/HomeMobile';

const IndexPage = ({ data }) => {
  const { allContentfulHomeSlides } = data;
  const [isMobile, setIsMobile] = useState(false);
  const checkWindow = () => {
    if (window && window.innerWidth > 1024) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  };
  useEffect(() => {
    checkWindow();
    window.addEventListener('resize', () => {
      checkWindow();
    });
    return () => {
      window.removeEventListener('resize', () => {
        checkWindow();
      });
    };
  }, []);
  return (
    <>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      {isMobile ? (
        <HomeMobile slideArray={allContentfulHomeSlides.nodes} />
      ) : (
        <HomeSlider slideArray={allContentfulHomeSlides.nodes} />
      )}
    </>
  );
};

export const query = graphql`
  {
    allContentfulHomeSlides(sort: { order: ASC, fields: order }) {
      nodes {
        order
        contentful_id
        linkName
        linkUrl
        sectionName
        style
        title
        body
        autoplay
        videoUrl
        videoType
        videoPlaceholder {
          file {
            url
          }
        }
        heroImage {
          description
          title
          file {
            url
          }
        }
      }
    }
  }
`;

export default IndexPage;
