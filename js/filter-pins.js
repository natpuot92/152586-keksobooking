'use strict';

(function () {
  var parentElement = document.querySelector('.tokyo__filters-container');
  var typeHouse = parentElement.querySelector('#housing_type');
  var housingPrice = parentElement.querySelector('#housing_price');
  var roomNumber = parentElement.querySelector('#housing_room-number');
  var housingGuests = parentElement.querySelector('#housing_guests-number');
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
    if ((!(optionValues.typeHouse === 'any'))) {
      window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
        return (it.offer.type + '') === optionValues.typeHouse;
      });
    }
  }

  function roomNumberFilter() {
    if ((!(optionValues.roomNumber === 'any'))) {
      window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
        return (it.offer.rooms + '') === optionValues.roomNumber;
      });
    }
  }

  function housingGuestsFilter() {
    if ((!(optionValues.housingGuests === 'any'))) {
      window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
        return (it.offer.rooms + '') === optionValues.housingGuests;
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

  typeHouse.addEventListener('change', function () {

    for (var i = 0; i < typeHouse.options.length; i++) {
      if (typeHouse.options[i].selected) {
        optionValues.typeHouse = typeHouse.options[i].value;
        break;
      }
    }

    window.debounce(filtersAndRenderPins);
  });

  roomNumber.addEventListener('change', function () {
    for (var i = 0; i < roomNumber.options.length; i++) {
      if (roomNumber.options[i].selected) {
        optionValues.roomNumber = roomNumber.options[i].value;
        break;
      }
    }
    window.debounce(filtersAndRenderPins);
  });

  housingPrice.addEventListener('change', function () {
    delete optionValues.housingPrice;
    for (var i = 0; i < roomNumber.options.length; i++) {
      if (housingPrice.options[i].selected) {
        optionValues.housingPrice = housingPrice.options[i].value;
        break;
      }
    }
    window.debounce(filtersAndRenderPins);
  });

  housingGuests.addEventListener('change', function () {
    for (var i = 0; i < housingGuests.options.length; i++) {
      if (housingGuests.options[i].selected) {
        optionValues.housingGuests = housingGuests.options[i].value;
        break;
      }
    }
    window.debounce(filtersAndRenderPins);
  });

  function checkboxFilter(keyName) {
    if ((!(keyName === 'any'))) {
      window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
        for (var i = 0; i < it.offer.features.length; i++) {
          if ((!(keyName === 'any'))) {
            if (it.offer.features[i] === keyName) {
              return true;
            }
          }
        }
        return false;
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
