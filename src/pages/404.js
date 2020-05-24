import React, { useContext, useEffect } from 'react';

import Context from '~/context/Context';
import Layout from '~/layouts';
import SEO from '~/components/seo';

const NotFoundPage = () => {
  const context = useContext(Context);
  const { setDarkTheme } = context;

  useEffect(() => {
    setDarkTheme(false);
  }, []);

  return (
    <Layout>
      <SEO title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;
