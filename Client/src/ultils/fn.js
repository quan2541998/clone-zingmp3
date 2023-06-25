export const getArray = (start, end, number) => {
  let output = [];
  const limit = start > end ? number : end;
  for (let i = start; i <= limit; i++) {
    output.push(i);
  }
  if (start > end) {
    for (let i = 0; i <= end; i++) {
      output.push(i);
    }
  }

  return output;
};

export const handleNumber = (number) => {
  if (number >= 1000000) {
    const formattedNumber = (number / 1000000).toFixed(1);
    return `${formattedNumber}M`;
  } else if (number >= 1000 && number < 1000000) {
    const formattedNumber = (number / 1000).toFixed(1);
    return `${formattedNumber}K`;
  } else if (number < 1000) {
    return number;
  }
};
