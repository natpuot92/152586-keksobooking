'use strict';
(function () {
  window.offerDialog = document.getElementById('offer-dialog');
  window.offerDialog.classList.add('hidden');

  window.dialogOpenHandler = function (evt) {
    var clickedPin = evt.currentTarget;
    window.managementActivePin.deleteActivePin();
    window.managementActivePin.setActivePin(clickedPin);
  };

  var dialogCloseHandler = function () {
    window.offerDialog.classList.add('hidden');
    window.managementActivePin.deleteActivePin();
  };

  var buttonDialogClose = document.querySelector('.dialog__close');

  buttonDialogClose.addEventListener('click', dialogCloseHandler);

  buttonDialogClose.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      dialogCloseHandler();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (window.utils.isEscPressed(evt)) {
      dialogCloseHandler();
    }
  });

// нахожу форму "адрес" и добавляю ему атрибут readonly
  var addressForm = document.getElementById('address');
  addressForm.setAttribute('readonly', '');

  // Функция вычисления координат, куда указывает метка острым концом
  function getPinCoordinates(pinName) {
    var clientRect = pinName.getBoundingClientRect();
    var pinWidth = Math.round(clientRect.right - clientRect.left);
    var pinHeight = Math.round(clientRect.bottom - clientRect.top);
    var coordinatesLeft = pinName.offsetLeft + pinWidth / 2;
    var coordinatesTop = pinName.offsetTop + pinHeight;
    return {
      coordinatesLeft: coordinatesLeft,
      coordinatesTop: coordinatesTop
    };
  }

  // нахожу пин и описываю событие "кнопка мыши вниз"
  var pinMain = document.querySelector('.pin__main');

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    pinMain.classList.add('z-index');
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // функция описывающая поведение при передвижении указателя
    var onMouseMove = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();

      var shift = {
        x: startCoords.x - mouseMoveEvt.clientX,
        y: startCoords.y - mouseMoveEvt.clientY
      };


      startCoords = {
        x: mouseMoveEvt.clientX,
        y: mouseMoveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
    };

    // функция описывающая поведении при отпускании мыши
    var onMouseUp = function (mouseUpEvt) {
      mouseUpEvt.preventDefault();
      tokyo.removeEventListener('mousemove', onMouseMove);
      tokyo.removeEventListener('mouseup', onMouseUp);
      pinMain.classList.remove('z-index');

      // присвоение форме значения найденных координат
      addressForm.value = 'x:' + getPinCoordinates(pinMain).coordinatesLeft + ', y:' + getPinCoordinates(pinMain).coordinatesTop;
    };

    var tokyo = document.querySelector('.tokyo');
    tokyo.addEventListener('mousemove', onMouseMove);
    tokyo.addEventListener('mouseup', onMouseUp);
  });
})();

