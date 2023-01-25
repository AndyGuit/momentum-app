export const getTimeIndex = () => {
  const curTime = new Date().getHours();
  return Math.floor(curTime / 6);
};

export const debouncer = (func, wait) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};
