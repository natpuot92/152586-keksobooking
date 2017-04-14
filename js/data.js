'use strict';

var titlesArray = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

window.createsTheData = function () {

function getRandomDigit(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getArrayRandomNumber(array) {
  var randomNumberArray = getRandomDigit(0, array.length - 1);
  return array[randomNumberArray];
}

var typesArray = ['flat', 'house', 'bungalo'];

var checkinsArray = ['12:00', '13:00', '14:00'];

var checkoutsArray = ['12:00', '13:00', '14:00'];

var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var offerTypes = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var advertisements = [];

for (var i = 0; i < titlesArray.length; i++) {

  var addressX = getRandomDigit(300, 900);
  var addressY = getRandomDigit(100, 500);

  var featuresRandomArray = featuresArray.filter(function () {
    return Math.random() > 0.5;
  });

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
  console.log(advertisements)
return advertisements;
}


