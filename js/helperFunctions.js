export const getTimeIndex = () => {
  const curTime = new Date().getHours();
  return Math.floor(curTime / 6);
};

export const debouncer = (func, wait) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(func, wait);
  };
};
