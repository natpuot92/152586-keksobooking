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

// нахожу форму "адрес" и добавляю ему атрибут disabled
var addressForm = document.getElementById('address');
addressForm.setAttribute('disabled', '');

// нахожу пин и описываю событие "клик"
var pinMain = document.querySelector('.pin__main');

pinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  pinMain.style.zIndex = 2;
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  // функция описывающая поведение при передвижении указателя
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };


    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
    pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
  };

  // функция описывающая поведении при отпускании мыши
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    tokyo.removeEventListener('mousemove', onMouseMove);
    tokyo.removeEventListener('mouseup', onMouseUp);
    pinMain.style.zIndex = 0;

    // Функция вичисления координат, куда указывает метка острым концом
    function pinСoordinates(pinName) {
      var pinWidth = Math.round(pinName.getBoundingClientRect().right - pinName.getBoundingClientRect().left);
      var pinHeight = Math.round(pinName.getBoundingClientRect().bottom - pinName.getBoundingClientRect().top);

      var coordinatesLeft = pinName.offsetLeft + pinWidth / 2;
      var coordinatesTop = pinName.offsetTop + pinHeight;

      return {
        coordinatesLeft: coordinatesLeft,
        coordinatesTop: coordinatesTop
      };
    }

    // присвоение форме значения найденных координат
    addressForm.value = 'x:' + pinСoordinates(pinMain).coordinatesLeft + ', y:' + pinСoordinates(pinMain).coordinatesTop;
  };

  var tokyo = document.querySelector('.tokyo');
  tokyo.addEventListener('mousemove', onMouseMove);
  tokyo.addEventListener('mouseup', onMouseUp);

});


