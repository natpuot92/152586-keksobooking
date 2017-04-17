'use strict';

window.renderCard(window.advertisements[0]);

window.managementActivePin.setActivePin(document.querySelector('.pin[data-set = "0"]'));

window.managementDialogHandler = (function () {
  var offerDialog = document.getElementById('offer-dialog');

  function showCard(activePin) {
    offerDialog.classList.remove('hidden');
    window.renderCard(window.advertisements[activePin.getAttribute('data-set')]);
  }

  var dialogOpenHandler = function (evt) {
    var clickedPin = evt.currentTarget;
    window.managementActivePin.deleteActivePin();
    showCard(clickedPin);
    window.managementActivePin.setActivePin(clickedPin);
  };

  var dialogCloseHandler = function () {
    offerDialog.classList.add('hidden');
    window.managementActivePin.deleteActivePin();
  };
  return {
    dialogOpenHandler: dialogOpenHandler,
    dialogCloseHandler: dialogCloseHandler
  };
})();

(function () {
  var pins = document.querySelectorAll('.pin:not(.pin__main)');

  for (var pinIndex = 0; pinIndex < pins.length; pinIndex++) {
    pins[pinIndex].addEventListener('click', function (evt) {
      window.managementDialogHandler.dialogOpenHandler(evt);
    });
    pins[pinIndex].addEventListener('keydown', function (evt) {
      if (window.managementKeyboard.isEnterPressed(evt)) {
        window.managementDialogHandler.dialogOpenHandler(evt);
      }
    });
  }
})();

var buttonDialogClose = document.querySelector('.dialog__close');

buttonDialogClose.addEventListener('click', window.managementDialogHandler.dialogCloseHandler);

buttonDialogClose.addEventListener('keydown', function (evt) {
  if (window.managementKeyboard.isEnterPressed(evt)) {
    window.managementDialogHandler.dialogCloseHandler();
  }
});

document.addEventListener('keydown', function (evt) {
  if (window.managementKeyboard.isEscPressed(evt)) {
    window.managementDialogHandler.dialogCloseHandler();
  }
});
