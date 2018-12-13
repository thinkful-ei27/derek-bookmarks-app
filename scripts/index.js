'use strict';

/* global $, bookmarks, store, api */

$(document).ready(function () {
  api.forEach(item => {
    item.expanded = false;
    store.addItem(item);
  });
  bookmarks.bindEventListeners();
  bookmarks.render();
});
