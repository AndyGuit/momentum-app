import { OPTIONS, saveOptions } from '../options';
import { translations } from '../translations';
import { TimeAndDate } from './TimeAndDate';
import { Greeting } from './Greeting';
import { Weather } from './Weather';
import { Quote } from './Quote';
import { ToDo } from './ToDo';
import { setBackground } from './SliderBackground';

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

  if (OPTIONS.hiddenBlocks.length) {
    OPTIONS.hiddenBlocks.forEach(blockName => {
      const input = document.querySelector(`[data-block-name="${blockName}"]`);
      const el = document.querySelector(`.${blockName}`);

      input.checked = false;
      el.classList.add('hide-app-block');
    });
  }
};

const translateSettings = () => {
  const t = translations.settings;

  const languageText = document.querySelector('.language p');
  const picSourceText = document.querySelector('.picture__options p');
  const tagHeader = document.querySelector('.picture__tags-header p');
  const tagDesc = document.querySelector('.picture__tags > p');
  const settingsHeader = document.querySelector('.settings-header');
  const blockNames = hideBlocks.querySelectorAll('label');

  languageText.textContent = t.language[OPTIONS.lang];
  picSourceText.textContent = t.picSource[OPTIONS.lang];
  tagHeader.textContent = t.tagHeader[OPTIONS.lang];
  tagDesc.innerHTML = t.tagDesc[OPTIONS.lang];
  settingsHeader.textContent = t.header[OPTIONS.lang];

  blockNames.forEach(block => {
    const blockEl = document.querySelector(`label[for="${block.htmlFor}"]`);
    const blockTranslation = t.blockNames[block.htmlFor];
    blockEl.textContent = blockTranslation[OPTIONS.lang];
  });
};

translateSettings();

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
  translateSettings();
  TimeAndDate();
  Greeting();
  Weather();
  Quote();
  ToDo();
};

const toggleBlock = e => {
  const blockName = e.target.dataset.blockName;
  const el = document.querySelector(`.${blockName}`);
  const isHide = !e.target.checked;

  if (isHide) {
    el.classList.add('hide-app-block');
    OPTIONS.hiddenBlocks.push(blockName);
    saveOptions();
  } else {
    el.classList.remove('hide-app-block');
    const index = OPTIONS.hiddenBlocks.indexOf(blockName);
    OPTIONS.hiddenBlocks.splice(index, 1);
    saveOptions();
  }
};

const changePictureSource = e => {
  OPTIONS.picSource = e.target.value;
  saveOptions();
  setBackground();
};

settingsIcon.addEventListener('click', toggleSettings);
document.body.addEventListener('click', closeSettingsBlock);

langSelect.addEventListener('change', changeLanguage);

hideBlockInputs.forEach(el => el.addEventListener('input', toggleBlock));

picOptions.addEventListener('change', changePictureSource);
export const Settings = () => {
  initSettings();
};
