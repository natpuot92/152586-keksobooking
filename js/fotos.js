'use strict';
(function () {

var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
var avatarFileChooser = document.querySelector('.drop-zone input[type=file]')
var previewAvatar = document.querySelector('.notice__preview img');

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

var housingFileChooser = document.querySelector('.form__photo-container input[type=file]');
var previewHousing = document.querySelectorAll('.form__photo');
var fragment = document.createDocumentFragment();

for (var i = 0; i < previewHousing.length; i++) {
  var childImg = document.createElement('img');
  childImg.className = 'img-foto img-foto-' + i;
  childImg.setAttribute('width', '45');
  childImg.setAttribute('height', '45');
  previewHousing[i].appendChild(childImg);
}

  var previewHousingImg = document.querySelectorAll('.img-foto');

  housingFileChooser.addEventListener('change', function () {
    var file = housingFileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (format) {
    return fileName.endsWith(format);
  });

  if (matches) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      for (var i = 0; i < previewHousingImg.length; i++) {
        if (previewHousingImg[i].src === '') {
          return previewHousingImg[i].src = reader.result;
        }
      }
    });

    reader.readAsDataURL(file);
  }
  })

})();
