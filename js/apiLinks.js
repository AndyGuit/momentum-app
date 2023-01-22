export const getGithubImg = (imgNum, tag) => {
  return `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${tag}/${imgNum}.jpg`;
};

const unsplashKey = '7ujidxk950M1vbghIqHgUXaODWIEEKDKilnv7eeiWJU';

export const getUnsplashImg = async tag => {
  const url = `https://api.unsplash.com/photos/random?query=${tag}&client_id=${unsplashKey}`;
  const res = await fetch(url);
  const { urls } = await res.json();
  return urls.regular;
};

const weatherKey = '1fd4e4aec3019e64ba3f665006f97548';

export const getWeatherLink = (city, lang) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${weatherKey}&units=metric`;
};

export const getQuoteLink = lang => {
  // TODO: add UA quotes
  switch (lang) {
    case 'en':
      return 'https://type.fit/api/quotes';
    case 'ua':
      return 'https://type.fit/api/quotes';
  }
};
