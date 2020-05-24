const path = require(`path`);
const slash = require(`slash`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const collectiveShowTemplate = path.resolve('./src/templates/collectiveShow.js');
  const eventShowTemplate = path.resolve('./src/templates/eventShow.js');
  const newsShowTemplate = path.resolve('./src/templates/newsShow.js');

  // Collective Entries
  const collectiveItems = await graphql(`
    {
      allContentfulCollectiveItem {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  collectiveItems.data.allContentfulCollectiveItem.edges.forEach(edge => {
    const { slug, id } = edge.node;

    createPage({
      path: `/collective/${slug}`,
      component: slash(collectiveShowTemplate),
      context: {
        slug,
        id,
      },
    });
  });

  // Events
  const eventItems = await graphql(`
    {
      allContentfulEvent {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  eventItems.data.allContentfulEvent.edges.forEach(edge => {
    const { slug, id } = edge.node;

    createPage({
      path: `/events/${slug}`,
      component: slash(eventShowTemplate),
      context: {
        slug,
        id,
      },
    });
  });

  // News Entries
  const newsEntries = await graphql(`
    {
      allContentfulNewsItem {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  newsEntries.data.allContentfulNewsItem.edges.forEach(edge => {
    const { slug, id } = edge.node;

    createPage({
      path: `/news/${slug}`,
      component: slash(newsShowTemplate),
      context: {
        slug,
        id,
      },
    });
  });
};
