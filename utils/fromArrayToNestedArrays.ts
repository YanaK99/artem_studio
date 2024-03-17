export const fromArrayToNestedArrays = (array: Array<any>, length: number) => {
  const endArray = [];
  let interimArray: any[] = [];
  for (let i = 0; i < array.length; i++) {
    if ((i !== 0 && (i+1) % length === 0) || i === array.length - 1) {
      interimArray.push(array[i]);
      endArray.push(interimArray);
      interimArray = [];
    } else {
      interimArray.push(array[i]);
    }
  }
  return endArray;
};
