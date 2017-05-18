'use strict';
(function () {
  var dragNdropElement = document.querySelectorAll('.form__photo');
  var dragItem;
  for (var i = 0; i < dragNdropElement.length; i++) {
    dragNdropElement[i].addEventListener('dragstart', function (evt) {
      if (evt.target.tagName.toLowerCase() === 'img') {
        dragItem = evt.target;
        window.whereDid = evt.currentTarget;
      }
    });
  }

  var dropeZone = document.querySelectorAll('.form__photo');

  for (var j = 0; j < dragNdropElement.length; j++) {
    dropeZone[j].addEventListener('dragover', function (evt) {
      evt.preventDefault();
      return false;
    });

    dropeZone[j].addEventListener('dragenter', function (evt) {
      evt.currentTarget.style.backgroundColor = 'yellow';
      evt.preventDefault();
    });

    dropeZone[j].addEventListener('drop', function (evt) {
      var ImgElement = evt.currentTarget.children;
      evt.currentTarget.style.backgroundColor = '';
      var element = ImgElement[0];
      evt.currentTarget.removeChild(ImgElement[0]);
      evt.currentTarget.appendChild(dragItem);
      window.whereDid.appendChild(element);
      evt.preventDefault();
    });

    dropeZone[j].addEventListener('dragleave', function (evt) {
      evt.currentTarget.style.backgroundColor = '';
      evt.preventDefault();
    });
  }
})();
