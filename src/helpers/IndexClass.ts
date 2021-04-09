export class IndexClass {
  _index: number;
  _parentIndex: IndexClass | null = null;
  _level: number = 0;

  constructor(index:number, parentIndex?:IndexClass) {
    if (parentIndex) {
      this._parentIndex = parentIndex;
      this._level = parentIndex.level + 1; 
    }
    this._index = index;
  }
  get level():number {
    return this._level;
  }

  get index():number {
    return this._index;
  }

  get parent():(IndexClass | null) {
    return this._parentIndex;
  }

  public toString():string {
    if (this.parent) {
      return `${this.parent.toString()}.${this.index}`;
    }
    return `${this.index}`;
  }

}
