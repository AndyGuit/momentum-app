import { getQuoteLink } from '../apiLinks';
import { OPTIONS } from '../options';
import { translations } from '../translations';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

const fetchQuote = async () => {
  const url = getQuoteLink(OPTIONS.lang);

  try {
    const res = await fetch(url);
    const data = await res.json();

    const random = Math.floor(Math.random() * data.length);

    quote.textContent = data[random].text;
    author.textContent =
      data[random].author || translations.quoteUnknownAuthor[OPTIONS.lang];
  } catch (error) {
    quote.textContent = translations.quoteError[OPTIONS.lang];
    console.log(error);
  }
};

changeQuote.addEventListener('click', () => {
  fetchQuote();
});

export const Quote = () => {
  fetchQuote();
};
