import { OPTIONS, saveOptions } from '../options';
import { TimeAndDate } from './TimeAndDate';
import { Greeting } from './Greeting';
import { Weather } from './Weather';
import { Quote } from './Quote';
import { ToDo } from './ToDo';

const settingsIcon = document.querySelector('.settings i');
const settingsBlock = document.querySelector('.settings__block');
const hideBlocks = document.querySelector('.hide-blocks');
const langSelect = document.querySelector('.language>select');
const picOptions = document.querySelector('.picture select');
const tagInput = document.querySelector('.picture__tags ul input');
const tagList = document.querySelector('.picture__tags ul');
const hideBlockInputs = document.querySelectorAll('.hide-blocks input');

const initSettings = () => {
  langSelect.value = OPTIONS.lang;
  picOptions.value = OPTIONS.picSource;
};

const toggleSettings = () => {
  settingsBlock.classList.toggle('show-settings');
  settingsIcon.classList.toggle('active-icon');
};

const closeSettingsBlock = e => {
  if (!e.target.closest('.settings')) {
    settingsBlock.classList.remove('show-settings');
    settingsIcon.classList.remove('active-icon');
  }
};

const changeLanguage = e => {
  OPTIONS.lang = e.target.value;
  saveOptions();
  TimeAndDate();
  Greeting();
  Weather();
  Quote();
  ToDo();
};

const hideBlock = e => {
  const blockName = e.target.dataset.blockName;
  const el = document.querySelector(`.${blockName}`);
  const isHide = !e.target.checked;

  if (isHide) {
    el.classList.add('hide-app-block');
  } else {
    el.classList.remove('hide-app-block');
  }
};

settingsIcon.addEventListener('click', toggleSettings);
document.body.addEventListener('click', closeSettingsBlock);

langSelect.addEventListener('change', changeLanguage);

hideBlockInputs.forEach(el => el.addEventListener('input', hideBlock));

export const Settings = () => {
  initSettings();
};
