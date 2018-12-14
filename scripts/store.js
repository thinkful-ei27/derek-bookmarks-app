'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function(){
  const items = [];
  const minRating = 0;
  let adding = false;
  const editing = null;
  const error = null;


  function findById(id) {
    return this.items.find(item => item.id === id);
  }

  function toggleAdding() {
    this.adding = !this.adding;
    return this.adding;
  }

  function toggleEditing(id) {
    this.editing = id;
    return this.editing;
  }

  function clearAddingAndEditing(){
    this.adding = false;
    this.editing = null;
    return this;
  }

  function toggleExpanding(item) {
    item.expanded = !item.expanded;
    return item.expanded;
  }

  function addError(errorMessage) {
    this.error = errorMessage;
    return this.error;
  }

  function clearError() {
    this.error = null;
    return this.error;
  }

  function addItem(item) {
    const newItem = this.items.push(item);
    return newItem;
  }

  function updateItem(id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
    return item;
  }

  function deleteItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    return this.items;
  }

  function setMinRating(rating) {
    this.minRating = Number(rating);
    return this.minRating;
  }

  
  return {
    items,
    minRating,
    adding,
    editing,
    error,
    findById,
    toggleAdding,
    toggleEditing,
    clearAddingAndEditing,
    toggleExpanding,
    addError,
    clearError,
    addItem,
    updateItem,
    deleteItem,
    setMinRating
  };
}());