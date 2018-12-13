'use strict';

/* global $, bookmarks, store, api, initialize */

$(document).ready(function () {
  initialize.extendJquery();
  bookmarks.bindEventListeners();
  bookmarks.render();
  api.getItems(items => {
    items.forEach(item => {
      item.expanded = false;
      store.addItem(item);
    });
    bookmarks.render();
  });
});
