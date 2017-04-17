'use strict';
window.utils = (function () {
  var getRandomDigit = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getArrayRandomNumber = function (array) {
    var randomNumberArray = getRandomDigit(0, array.length - 1);
    return array[randomNumberArray];
  };

  var KEY_CODE_ENTER = 13;

  var KEY_CODE_ESC = 27;

  var isEnterPressed = function (evt) {
    return evt.keyCode === KEY_CODE_ENTER;
  };

  var isEscPressed = function (evt) {
    return evt.keyCode === KEY_CODE_ESC;
  };
  return {
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    getArrayRandomNumber: getArrayRandomNumber,
    getRandomDigit: getRandomDigit
  };
})();
