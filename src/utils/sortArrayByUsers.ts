type ObjectValue = {
  [key: string]: number;
}

type ArrayItem = {
  [key: string]: ObjectValue;
}

type SortedArray = Array<{
  [key: string]: ObjectValue;
}>;

export const sortArrayByUsers = (array: ArrayItem[]): SortedArray => {
  const sortedArray = [Object.entries(array[0])
    .sort(([, a], [, b]) => a.users - b.users) 
    .reduce((obj: any, [key, value]) => { 
      obj[key] = value;
      return obj;
    }, {})
  ];

  return sortedArray;
}





