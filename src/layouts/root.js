import React from 'react';

import GlobalStyles from '~/styles';
import ContextProvider from '~/provider/ContextProvider';

const RootLayout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <ContextProvider>{children}</ContextProvider>
    </>
  );
};

export default RootLayout;
