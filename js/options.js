export const OPTIONS = {
  name: '',
  city: '',
  lang: 'en',
  picSource: 'github',
  hiddenBlocks: [],
  todoList: [],
};

(function loadOptions() {
  Object.keys(OPTIONS).forEach(key => {
    const item = localStorage.getItem(key);
    if (item) {
      OPTIONS[key] = item;
    }
  });
})();

export const saveOptions = () => {
  Object.keys(OPTIONS).forEach(key => {
    localStorage.setItem(key, OPTIONS[key]);
  });
};
