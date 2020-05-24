// const TestDiv = styled.div`
//   padding: 32px;
//   background-color: hotpink;
//   font-size: 24px;
//   border-radius: 4px;
//   color: black;
//   font-weight: bold;
//   ${mediaMin('phone')} {
//     font-size: 240px;
//   },
// `;

const breakpoints = {
  phone: 375,
  phoneLarge: 414,
  phoneXL: 550,
  tablet: 768,
  tabletLandscape: 1050,
  desktopSmall: 1250,
  desktop: 1440,
  desktopLarge: 1920,
  desktopXLarge: 2048,
};

const mediaMax = n => {
  const bpArray = Object.keys(breakpoints).map(key => [key, breakpoints[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (max-width: ${size}px)`];
    return acc;
  }, []);

  return result;
};

const mediaMin = n => {
  const bpArray = Object.keys(breakpoints).map(key => [key, breakpoints[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (min-width: ${size}px)`];
    return acc;
  }, []);

  return result;
};

export { mediaMax, mediaMin };
