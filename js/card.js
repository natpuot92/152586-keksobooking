'use strict';

(function () {
  var dialogPanel = document.querySelector('.dialog__panel');

  var parent = dialogPanel.parentElement;

  var lodgeTemplate = document.querySelector('#lodge-template');

  var newElement = lodgeTemplate.content.cloneNode(true);

  parent.appendChild(newElement);

  parent.replaceChild(newElement, dialogPanel);


  var offerTypes = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var newElementBlock = document.querySelector('.dialog__panel');

  var title = newElementBlock.querySelector('.lodge__title');
  var address = newElementBlock.querySelector('.lodge__address');
  var price = newElementBlock.querySelector('.lodge__price');
  var type = newElementBlock.querySelector('.lodge__type');
  var roomsAndGuests = newElementBlock.querySelector('.lodge__rooms-and-guests');
  var checkinAndCheckout = newElementBlock.querySelector('.lodge__checkin-time');
  var features = newElementBlock.querySelector('.lodge__features');
  var description = newElementBlock.querySelector('.lodge__description');
  var avatar = document.querySelector('.dialog__title img');

  window.renderCard = (function (place) {

    title.textContent = place.offer.title;
    address.textContent = place.offer.address;
    price.innerHTML = place.offer.price + ' &#x20bd;/ночь';
    type.innerHTML = offerTypes[place.offer.type];
    roomsAndGuests.innerHTML = 'Для ' + place.offer.guests + ' гостей в ' + place.offer.rooms + ' комнатах';
    checkinAndCheckout.innerHTML = 'Заезд после ' + place.offer.checkin + ', выезд до ' + place.offer.checkout;
    description.innerHTML = place.offer.description;

    features.innerHTML = '';

    for (var featuresIndex = 0; featuresIndex < place.offer.features.length; featuresIndex++) {
      var featuresElement = document.createElement('span');
      featuresElement.className = 'feature__image feature__image--' + place.offer.features[featuresIndex];
      features.appendChild(featuresElement);
    }

    description.innerHTML = place.offer.description;
    avatar.src = place.autor.avatar;
  });
})();

