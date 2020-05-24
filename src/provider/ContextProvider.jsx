/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from 'react';

import Context from '~/context/Context';

const getCookie = name => {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const setCookie = (name, value, days) => {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

const ContextProvider = props => {
  const [CTAActive, setCTAActive] = useState(true);
  const [CTAViewed, setCTAViewed] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [darkTheme, setDarkTheme] = useState(false);

  const [activeFilters, setActiveFilters] = useState({ collective: 'ALL', events: 'ALL', news: 'ALL' });

  const updateActiveFilters = useCallback(
    (property, value) => {
      setActiveFilters({ ...activeFilters, [property]: value });
    },
    [activeFilters]
  );

  const closeCTA = () => {
    setCTAActive(false);
    setCTAViewed(true);
    setCookie('ctaSubmitted', true, 30);
  };

  useEffect(() => {
    if (getCookie('ctaSubmitted')) {
      console.log('Submission Found');
      setCTAActive(false);
      setCTAViewed(true);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        ...props,
        CTAActive,
        CTAViewed,
        closeCTA,
        activeSlide,
        setActiveSlide,
        darkTheme,
        setDarkTheme,
        activeFilters,
        updateActiveFilters
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default ContextProvider;
