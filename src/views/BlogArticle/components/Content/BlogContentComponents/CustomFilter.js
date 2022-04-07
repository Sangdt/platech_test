import { Filter } from 'interweave';

class LinkFilter extends Filter {
  attribute(name, value) {
    console.log('GOT ONE',name,value);
    if (name === 'imageList') {
      console.log('GOT ONE',value);
      return value;
    }
    return value;
  }
  node(name, node) {
    if (name === 'li') {
      node.setAttribute('target', '_blank');
    }

    return node;
  }
}

// const filter = new LinkFilter();

export default LinkFilter;