'use strict';
(function () {
var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
var avatarFileChooser = document.querySelector('.drop-zone input[type=file]')
var previewAvatar = document.querySelector('.notice__preview img');
var housingFileChooser = document.querySelector('.form__photo-container input[type=file]');
console.log(housingFileChooser)

avatarFileChooser.addEventListener('change', function () {
  var file = avatarFileChooser.files[0];
  var fileName = file.name.toLowerCase();

  var matches = FILE_TYPES.some(function (format) {
    return fileName.endsWith(format);
  });

  if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
})


})();
