'use strict';

(function () {
  //  Валидация "Заголовок"
  var titleForm = document.getElementById('title');
  titleForm.setAttribute('required', '');
  titleForm.setAttribute('maxlength', '100');
  titleForm.setAttribute('minlength', '30');

  // Валидация "Цена за ночь"
  var formPrice = document.getElementById('price');
  formPrice.setAttribute('required', true);
  formPrice.setAttribute('min', '1000');
  formPrice.setAttribute('max', '1000000');


  // Синхнонизация времени
  var timeIn = document.querySelector('#time');
  var timeOut = document.querySelector('#timeout');

  var timeOutValues = [
    'time-12',
    'time-13',
    'time-14'
  ];

  var timeInValues = [
    'time-12',
    'time-13',
    'time-14'
  ];

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, min) {
    element.min = min;
  };

  window.synchronizeFields(timeIn, timeOut, timeInValues, timeOutValues, syncValues);
  window.synchronizeFields(timeOut, timeIn, timeOutValues, timeInValues, syncValues);

  // синхронизация типа жилья и цены
  var priceValues = [
    1000,
    0,
    10000
  ];

  var offerValues = [
    'flat',
    'shack',
    'palace'
  ];

  var type = document.getElementById('type');
  var price = document.getElementById('price');

  window.synchronizeFields(type, price, offerValues, priceValues, syncValueWithMin);

  // синхронизации  кол-ва комнат и гостей
  var rooms = [
    '1-rooms',
    '2-rooms',
    '100-rooms'
  ];

  var guests = [
    'not-guests',
    '3-guests',
    '3-guests'
  ];

  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');

  capacity.value = 'not-guests';

  window.synchronizeFields(roomNumber, capacity, rooms, guests, syncValues);

  window.synchronizeFields(capacity, roomNumber, guests, rooms, syncValues);
})();

