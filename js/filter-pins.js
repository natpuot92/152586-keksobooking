'use strict';

(function () {
  var selectElements = document.querySelectorAll('.tokyo__filter');
  var parentElement = document.querySelector('.tokyo__filters-container');
  var checkboxElements = parentElement.querySelectorAll('.feature input[type="checkbox"]');

  var optionValues = {
    typeHouse: 'any',
    housingPrice: 'middle',
    roomNumber: 'any',
    housingGuests: 'any',
    wifi: 'any',
    dishwasher: 'any',
    parking: 'any',
    washer: 'any',
    elevator: 'any',
    conditioner: 'any'
  };

  function typeHouseFilter() {
    if (!(optionValues.typeHouse === 'any')) {
      window.filteredAdvertisements = window.filteredAdvertisements.filter(function (arrayElement) {
        return (arrayElement.offer.type + '') === optionValues.typeHouse;
      });
    }
  }

  function roomNumberFilter() {
    if (!(optionValues.roomNumber === 'any')) {
      window.filteredAdvertisements = window.filteredAdvertisements.filter(function (arrayElement) {
        return (arrayElement.offer.rooms + '') === optionValues.roomNumber;
      });
    }
  }

  function housingGuestsFilter() {
    if (!(optionValues.housingGuests === 'any')) {
      window.filteredAdvertisements = window.filteredAdvertisements.filter(function (arrayElement) {
        return (arrayElement.offer.guests + '') === optionValues.housingGuests;
      });
    }
  }

  function housingPriceFilter(optionValue) {
    switch (optionValues.housingPrice) {
      case 'middle':
        window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
          return (it.offer.price > 10000 && it.offer.price < 50000);
        });
        break;
      case 'low':
        window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
          return it.offer.price < 10000;
        });
        break;
      case 'high':
        window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
          return it.offer.price > 50000;
        });
        break;
    }
  }

  function allFilters() {
    typeHouseFilter();
    housingGuestsFilter();
    roomNumberFilter();
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
      for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].selected) {
          optionValues[select.getAttribute('data-filter')] = select.options[i].value;
          break;
        }
      }
      window.debounce(filtersAndRenderPins);
    });
  });

  function checkboxFilter(keyName) {
    if ((!(keyName === 'any'))) {
      window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
        return it.offer.features.indexOf(keyName) > -1;
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
