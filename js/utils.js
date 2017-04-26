'use strict';
(function () {
  var KEY_CODE_ENTER = 13;

  var KEY_CODE_ESC = 27;

  var isEnterPressed = function (evt) {
    return evt.keyCode === KEY_CODE_ENTER;
  };

  var isEscPressed = function (evt) {
    return evt.keyCode === KEY_CODE_ESC;
  };
  window.utils = {
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
  };
})();
