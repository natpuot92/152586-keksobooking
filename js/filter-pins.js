'use strict';

(function () {
  var selectElements = document.querySelectorAll('.tokyo__filter');
  var parentElement = document.querySelector('.tokyo__filters-container');
  var checkboxElements = parentElement.querySelectorAll('.feature input[type="checkbox"]');

  var optionValues = {
    type: 'any',
    housingPrice: 'middle',
    rooms: 'any',
    guests: 'any',
    wifi: 'any',
    dishwasher: 'any',
    parking: 'any',
    washer: 'any',
    elevator: 'any',
    conditioner: 'any'
  };

  function filterPins(filterField) {
    if (optionValues[filterField] + '' !== 'any') {
      window.filteredAdvertisements = window.filteredAdvertisements.filter(function (pinData) {
        return pinData.offer[filterField] + '' === optionValues[filterField];
      });
    }
  }

  function housingPriceFilter(optionValue) {
    switch (optionValues.housingPrice) {
      case 'middle':
        window.filteredAdvertisements = window.filteredAdvertisements.filter(function (arrayElement) {
          return (arrayElement.offer.price > 10000 && arrayElement.offer.price < 50000);
        });
        break;
      case 'low':
        window.filteredAdvertisements = window.filteredAdvertisements.filter(function (arrayElement) {
          return arrayElement.offer.price < 10000;
        });
        break;
      case 'high':
        window.filteredAdvertisements = window.filteredAdvertisements.filter(function (arrayElement) {
          return arrayElement.offer.price > 50000;
        });
        break;
    }
  }

  function allFilters() {
    filterPins('type');
    filterPins('rooms');
    filterPins('guests');
    housingPriceFilter();
    checkboxFilter(optionValues.wifi);
    checkboxFilter(optionValues.dishwasher);
    checkboxFilter(optionValues.elevator);
    checkboxFilter(optionValues.conditioner);
    checkboxFilter(optionValues.washer);
    checkboxFilter(optionValues.parking);
  }

  var filtersAndRenderPins = function () {
    window.filteredAdvertisements = window.advertisements;

    allFilters();
    window.pins.forEach(function (pin) {
      pin.classList.add('hidden');
    });

    window.renderPin(window.filteredAdvertisements);
    window.offerDialog.classList.add('hidden');
  };

  selectElements.forEach(function (select) {
    select.addEventListener('change', function () {
      optionValues[select.dataset.filter] = select.value;
      window.debounce(filtersAndRenderPins);
    });
  });

  function checkboxFilter(keyName) {
    if (keyName !== 'any') {
      window.filteredAdvertisements = window.filteredAdvertisements.filter(function (arrayElement) {
        return arrayElement.offer.features.indexOf(keyName) > -1;
      });
    }
  }

  checkboxElements.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      optionValues[checkbox.value] = checkbox.checked ? checkbox.value : 'any';
      window.debounce(filtersAndRenderPins);
    });
  });
})();
