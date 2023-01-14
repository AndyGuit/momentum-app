import { OPTIONS } from '../options';
import { translations } from '../translations';
import { getTimeIndex } from '../components/Greeting';
import { getGithubImg } from '../apiLinks';

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

const maxImages = 20;
let randomImg = Math.floor(Math.random() * maxImages) + 1;

const getImgLink = async () => {
  const imgNumber = randomImg.toString().padStart(2, '0');
  const timeOfDay = translations.greeting.en[getTimeIndex()].split(' ')[1];

  if (OPTIONS.picSource === 'github') {
    return getGithubImg(imgNumber, timeOfDay);
  }
};

const setBackgorund = async () => {
  const img = new Image();
  img.src = await getImgLink();

  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  };
};

slideNext.addEventListener('click', () => {
  randomImg >= maxImages ? (randomImg = 1) : randomImg++;

  setBackgorund();
});

slidePrev.addEventListener('click', () => {
  randomImg === 1 ? (randomImg = maxImages) : randomImg--;

  setBackgorund();
});

export const SliderBackground = () => {
  setBackgorund();
};
