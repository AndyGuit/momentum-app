import { DEFAULT_OPTIONS } from '../defaultOptions';
import { translations } from '../translations';

const greetingEl = document.querySelector('.greeting');
const nameInput = document.querySelector('input.name');

const setGreeting = () => {
  const { lang } = DEFAULT_OPTIONS;

  const curTime = new Date().getHours();
  const timeIndex = Math.floor(curTime / 6);

  greetingEl.textContent = translations.greeting[lang][timeIndex];

  setTimeout(setGreeting, 1000);
};

const setName = () => {
  const { lang, name } = DEFAULT_OPTIONS;

  nameInput.placeholder = translations.namePlaceholder[lang];
  nameInput.value = name;
};

export const Greeting = () => {
  setGreeting();
  setName();
};
