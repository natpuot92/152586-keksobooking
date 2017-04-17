'use strict';
(function () {
  window.renderCard(window.advertisements[0]);

  window.managementActivePin.setActivePin(document.querySelector('.pin[data-set = "0"]'));


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
  var managementDialogHandler = {
    dialogOpenHandler: dialogOpenHandler,
    dialogCloseHandler: dialogCloseHandler
  };


  var pins = document.querySelectorAll('.pin:not(.pin__main)');

  for (var pinIndex = 0; pinIndex < pins.length; pinIndex++) {
    pins[pinIndex].addEventListener('click', function (evt) {
      managementDialogHandler.dialogOpenHandler(evt);
    });
    pins[pinIndex].addEventListener('keydown', function (evt) {
      if (window.utils.isEnterPressed(evt)) {
        managementDialogHandler.dialogOpenHandler(evt);
      }
    });
  }

  var buttonDialogClose = document.querySelector('.dialog__close');

  buttonDialogClose.addEventListener('click', managementDialogHandler.dialogCloseHandler);

  buttonDialogClose.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      managementDialogHandler.dialogCloseHandler();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (window.utils.isEscPressed(evt)) {
      managementDialogHandler.dialogCloseHandler();
    }
  });
})();
