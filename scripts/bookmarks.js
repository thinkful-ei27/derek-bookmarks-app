'use strict';

const bookmarks = (function(){
  function render() {
    console.log('render ran');
  }

  return {
    render
  };
}());