'use strict';
(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarFileChooser = document.querySelector('.drop-zone input[type=file]');
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
  });

  var housingFileChooser = document.querySelector('.form__photo-container input[type=file]');
  var previewHousing = document.querySelectorAll('.form__photo');

  for (var i = 0; i < previewHousing.length; i++) {
    var childImg = document.createElement('img');
    childImg.className = 'img-foto img-foto-' + i;
    childImg.setAttribute('width', '100%');
    childImg.setAttribute('height', '100%');
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
        for (var j = 0; j < previewHousingImg.length; j++) {
          if (previewHousingImg[j].src === '') {
            previewHousingImg[j].src = reader.result;
            break;
          }
        }
        return;
      });
      reader.readAsDataURL(file);
    }
  });
})();
