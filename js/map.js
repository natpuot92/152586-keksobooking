'use strict';

function getRandomDigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getArrayRandomNumber(array) {
  var randomNumberArray = Math.floor(Math.random() * array.length);
  return array[randomNumberArray];
}

var titleArray = ['Большая уютная квартира',
              'Маленькая неуютная квартира',
              'Огромный прекрасный дворец',
              'Маленький ужасный дворец',
              'Красивый гостевой домик',
              'Некрасивый негостеприимный домик',
              'Уютное бунгало далеко от моря',
              'Неуютное бунгало по колено в воде'];

var typeArray = ['flat', 'house', 'bungalo'];

var checkinArray = ['12:00', '13:00', '14:00'];

var checkoutArray = ['12:00', '13:00', '14:00'];

var arrayAd = [];

for (var i = 0; i < titleArray.length; i++) {

  var stringArray = titleArray[i];

  var addressX = getRandomDigit(300, 900);
  var addressY = getRandomDigit(100, 500);

  var price = getRandomDigit(1000, 1000000);

  var rooms = getRandomDigit(1, 5);

  var guests = getRandomDigit(0, 15);

  var checkin = getArrayRandomNumber(checkinArray);

  var checkout = getArrayRandomNumber(checkoutArray);

  var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  featuresArray.length = featuresArray.length - getRandomDigit(0, 5);

  var description = '';

  var photos = [];

  var ad = {
    'autor': {
      'avatar': 'img/avatars/user' + 0 + (i + 1) + '.png'
    },
    'offer': {
      'title': stringArray,
      'address': '' + addressX + ',' + addressY,
      'price': price,
      'type': getArrayRandomNumber(typeArray),
      'rooms': rooms,
      'guests': guests,
      'checkin': checkin,
      'checkout': checkout,
      'features': featuresArray,
      'description': '',
      'photos': []
    },
    'location': {
      'X': addressX,
      'Y': addressY
    }
  };
  arrayAd.push(ad);
}

var parentPinMap = document.querySelector('.tokyo__pin-map');

var fragment = document.createDocumentFragment();

for (var i = 0; i < titleArray.length; i++) {
  var childDiv = document.createElement('div');
  childDiv.className = 'pin';
  childDiv.style.left = arrayAd[i].location.X + 'px';
  childDiv.style.top = arrayAd[i].location.Y + 'px';
  childDiv.innerHTML = '<img src=" ' + arrayAd[i].autor.avatar + ' " class="rounded" width="40" height="40"></div>';

  fragment.appendChild(childDiv);
}

parentPinMap.appendChild(fragment);

var dialogPanel = document.querySelector('.dialog__panel');

var parent = dialogPanel.parentElement;

var template = document.querySelector('#lodge-template');

var newElement = template.content.cloneNode(true);

parent.appendChild(newElement);

parent.replaceChild(newElement, dialogPanel);

var newElementBlock = document.querySelector('.dialog__panel');

var title = newElementBlock.querySelector('.lodge__title');
title.textContent = arrayAd[0].offer.title;

var address = newElementBlock.querySelector('.lodge__address');
address.textContent = arrayAd[0].offer.address;

var price = newElementBlock.querySelector('.lodge__price');
price.innerHTML = arrayAd[0].offer.price + '&#x20bd;/ + ночь';

var type = newElementBlock.querySelector('.lodge__type');
type.innerHTML = arrayAd[0].offer.type;

var roomsAndGuests = newElementBlock.querySelector('.lodge__rooms-and-guests');
roomsAndGuests.innerHTML = 'Для ' + arrayAd[0].offer.guests + ' гостей в ' + arrayAd[0].offer.rooms + ' комнатах';

var checkinAndCheckout = newElementBlock.querySelector('.lodge__checkin-time');
checkinAndCheckout.innerHTML = 'Заезд после ' + arrayAd[0].offer.checkin + ', выезд до ' + arrayAd[0].offer.checkout;

var features = newElementBlock.querySelector('.lodge__features');

for (var i = 0; i < arrayAd[0].offer.features.length; i++) {
  var featuresElement = document.createElement('span');
  featuresElement.className = 'feature__image feature__image--' + arrayAd[0].offer.features[i];

  features.appendChild(featuresElement);
}

var description = newElementBlock.querySelector('.lodge__description');
description.innerHTML = arrayAd[0].offer.description;

var avatar = document.querySelector('.dialog__title img');
avatar.src = arrayAd[0].autor.avatar;

