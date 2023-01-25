export const OPTIONS = {
  name: '',
  city: 'Kyiv',
  lang: 'en',
  picSource: 'github',
  hiddenBlocks: [],
  todoList: [],
  picTags: [],
};

(function loadOptions() {
  Object.keys(OPTIONS).forEach(key => {
    const item = localStorage.getItem(key);
    const isArray = Array.isArray(OPTIONS[key]);

    if (item && !isArray) OPTIONS[key] = item;

    if (isArray && item) OPTIONS[key] = item.split(',');
  });
})();

export const saveOptions = () => {
  Object.keys(OPTIONS).forEach(key => {
    localStorage.setItem(key, OPTIONS[key]);
  });
};
