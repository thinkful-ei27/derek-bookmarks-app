'use strict';

/* global $, store, api */

// eslint-disable-next-line no-unused-vars
const bookmarks = (function(){
  function generateListElement(item) {
    const listElement = `
      <li class="bookmark js-bookmark" data-item-id="${item.id}">
        <div class="bookmark__title">${item.title}</div>
        <div>Rating: ${item.rating ? item.rating : 'No rating'}</div>
        <section class="bookmark__details" ${!(item.expanded) ? 'hidden' : ''}>
          <a href="${item.url}">Visit ${item.url}</a>
          <p>${item.desc ? item.desc : 'There\'s no description for this item yet.'}</p>
          <div class="bookmark__buttons">
            <button class="bookmark__edit">Edit Bookmark</button>
            <button class="bookmark__delete">Delete Bookmark</button>
          </div>
        </section>
        <p class="bookmark__expand">click to ${item.expanded ? 'collapse' : 'expand'}</p>
      </li>
    `;
    return listElement ;
  }

  function getItemIdFromElement(element) {
    return $(element)
      .closest('.js-bookmark')
      .data('item-id');
  }

  function filterByRating(items) {
    let newItems = [...items];
    return newItems.filter(item => item.rating >= store.minRating);
  }

  function generateBookmarksList(items){
    const filteredItems = filterByRating(items);
    let bookmarksList = `
      <ul class="bookmarks__list">
        ${filteredItems.map(item => generateListElement(item)).join('')}
      </ul>
    `;
    return bookmarksList;
  }

  function generateBookmarksSection() {
    const items = store.items;
    const emptyMessage = '<p class="empty-list-message">You do not currently have any bookmarks. Add one now by clicking the "Add Bookmark" button.</p>';
    let bookmarksSection = `
      <section class="bookmarks">
        ${items.length > 0 ? generateBookmarksList(items) : emptyMessage}
      </section>
    `;
    return bookmarksSection;
  }

  function addPlaceholders() {
    let placeholders = {
      title: '',
      url: '',
      desc: '',
      rating: ''
    };
    if (store.editing) {
      const item = store.items[store.editing];
      Object.assign(placeholders, item);
    }
    return placeholders;
  }

  function generateBookmarksForm() {
    const placeholders = addPlaceholders();
    let string = `
      <h2>${store.editing ? 'Edit' : 'Add'} Bookmark</h2>
      <p>Required fields marked with a *</p>
      <p class="error-message" ${!(store.error) ? 'hidden' : ''}>ERROR: Error message</p>
      <form action="" class="bookmark-form">
        <fieldset class="bookmark__fields">
          <label for="title">Title<span class="required">*</span></label>
          <input type="text" name="title" id="title" required placeholder="${placeholders.title}">
          <label for="url">URL<span class="required">*</span></label>
          <input type="url" name="url" id="url" required placeholder="${placeholders.url}">
          <label for="description">Description</label>
          <textarea name="desc" id="description" cols="30" rows="10">${placeholders.desc}</textarea>
          <label for="rating">Rating</label>
          <input type="number" name="rating" id="rating" min="1" max="5" placeholder="${placeholders.rating}">
        </fieldset>
        <fieldset class="bookmark__controls">
          <button type="reset" class="js-bookmark-form-cancel">Cancel</button>
          <button type="submit">${store.editing ? 'Apply Changes' : 'Add Bookmark'}</button>
        </fieldset>
      </form>
    `;
    return string;
  }
  
  function generateBookmarksString() {
    const toolbar = `
      <section class="toolbar">
        <div class="min-rating">
          <label for="minRating">Minimum Rating:</label>
          <select name="minRating" id="minRating">
            <option value="0">No minimum</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </div>
        <button class="add-bookmark">Add Bookmark</button>
      </section>
    `;
    let string = '';
    if (store.adding || store.editing) {
      string += generateBookmarksForm();
    } else {
      string += toolbar + generateBookmarksSection();
    }
    return string;
  }

  function render() {
    $('.bookmark-app').html(generateBookmarksString());
  }

  function handleAddBookmarkButtonClick() {
    $('.bookmark-app').on('click', '.add-bookmark', () => {
      store.toggleAdding();
      render();
    });
  }

  function handleEditBookmarkButtonClick() {
    $('.bookmark-app').on('click', '.bookmark__edit', () => {
      store.toggleEditing();
      render();
    });
  }

  function handleDeleteBookmarkButtonClick() {
    $('.bookmark-app').on('click', '.bookmark__delete', () => {
      const id = getItemIdFromElement(event.target);
      api.deleteItem(id, response => {
        store.deleteItem(id);
        render();
      });
    });
  }

  function handleCancelButtonClick() {
    $('.bookmark-app').on('click', '.js-bookmark-form-cancel', () => {
      store.clearAddingAndEditing();
      render();
    });
  }

  function handleFormSubmit() {
    $('.bookmark-app').on('submit', '.bookmark-form', () => {
      event.preventDefault();
      const formData = $(event.target).serializeJson();
      api.createItem(formData, (item) => {
        store.addItem(item);
        store.clearAddingAndEditing();
        render();
      });
    });
  }

  function handledClickToExpand() {
    $('.bookmark-app').on('click', '.bookmark__expand', () => {
      const id = getItemIdFromElement(event.target);
      const item = store.findById(id);
      store.toggleExpanding(item);
      render();
    });
  }

  function bindEventListeners() {
    handleAddBookmarkButtonClick();
    handleEditBookmarkButtonClick();
    handleDeleteBookmarkButtonClick();
    handleCancelButtonClick();
    handleFormSubmit();
    handledClickToExpand();
  }

  return {
    render,
    bindEventListeners
  };
}());