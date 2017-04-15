'use strict';

renderDialogInfo(window.createsTheData[0]);

managementActivePin.setActivePin(document.querySelector('.pin[data-set = "0"]'));

window.managementDialogHandler = (function () {
  var offerDialog = document.getElementById('offer-dialog');

  function showCard(activePin) {
    offerDialog.classList.remove('hidden');
    renderDialogInfo(window.createsTheData[activePin.getAttribute('data-set')]);
  }

  var dialogOpenHandler = function (evt) {
    var clickedPin = evt.currentTarget;
    managementActivePin.deleteActivePin();
    showCard(clickedPin);
    managementActivePin.setActivePin(clickedPin);
  };

  var dialogCloseHandler = function () {
    offerDialog.classList.add('hidden');
    managementActivePin.deleteActivePin();
  };
  return {
    dialogOpenHandler: dialogOpenHandler,
    dialogCloseHandler: dialogCloseHandler
  };
})();

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

(function () {
  var pins = document.querySelectorAll('.pin:not(.pin__main)');

  for (var pinIndex = 0; pinIndex < pins.length; pinIndex++) {
    pins[pinIndex].addEventListener('click', function (evt) {
      managementDialogHandler.dialogOpenHandler(evt);
    });
    pins[pinIndex].addEventListener('keydown', function (evt) {
      if (managementKeyboard.isEnterPressed(evt)) {
        managementDialogHandler.dialogOpenHandler(evt);
      }
    });
  }
})();

var buttonDialogClose = document.querySelector('.dialog__close');

buttonDialogClose.addEventListener('click', managementDialogHandler.dialogCloseHandler);

buttonDialogClose.addEventListener('keydown', function (evt) {
  if (managementKeyboard.isEnterPressed(evt)) {
    managementDialogHandler.dialogCloseHandler();
  }
});

document.addEventListener('keydown', function (evt) {
  if (managementKeyboard.isEscPressed(evt)) {
    managementDialogHandler.dialogCloseHandler();
  }
});
