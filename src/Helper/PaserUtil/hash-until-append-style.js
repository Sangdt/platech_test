
import { selectAll } from 'hast-util-select';

// const { selectAll } = selector;

export default additions => {
  const adders = Object.entries(additions).map(adder);
  return node => adders.forEach(a => a(node));
};

const adder = ([selector, styleString]) => {
  const writer = write(styleString);
  return node => selectAll(selector, node).forEach(writer);
};

const write = styleString => ({ properties }) => {
  if (styleString && styleString !== '') {
    if (!properties.style) properties.style = styleString;
    else properties.style += ` ${styleString}`;
  }
};