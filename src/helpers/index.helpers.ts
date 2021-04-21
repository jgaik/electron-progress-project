export const extractParent = (indexString:string) => {
  if (indexString.indexOf('.') < 0) {
    return null;
  }
  return indexString.slice( 0, indexString.lastIndexOf('.'));
}

export const extractIndex = (indexString:string) => {
  if (indexString.indexOf('.') < 0) {
    return parseInt(indexString);
  }
  return parseInt(indexString.slice(indexString.lastIndexOf('.') + 1));
}

export const splitIndex= (indexString:string) : { parent:string|null, index:number} => {
  const splitIndex = indexString.lastIndexOf('.');
  if (splitIndex < 0) {
    return {
      parent:null,
      index:parseInt(indexString)
    };
  }
  return {
    parent: indexString.slice(0,splitIndex),
    index: parseInt(indexString.slice(splitIndex + 1))
  };
}

export const createIndexString = (splitIndex:{ index:number; parent:string|null }) => {
  if (splitIndex.parent) {
    return `${splitIndex.parent}.${splitIndex.index}`;
  }
  return splitIndex.index.toString();
}

export const getIndices = (indexString: string) => {
  return indexString.split('.').map( v => parseInt(v));
}

export const getLevel = (indexString: string) => {
  return indexString.split('.').length - 1;
}

export const createIndexStringFromIndices = (indices:number[]) => {
  return indices.join('.');
}

export const shiftLevel = (indexString: string, shiftValue:number, level?:number) => {
  let indices = getIndices(indexString);
  if (level) {
    indices[level] += shiftValue;
  } else {
    indices[indices.length - 1] += shiftValue;
  }
  return createIndexStringFromIndices(indices);
}

export const extractLevel = (indexString: string, level:number) => {
  if (level > getLevel(indexString)) {
    return indexString;
  }
  const indices = getIndices(indexString);
  return createIndexStringFromIndices(indices.slice(0, level + 1));
}