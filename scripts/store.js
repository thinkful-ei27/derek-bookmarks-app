'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function(){
  const items = [
    // {
    //   title: 'Bookmark Title',
    //   expanded: false 
    // }
  ];
  const minRating = 0;
  const adding = false;
  const editing = false;
  const error = null;
  
  return {
    items,
    minRating,
    adding,
    editing,
    error
  };
}());