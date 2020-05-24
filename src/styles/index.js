import { Global } from '@emotion/core';

import base from './base';
import containers from './containers';
import fonts from './fonts';
import modal from './modal';
import typography from './typography';

const GlobalStyles = () => <Global styles={[base, containers, fonts, modal, typography]} />;

export default GlobalStyles;
