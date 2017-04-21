'use strict';

window.synchronizeFields = function (changeField, suncField, objectValues, callback) {

  changeField.addEventListener('change', function () {
    for (var key in objectValues) {
      if (objectValues[key] === changeField.value) {
        callback(suncField, objectValues[key], key);
        return;
      } else {
        if (key === changeField.value) {
          callback(suncField, objectValues[key], key);
        }
      }
    }
  });
};
