'use strict';
function getRandomDigit(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getArrayRandomNumber(array) {
  var randomNumberArray = getRandomDigit(0, array.length - 1);
  return array[randomNumberArray];
}

window.managementKeyboard = (function () {
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
    isEscPressed: isEscPressed
  };
})();
