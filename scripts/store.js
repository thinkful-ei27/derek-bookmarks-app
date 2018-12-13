'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function(){
  const items = [
    {
      title: 'Highly Rated Bookmark',
      url: 'http://derekhouck.com',
      desc: 'The website of this guy I know',
      rating: 5,
      expanded: false 
    },
    {
      title: 'Lowly Rated Bookmark',
      url: 'http://example.com',
      desc: 'Lorem ipsum text',
      rating: 2,
      expanded: true
    },
    {
      title: 'Bookmark without rating',
      url: 'http://google.com',
      desc: 'You might have heard of this site',
      rating: 0,
      expanded: false
    }
  ];
  const minRating = 0;
  let adding = false;
  const editing = null;
  const error = null;

  function toggleAdding() {
    this.adding = !this.adding;
  }
  
  return {
    items,
    minRating,
    adding,
    editing,
    error,
    toggleAdding
  };
}());