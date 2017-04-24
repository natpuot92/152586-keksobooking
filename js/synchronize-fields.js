'use strict';
(function () {
  window.synchronizeFields = function (changeField, suncField, changeFieldValues, suncFieldValues, callback) {
    changeField.addEventListener('change', function () {
      for (var i = 0; i < changeFieldValues.length; i++) {
        if (changeField.value === changeFieldValues[i]) {
          callback(suncField, suncFieldValues[i]);
          break;
        }
      }
    });
  };
})();
