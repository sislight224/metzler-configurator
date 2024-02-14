const getNearestFreeRank = (disabledMarks: number[]): number => {
  const arr = [1, 2, 3];
  for (let i = 0; i < arr.length; i++) {
    if (!disabledMarks.includes(arr[i])) {
      return arr[i];
    }
  }

  return 0;
};

export default getNearestFreeRank;
