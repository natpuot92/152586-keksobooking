'use strict';

(function () {
  window.showCard = function showCard(activePin, cardDialog, callback) {
    activePin.addEventListener('click', function (evt) {
      cardDialog.classList.remove('hidden');
      window.renderCard(window.filteredAdvertisements[activePin.getAttribute('data-set')]);
      callback(evt);
    });

    activePin.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterPressed(evt)) {
        cardDialog.classList.remove('hidden');
        window.renderCard(window.filteredAdvertisements[activePin.getAttribute('data-set')]);
        callback(evt);
      }
    });
  };
})();
