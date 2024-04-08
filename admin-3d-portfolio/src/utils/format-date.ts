export const formatDate = (date: string) => {
  const dateArr = date.split('-');
  return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
};
