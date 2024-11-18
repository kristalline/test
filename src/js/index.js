import cards from './data.js';
import url1 from '../images/work.png';
import url2 from '../images/health.png';
import url3 from '../images/harmony.png';
//  https://stackoverflow.com/questions/59566181/webpack-not-finding-dynamically-js-added-background-images

const createEl = (el, props = {}) => Object.assign(document.createElement(el), props);
const cardsIndexHtml = document.querySelector('[data-cards="cards-4"]');
const cardsGiftsHtml = document.querySelector('[data-cards="cards-all"]');

const createCard = (data) => {
  const categoryClass = {
    'For work': 'work',
    'For health': 'health',
    'For harmony': 'harmony',
  };
  const card = createEl('a', {
    href: '#', className: 'card', target: '_blank', rel: 'noopener noreferrer',
  });
  const text = createEl('div', { className: 'card__text' });
  const img = createEl('img', { src: `${data.imgSrc}`, alt: 'card image', className: 'card__img' });
  const category = createEl('div', { className: `card__category card__category_${categoryClass[data.category]}` });
  category.textContent = data.category;
  const header = createEl('h3', { className: 'card__header' });
  header.textContent = data.name;

  card.append(img);
  text.append(category);
  text.append(header);
  card.append(text);
  return card;
};

const renderCards = () => {
  if (cardsIndexHtml) {
    const ids = [1, 9, 10, 12];
    ids.forEach((id) => {
      const el = cards.find((item) => item.id === id);
      if (!el) return;
      const card = createCard(el);
      cardsIndexHtml.append(card);
    });
  };
  if (cardsGiftsHtml) {
    cards.forEach((item) => cardsGiftsHtml.append(createCard(item)));
  }
};
renderCards();

/*
  const li = createEl('li', { className: 'd-flex justify-text-between mb-3 gap-2' });
  const classes = [...ids].some((el) => data.id === el) ? ['fw-normal', 'link-secondary'] : ['fw-bold'];
  const a = createEl('a', {
    href: `${data.link}`, className: classes.join(' '), target: '_blank', rel: 'noopener noreferrer',
  });
  a.dataset.id = data.id;
  a.textContent = data.title;
  const btn = createEl('button', { type: 'button', className: 'btn btn-outline-primary btn-sm' });
  btn.textContent = i18n.t('text.btnShow');
  btn.dataset.bsTarget = '#modal';
  btn.dataset.id = data.id;
  li.append(a);
  li.append(btn);
  */