/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import RootLayout from '~/layouts/root';

export const wrapRootElement = ({ element }) => <RootLayout>{element}</RootLayout>;
