'use strict';

/* global $ */

// eslint-disable-next-line no-unused-vars
const initialize = (function(){
  function extendJquery() {
    $.fn.extend({
      serializeJson: function() {
        const formData = new FormData(this[0]);
        const o = {};
        formData.forEach((val, name) => o[name] = val);
        return JSON.stringify(o);
      }
    });
  }

  return {
    extendJquery
  };
}());