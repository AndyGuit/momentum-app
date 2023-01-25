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

const renderPicTag = tag => {
  const liTag = `<li>${tag}<span class="close-tag">&#10005;</span></li>`;

  tagList.insertAdjacentHTML('afterbegin', liTag);
};

const renderTagList = () => {
  OPTIONS.picTags.forEach(tag => {
    renderPicTag(tag);
  });
};

renderTagList();

const addPicTag = e => {
  if (e.key === 'Enter') {
    const tag = e.target.value.replace(/\s+/g, ' ');

    if (tag.length && !OPTIONS.picTags.includes(tag)) {
      if (OPTIONS.picTags.length < 4) {
        OPTIONS.picTags.push(tag);
        saveOptions();
        renderPicTag(tag);
        setBackground();
      }
    }
    e.target.value = '';
  }
};

const removePicTag = e => {
  let tags = OPTIONS.picTags;
  const thisTag = e.target.parentElement.textContent.slice(0, -1);
  const index = tags.indexOf(thisTag);
  OPTIONS.picTags = [...tags.slice(0, index), ...tags.slice(index + 1)];
  saveOptions();
  e.target.parentElement.remove();
  setBackground();
};

settingsIcon.addEventListener('click', toggleSettings);
document.body.addEventListener('click', closeSettingsBlock);
langSelect.addEventListener('change', changeLanguage);
hideBlockInputs.forEach(el => el.addEventListener('input', toggleBlock));
picOptions.addEventListener('change', changePictureSource);
tagInput.addEventListener('keydown', addPicTag);

tagList.addEventListener('click', function (e) {
  if (e.target.classList.contains('close-tag')) {
    removePicTag(e);
  }
});

export const Settings = () => {
  initSettings();
};
