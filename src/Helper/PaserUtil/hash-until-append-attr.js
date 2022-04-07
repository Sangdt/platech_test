import { selectAll } from 'hast-util-select';

// const { selectAll } = selector;

export default additions => {
    const adders = Object.entries(additions).map(adder);
    return node => adders.forEach(a => a(node));
};

const adder = ([selector, { attrName, attrValue }]) => {
    const writer = write(attrName, attrValue);
    return node => selectAll(selector, node).forEach(writer);
};

const write = (attrName, attrValue) => ({ properties }) => {
    if ((attrName && attrName !== '') && (attrValue && attrValue !== '')) {
        if (!properties[attrName]) properties[attrName] = attrValue;
        else properties[attrName] += ` ${attrValue}`;
    }
};