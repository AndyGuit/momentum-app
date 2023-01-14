export const getGithubImg = (imgNum, tag) => {
  return `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${tag}/${imgNum}.jpg`;
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
