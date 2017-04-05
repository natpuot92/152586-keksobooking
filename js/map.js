'use strict';


function getRandomDigit(min, max) {
    return Math.floor(Math.random() * (max - min+1)) + min;
}

function getArrayRandomNumber(array) {
  var randomNumberArray = Math.floor(Math.random() * array.length);
  return array[randomNumberArray];
}

var titleArray = ["Большая уютная квартира",
              "Маленькая неуютная квартира",
              "Огромный прекрасный дворец",
              "Маленький ужасный дворец",
              "Красивый гостевой домик",
              "Некрасивый негостеприимный домик",
              "Уютное бунгало далеко от моря",
              "Неуютное бунгало по колено в воде"];

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

  var featuresArray = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  featuresArray.length = featuresArray.length - getRandomDigit(0, 6);

  var description = '';

  var photos = [];

  var ad = {
    'autor' : {
      'avatar' : 'img/avatars/user' + 0 + (i+1) + '.png'
    },
    'offer' : {
      'title' : stringArray,
      'address' : '' + addressX + ',' + addressY,
      'price' : price,
      'type' : getArrayRandomNumber(typeArray),
      'rooms' : rooms,
      'guests' : guests,
      'checkin' : checkin,
      'checkout' : checkout,
      'features' : featuresArray,
      'description' : '',
      'photos' : []
    },
     'location': {
       'X' : addressX,
       'Y' : addressY
     }
  }
 arrayAd.push(ad);

}
console.log(arrayAd);



var parentPinMap = document.querySelector('.tokyo__pin-map');

var fragment = document.createDocumentFragment();

for (var i = 0; i < titleArray.length; i++) {
  var childDiv = document.createElement('div');
  childDiv.className = 'pin';
  childDiv.style.left = arrayAd[i].location.X + 'px';
  childDiv.style.top = arrayAd[i].location.Y + 'px';
  childDiv.innerHTML = '<img src=" ' + arrayAd[i].autor.avatar + ' " class="rounded" width="40" height="40"></div>';

  fragment.appendChild(childDiv);
  console.log(fragment);

}
 parentPinMap.appendChild(fragment);

