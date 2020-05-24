/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Context from '~/context/Context';
import Header from '~/components/includes/header';
import Footer from '~/components/includes/footer';
import CTA from '~/components/includes/cta';

const Layout = ({ children }) => {
  const context = useContext(Context);
  const { darkTheme } = context;
  return (
    <>
      <CTA />
      <Header />
      <div className={`container ${darkTheme ? 'dark' : ''}`}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
