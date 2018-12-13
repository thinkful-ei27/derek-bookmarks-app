'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function(){
  const items = [
    {
      title: 'Highly Rated Bookmark',
      rating: 5,
      expanded: false 
    },
    {
      title: 'Lowly Rated Bookmark',
      rating: 2,
      expanded: true
    },
    {
      title: 'Bookmark without rating',
      rating: 0,
      expanded: false
    }
  ];
  const minRating = 0;
  const adding = true;
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