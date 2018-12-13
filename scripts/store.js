'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function(){
  const items = [];
  const minRating = 0;
  let adding = false;
  const editing = null;
  const error = null;


  function toggleAdding() {
    this.adding = !this.adding;
    return this.adding;
  }

  function toggleEditing() {
    this.editing = 1;
    return this.editing;
  }

  function addItem(item) {
    const newItem = this.items.push(item);
    return newItem;
  }
  
  return {
    items,
    minRating,
    adding,
    editing,
    error,
    toggleAdding,
    toggleEditing,
    addItem
  };
}());