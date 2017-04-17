'use strict';

(function () {
  var parentPinMap = document.querySelector('.tokyo__pin-map');

  var fragment = document.createDocumentFragment();

  for (var j = 0; j < window.advertisementsGlobal.length; j++) {
    var childDiv = document.createElement('div');
    childDiv.className = 'pin';
    childDiv.style.left = window.advertisementsGlobal[j].location.X + 'px';
    childDiv.style.top = window.advertisementsGlobal[j].location.Y + 'px';
    childDiv.setAttribute('data-set', j);
    childDiv.setAttribute('tabindex', '0');
    childDiv.innerHTML = '<img src=" ' + window.advertisementsGlobal[j].autor.avatar + ' " class="rounded" width="40" height="40"></div>';

    fragment.appendChild(childDiv);
  }
  parentPinMap.appendChild(fragment);


  window.managementActivePin = (function () {
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
    return {
      deleteActivePin: deleteActivePin,
      setActivePin: setActivePin
    };
  })();
})();
