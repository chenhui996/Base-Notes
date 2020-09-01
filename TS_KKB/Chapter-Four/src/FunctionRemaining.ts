interface IObj {
  [key: string]: any;
}
function merge(target: IObj, ...other: Array<IObj>) {
  return other;
}
let newObj = merge({ x: 1 }, { y: 2 }, { z: 3 });
