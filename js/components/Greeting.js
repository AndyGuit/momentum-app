import { OPTIONS } from '../options';
import { translations } from '../translations';
import { getTimeIndex } from '../helperFunctions';

const greetingEl = document.querySelector('.greeting');
const nameInput = document.querySelector('input.name');

const { lang } = OPTIONS;

const setGreeting = () => {
  const timeIndex = getTimeIndex();

  greetingEl.textContent = translations.greeting[lang][timeIndex];

  setTimeout(setGreeting, 1000);
};

const setName = name => {
  nameInput.placeholder = translations.namePlaceholder[lang];
  nameInput.value = name;
};

nameInput.addEventListener('input', e => {
  const name = e.target.value;
  setName(name);
  localStorage.setItem('name', name);
});

export const Greeting = () => {
  setGreeting();
  setName(OPTIONS.name);
};
