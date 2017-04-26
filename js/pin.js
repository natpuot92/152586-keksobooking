'use strict';

(function () {
  var parentPinMap = document.querySelector('.tokyo__pin-map');

  var fragment = document.createDocumentFragment();

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHandler = function (data) {
    window.advertisements = data;

    for (var j = 0; j < data.length; j++) {
      var childDiv = document.createElement('div');
      childDiv.className = 'pin';
      childDiv.style.left = data[j].location.x + 'px';
      childDiv.style.top = data[j].location.y + 'px';
      childDiv.setAttribute('data-set', j);
      childDiv.setAttribute('tabindex', '0');
      childDiv.innerHTML = '<img src=" ' + data[j].author.avatar + ' " class="rounded" width="40" height="40"></div>';
      fragment.appendChild(childDiv);
    }

    parentPinMap.appendChild(fragment);

    var pins = document.querySelectorAll('.pin:not(.pin__main)');

    for (var pinIndex = 0; pinIndex < pins.length; pinIndex++) {
      window.showCard(pins[pinIndex], window.offerDialog, window.dialogOpenHandler);
    }
  };

  var PIN_ACTIVE_CLASS_NAME = 'pin--active';
  var deleteActivePin = function () {
    var pinActive = document.querySelector('.' + PIN_ACTIVE_CLASS_NAME);
    if (pinActive) {
      pinActive.classList.remove(PIN_ACTIVE_CLASS_NAME);
    }
  };
  var setActivePin = function (pinNode) {
    pinNode.classList.add(PIN_ACTIVE_CLASS_NAME);
  };
  window.managementActivePin = {
    deleteActivePin: deleteActivePin,
    setActivePin: setActivePin
  };

  window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', successHandler, errorHandler);
})();

