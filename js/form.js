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

  var timeObject = {
    'time-12': 'time-12',
    'time-13': 'time-13',
    'time-14': 'time-14'
  };

  var syncTime = function (suncElement, value, key) {
    suncElement.value = value;
  };

  window.synchronizeFields(timeIn, timeOut, timeObject, syncTime);
  window.synchronizeFields(timeOut, timeIn, timeObject, syncTime);

  // синхронизация типа жилья и цены
  var typeHousesMinPrice = {
    flat: 1000,
    shack: 0,
    palace: 10000
  };

  var type = document.getElementById('type');
  var price = document.getElementById('price');

  var setAttributeMin = function (suncElement, value, key) {
    suncElement.setAttribute('min', value);
  };

  window.synchronizeFields(type, price, typeHousesMinPrice, setAttributeMin);

  // синхронизации  кол-ва комнат и гостей
  var rooms = {
    '1-rooms': 'not-guests',
    '2-rooms': '3-guests',
    '100-rooms': '3-guests'
  };

  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var suncRoomNumber = function (suncElement, value, key) {
    suncElement.value = value;
  };

  var suncCapacity = function (suncElement, value, key) {
    suncElement.value = key;
  };

  capacity.value = 'not-guests';

  window.synchronizeFields(roomNumber, capacity, rooms, suncRoomNumber);

  window.synchronizeFields(capacity, roomNumber, rooms, suncCapacity);
})();
