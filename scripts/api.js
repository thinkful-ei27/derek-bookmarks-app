'use strict';

/* global $ */

// eslint-disable-next-line no-unused-vars
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/derek';
  const errorCallback = function(error) {
    console.log(error);
  };

  function getItems(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  }

  function createItem(item, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: item,
      success: callback,
      error: errorCallback
    });
  }

  function deleteItem(id, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
      error: errorCallback
    });
  }

  return {
    getItems,
    createItem,
    deleteItem
  };
}());