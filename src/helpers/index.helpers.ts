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
  return parseInt(indexString.slice(indexString.lastIndexOf('.')) + 1);
}

export const createIndexString = (index:number, parentIndex:string|null) => {
  if (parentIndex) {
    return `${parentIndex}.${index}`;
  }
  return index.toString();
}

export const getIndices = (indexString: string) => {
  return indexString.split('.').map( v => parseInt(v));
}

export const getLevel = (indexString: string) => {
  return indexString.replace('.','').length;
}

export const createIndexStringFromIndices = (indices:number[]) => {
  return indices.join('.');
}

export const shiftLevel = (indexString: string, shiftValue:number, level?:number) => {
  let indices = getIndices(indexString);
  if (level) {
    indices[level - 1] += shiftValue;
  } else {
    indices[indices.length - 1] += shiftValue;
  }
  return createIndexStringFromIndices(indices);
}