export const rtfBodyToMetaDescription = parsedRTF => {
  const parentNodeWhiteList = ['paragraph'];
  const childNodeWhiteList = ['text'];
  let mainString = '';

  parsedRTF.content.forEach(parentNode => {
    if (parentNodeWhiteList.includes(parentNode.nodeType)) {
      parentNode.content.forEach(childNode => {
        if (childNodeWhiteList.includes(childNode.nodeType)) {
          mainString === '' ? (mainString += childNode.value) : (mainString += ' ' + childNode.value);
        }
      });
    }
  });

  return mainString.slice(0, 200);
};
