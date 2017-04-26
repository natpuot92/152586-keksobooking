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
    window.renderPin(data);
    window.onMomentFilter = window.advertisements;
  };

  window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', successHandler, errorHandler);



  var filterElements = document.querySelectorAll('.tokyo__filter');

  var filteredAdvertisements = [];
//  filterElements.forEach(function (filterElement) {
//  filterElement.addEventListener('change', function () {

  var typeHouse = document.querySelector('#housing_type');
  var housingPrice = document.querySelector('housing_price');
  var roomNumber = document.querySelector('#housing_room-number');
  var housingGuests = document.querySelector('#housing_guests-number');

  var selectOptionValues = {
    typeHouse: "any",
    housingPrice: "middle",
    roomNumber: "1",
    housingGuests: "any"
  }

  typeHouse.addEventListener('change', function () {

    delete selectOptionValues.typeHouse;
    for (var i = 0; i <  typeHouse.options.length; i++) {
      if (typeHouse.options[i].selected) {
        selectOptionValues.typeHouse = typeHouse.options[i].value;
        break;
      }
    }
    debugger
      window.filteredAdvertisements = window.advertisements;
      if ((!(selectOptionValues.typeHouse === 'any'))) {
        window.filteredAdvertisements = window.filteredAdvertisements.filter(function (it) {
         return it.offer.type === selectOptionValues.typeHouse;
        })
      };
      if ((!(selectOptionValues.roomNumber === 'any'))) {
      window.filteredAdvertisements =  window.filteredAdvertisements.filter(function (it) {
        return it.offer.rooms === parseInt(selectOptionValues.roomNumber);
      });
      };

      console.log(window.filteredAdvertisements);

      window.pins.forEach(function (pin) {
      pin.classList.add('hidden');
    });

     window.renderPin(window.filteredAdvertisements);
  })
  })();



//var filterArrayRoomNumber = []
//
//
//  roomNumber.addEventListener('change', function () {
//    filterArrayRoomNumber = window.onMomentFilter.filter(function (it) {
//      return it.offer.rooms === parseInt(roomNumber.value);
//      });
//
//      window.pins.forEach(function (pin) {
//      pin.classList.add('hidden');
//    });
//     window.renderPin(window.onMomentFilter);
//  })
//




