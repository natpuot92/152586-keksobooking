'use strict';

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

(function () {

  for (var i = 0; i < titlesArray.length; i++) {

    var addressX = window.getRandomDigit(300, 900);
    var addressY = window.getRandomDigit(100, 500);

    var featuresRandomArray = featuresArray.filter(function () {
      return Math.random() > 0.5;
    });

    advertisements.push({
      'autor': {
        'avatar': 'img/avatars/user' + 0 + (i + 1) + '.png'
      },
      'offer': {
        'title': titlesArray[i],
        'address': '' + window.getRandomDigit(300, 900) + ', ' + window.getRandomDigit(100, 500),
        'price': window.getRandomDigit(1000, 1000000),
        'type': window.getArrayRandomNumber(typesArray),
        'rooms': window.getRandomDigit(1, 5),
        'guests': window.getRandomDigit(0, 15),
        'checkin': window.getArrayRandomNumber(checkinsArray),
        'checkout': window.getArrayRandomNumber(checkoutsArray),
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
  return advertisements;
})();


