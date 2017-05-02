'use strict';
(function () {
  window.renderPin = function (dataPins) {
    var parentPinMap = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < dataPins.length; j++) {
      var childDiv = document.createElement('div');
      childDiv.className = 'pin';
      childDiv.style.left = dataPins[j].location.x + 'px';
      childDiv.style.top = dataPins[j].location.y + 'px';
      childDiv.setAttribute('data-set', j);
      childDiv.setAttribute('tabindex', '0');
      childDiv.innerHTML = '<img src=" ' + dataPins[j].author.avatar + ' " class="rounded" width="40" height="40"></div>';
      fragment.appendChild(childDiv);
    }

    parentPinMap.appendChild(fragment);

    window.pins = document.querySelectorAll('.pin:not(.pin__main)');

    for (var pinIndex = 0; pinIndex < window.pins.length; pinIndex++) {
      window.showCard(window.pins[pinIndex], window.offerDialog, window.dialogOpenHandler);
    }
  };
})();
