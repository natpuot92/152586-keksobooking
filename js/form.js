'use strict';

//  Валидация "Заголовок"
(function () {

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
})();
