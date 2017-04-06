'use strict';

function getRandomDigit(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getArrayRandomNumber(array) {
  var randomNumberArray = getRandomDigit(0, array.length - 1);
  return array[randomNumberArray];
}

var titlesArray = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var typesArray = ['flat', 'house', 'bungalo'];

var checkinsArray = ['12:00', '13:00', '14:00'];

var checkoutsArray = ['12:00', '13:00', '14:00'];

var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var advertisements = [];

var featuresRandomArray = [];

for (var l = 0; l < featuresArray.length; l++) {
  if (Math.random() > 0.5) {
    featuresRandomArray.push(featuresArray[l]);
  }
}

for (var i = 0; i < titlesArray.length; i++) {

  var addressX = getRandomDigit(300, 900);
  var addressY = getRandomDigit(100, 500);

  advertisements.push({
    'autor': {
      'avatar': 'img/avatars/user' + 0 + (i + 1) + '.png'
    },
    'offer': {
      'title': titlesArray[i],
      'address': '' + getRandomDigit(300, 900) + ', ' + getRandomDigit(100, 500),
      'price': getRandomDigit(1000, 1000000),
      'type': getArrayRandomNumber(typesArray),
      'rooms': getRandomDigit(1, 5),
      'guests': getRandomDigit(0, 15),
      'checkin': getArrayRandomNumber(checkinsArray),
      'checkout': getArrayRandomNumber(checkoutsArray),
      'features': featuresRandomArray,
      'description': '',
      'photos': []
    },
    'location': {
      'X': addressX,
      'Y': addressY
    }
  });
}

var parentPinMap = document.querySelector('.tokyo__pin-map');

var fragment = document.createDocumentFragment();

for (var j = 0; j < titlesArray.length; j++) {
  var childDiv = document.createElement('div');
  childDiv.className = 'pin';
  childDiv.style.left = advertisements[j].location.X + 'px';
  childDiv.style.top = advertisements[j].location.Y + 'px';
  childDiv.innerHTML = '<img src=" ' + advertisements[j].autor.avatar + ' " class="rounded" width="40" height="40"></div>';

  fragment.appendChild(childDiv);
}

parentPinMap.appendChild(fragment);

var dialogPanel = document.querySelector('.dialog__panel');

var parent = dialogPanel.parentElement;

var lodgeTemplate = document.querySelector('#lodge-template');

var newElement = lodgeTemplate.content.cloneNode(true);

parent.appendChild(newElement);

parent.replaceChild(newElement, dialogPanel);

var newElementBlock = document.querySelector('.dialog__panel');

var title = newElementBlock.querySelector('.lodge__title');
title.textContent = advertisements[0].offer.title;

var address = newElementBlock.querySelector('.lodge__address');
address.textContent = advertisements[0].offer.address;

var price = newElementBlock.querySelector('.lodge__price');
price.innerHTML = advertisements[0].offer.price + ' &#x20bd;/' + 'ночь';

var offerTypes = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var type = newElementBlock.querySelector('.lodge__type');
var randomTypeName = advertisements[0].offer.type;
type.innerHTML = offerTypes[randomTypeName];


var roomsAndGuests = newElementBlock.querySelector('.lodge__rooms-and-guests');
roomsAndGuests.innerHTML = 'Для ' + advertisements[0].offer.guests + ' гостей в ' + advertisements[0].offer.rooms + ' комнатах';

var checkinAndCheckout = newElementBlock.querySelector('.lodge__checkin-time');
checkinAndCheckout.innerHTML = 'Заезд после ' + advertisements[0].offer.checkin + ', выезд до ' + advertisements[0].offer.checkout;

var features = newElementBlock.querySelector('.lodge__features');

for (var k = 0; k < advertisements[0].offer.features.length; k++) {
  var featuresElement = document.createElement('span');
  featuresElement.className = 'feature__image feature__image--' + advertisements[0].offer.features[k];

  features.appendChild(featuresElement);
}

var description = newElementBlock.querySelector('.lodge__description');
description.innerHTML = advertisements[0].offer.description;

var avatar = document.querySelector('.dialog__title img');
avatar.src = advertisements[0].autor.avatar;

