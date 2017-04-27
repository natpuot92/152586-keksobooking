'use strict';

(function () {

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

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHandler = function (data) {
    window.advertisements = data;
    window.filteredAdvertisements = data;
    window.renderPin(data);
    console.log(window.filteredAdvertisements);
  };

  window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', successHandler, errorHandler);



  var filterElements = document.querySelectorAll('.tokyo__filter');

  var filteredAdvertisements = [];

  var parentElement =  document.querySelector('.tokyo__filters-container');
  var typeHouse = parentElement.querySelector('#housing_type');
  var housingPrice = parentElement.querySelector('#housing_price');
  var roomNumber = parentElement.querySelector('#housing_room-number');
  var housingGuests = parentElement.querySelector('#housing_guests-number');
  var wifiFilter = parentElement.querySelector('.tokyo__filter-set input[value="wifi"]');
  var dishwasherFilter = parentElement.querySelector('.tokyo__filter-set input[value="dishwasher"]');
  var parkingFilter = parentElement.querySelector('.tokyo__filter-set input[value="parking"]');
  var washerFilter = parentElement.querySelector('.tokyo__filter-set input[value="washer"]');
  var elevatorFilter = parentElement.querySelector('.tokyo__filter-set input[value="elevator"]');
  var conditionerFilter = parentElement.querySelector('.tokyo__filter-set input[value = "conditioner"]');
    console.log(parkingFilter)

  var optionValues = {
    typeHouse: "any",
    housingPrice: "middle",
    roomNumber: "any",
    housingGuests: "any",
    wifi: "any",
    dishwasher: "any",
    parking: "any",
    washer: "any",
    elevator: "any",
    conditioner: "any"
  }


  function typeHouseFilter () {
      if ((!(optionValues.typeHouse === 'any'))) {
         window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
         return (it.offer.type + "") === optionValues.typeHouse;
        })
      };
  }

  function roomNumberFilter () {
      if ((!(optionValues.roomNumber === 'any'))) {
         window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
         return (it.offer.rooms + "") === optionValues.roomNumber;
        })
      };
  }

  function housingGuestsFilter () {
    if ((!(optionValues.housingGuests === 'any'))) {
         window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
         return (it.offer.rooms + "") === optionValues.housingGuests;
        })
      };
  }

  function housingPriceFilter () {
    if (optionValues.housingPrice === "middle") {
      window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
        return (it.offer.price > 10000 && it.offer.price < 50000)
      })
      } else if (optionValues.housingPrice === "low") {
        window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
          return it.offer.price < 10000;
        })
      } else {
        window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
          return it.offer.price > 50000;
      })
    }
  };

  function checkboxFilter(keyName) {
    if ((!(keyName === 'any'))) {
      window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
       for (var i = 0; i < it.offer.features.length; i++) {
            if ((!(keyName === 'any'))) {
            if (it.offer.features[i] === keyName){
              return true;
            }
          }
        }
      })
    }
  }

  function allFilters() {
    typeHouseFilter();
    housingGuestsFilter ()
    roomNumberFilter ()
    housingPriceFilter ();
    checkboxFilter(optionValues.wifi);
    checkboxFilter(optionValues.dishwasher);
    checkboxFilter(optionValues.elevator);
    checkboxFilter(optionValues.conditioner);
    checkboxFilter(optionValues.washer);
    checkboxFilter(optionValues.parking);
  }



  var endFunction = function () {
    window.filteredAdvertisements = window.advertisements;
    allFilters();
    window.pins.forEach(function (pin) {
      pin.classList.add('hidden');
    })

    window.renderPin(window.filteredAdvertisements);
    }

  typeHouse.addEventListener('change', function () {
    delete optionValues.typeHouse;

    for (var i = 0; i <  typeHouse.options.length; i++) {
      if (typeHouse.options[i].selected) {
        optionValues.typeHouse = typeHouse.options[i].value;
        break;
      }
    }

    window.debounce(endFunction);
  });


  roomNumber.addEventListener('change', function () {

    delete optionValues.roomNumber;

    for (var i = 0; i < roomNumber.options.length; i++) {

      if (roomNumber.options[i].selected) {
        optionValues.roomNumber = roomNumber.options[i].value;
        break;
      }
    }
   window.debounce(endFunction);
  });


    housingPrice.addEventListener('change', function () {
      delete optionValues.housingPrice;
      for (var i = 0; i < roomNumber.options.length; i++) {
        if (housingPrice.options[i].selected) {
          optionValues.housingPrice = housingPrice.options[i].value;
          break;
        }
      }
      window.debounce(endFunction);
    });


  housingGuests.addEventListener('change', function () {
    delete optionValues.housingGuests;
    for (var i = 0; i < housingGuests.options.length; i++) {
      if (housingGuests.options[i].selected) {
        optionValues.housingGuests = housingGuests.options[i].value;
        break;
      }
    }
   window.debounce(endFunction);
});

   wifiFilter.addEventListener('change', function () {
    delete optionValues.wifiFilter;
      if (wifiFilter.checked) {
        optionValues.wifi = wifiFilter.value;
        } else {
          optionValues.wifi = "any";
        }

     window.debounce(endFunction);
  });

  dishwasherFilter.addEventListener('change', function () {
        delete optionValues.dishwasherFilter;
      if (dishwasherFilter.checked) {
        optionValues.dishwasher = dishwasherFilter.value;
        } else {
          optionValues.dishwasher = "any";
        }

    window.debounce(endFunction);
  });

  parkingFilter.addEventListener('change', function () {
      delete optionValues.parkingFilter;
      if (parkingFilter.checked) {
        optionValues.parking = parkingFilter.value;
        } else {
          optionValues.parking = "any";
        }

    window.debounce(endFunction);
  });

  washerFilter.addEventListener('change', function () {
      delete optionValues.washerFilter;
      if (washerFilter.checked) {
        optionValues.washer = washerFilter.value;
        } else {
          optionValues.washer = "any";
        }

    window.debounce(endFunction);
  });

  elevatorFilter.addEventListener('change', function () {
      delete optionValues.elevatorFilter;
      if (elevatorFilter.checked) {
        optionValues.elevator = elevatorFilter.value;
        } else {
          optionValues.elevator = "any";
        }

    window.debounce(endFunction);
  });
  conditionerFilter.addEventListener('change', function () {
      delete optionValues.conditionerFilter;
      if (conditionerFilter.checked) {
        optionValues.conditioner = conditionerFilter.value;
        } else {
          optionValues.conditioner = "any";
        }

    window.debounce(endFunction);
  });

})();
