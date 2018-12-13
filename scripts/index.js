'use strict';

/* global $, bookmarks, store, api */

$(document).ready(function () {
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
