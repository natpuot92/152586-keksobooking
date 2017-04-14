'use strict';

var parentPinMap = document.querySelector('.tokyo__pin-map');

var fragment = document.createDocumentFragment();

for (var j = 0; j < titlesArray.length; j++) {
  var childDiv = document.createElement('div');
  childDiv.className = 'pin';
  childDiv.style.left = advertisements[j].location.X + 'px';
  childDiv.style.top = advertisements[j].location.Y + 'px';
  childDiv.setAttribute('data-set', j);
  childDiv.setAttribute('tabindex', '0');
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


function renderDialogInfo(place) {

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
}


renderDialogInfo(advertisements[0]);

var PIN_ACTIVE_CLASS_NAME = 'pin--active';

var firstPin = document.querySelector('.pin[data-set = "0"]');
setActivePin(firstPin);

function deleteActivePin() {
  var pinActive = document.querySelector('.' + PIN_ACTIVE_CLASS_NAME);
  if (pinActive) {
    pinActive.classList.remove(PIN_ACTIVE_CLASS_NAME);
  }
}

function setActivePin(pinNode) {
  pinNode.classList.add(PIN_ACTIVE_CLASS_NAME);
}

var offerDialog = document.getElementById('offer-dialog');

function showCard(activePin) {
  offerDialog.classList.remove('hidden');

  renderDialogInfo(advertisements[activePin.getAttribute('data-set')]);
}

var dialogOpenHandler = function (evt) {
  var clickedPin = evt.currentTarget;
  deleteActivePin();
  showCard(clickedPin);
  setActivePin(clickedPin);

};

var KEY_CODE_ENTER = 13;

var KEY_CODE_ESC = 27;

function isEnterPressed(evt) {
  return evt.keyCode === KEY_CODE_ENTER;
}

function isEscPressed(evt) {
  return evt.keyCode === KEY_CODE_ESC;
}

var pins = document.querySelectorAll('.pin:not(.pin__main)');

for (var pinIndex = 0; pinIndex < pins.length; pinIndex++) {
  pins[pinIndex].addEventListener('click', function (evt) {
    dialogOpenHandler(evt);
  });
  pins[pinIndex].addEventListener('keydown', function (evt) {
    if (isEnterPressed(evt)) {
      dialogOpenHandler(evt);
    }
  });
}

var buttonDialogClose = document.querySelector('.dialog__close');

var dialogCloseHandler = function () {
  offerDialog.classList.add('hidden');
  deleteActivePin();
};

buttonDialogClose.addEventListener('click', dialogCloseHandler);

buttonDialogClose.addEventListener('keydown', function (evt) {
  if (isEnterPressed(evt)) {
    dialogCloseHandler();
  }
});

document.addEventListener('keydown', function (evt) {
  if (isEscPressed(evt)) {
    dialogCloseHandler();
  }
});


//  Валидация "Заголовок"
var titleForm = document.getElementById('title');
titleForm.setAttribute('required', '');
titleForm.setAttribute('maxlength', '100');
titleForm.setAttribute('minlength', '30');

//  Валидация "Цена за ночь"
var formPrice = document.getElementById('price');
formPrice.setAttribute('required', true);
formPrice.setAttribute('min', '1000');
formPrice.setAttribute('max', '1000000');

var time = document.querySelector('#time');
var timeOut = document.querySelector('#timeout');

//  Функция синхронизации время заезда
time.onchange = function () {
  timeOut.value = time.value;
};

//  Функция синхронизации время выезда
timeOut.onchange = function () {
  time.value = timeOut.value;
};

// Объект типов жилья
var typeHousesMinPrice = {
  flat: 1000,
  shack: 0,
  palace: 10000
};

var type = document.getElementById('type');
var price = document.getElementById('price');
// Функция синхронизации цены и жилья

type.addEventListener('change', function () {
  price.setAttribute('min', typeHousesMinPrice[type.value]);
});

// Объект кол-во комнат
var rooms = {
  '1-rooms': 'not-guests',
  '2-rooms': '3-guests',
  '100-rooms': '3-guests'
};

var roomNumber = document.getElementById('room_number');
var capacity = document.getElementById('capacity');

//  Функция синхронизации  кол-ва комнат и гостей
capacity.value = 'not-guests';
roomNumber.onchange = function () {
  capacity.value = rooms[roomNumber.value];
};

capacity.onchange = function () {
  for (var key in rooms) {
    if (rooms[key] === capacity.value) {
      roomNumber.value = key;
      return;
    }
  }
};


