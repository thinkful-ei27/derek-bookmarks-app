'use strict';

/* global $, store, api */

// eslint-disable-next-line no-unused-vars
const bookmarks = (function(){
  function extractNewData(formData) {
    const obj = JSON.parse(formData);
    const existingItem = store.findById(obj.id);
    const newData = {};
    for (const key in obj) {
      if (obj[key] !== existingItem[key]) {
        newData[key] = obj[key];
      }
    }
    return newData;
  }

  function generateListElement(item) {
    const listElement = `
      <li class="bookmark js-bookmark" data-item-id="${item.id}" aria-label="bookmark">
        <div class="bookmark__title" aria-label="bookmark title">${item.title}</div>
        <div class="bookmark__rating">Rating: ${item.rating ? item.rating : 'No rating'}</div>
        <section class="bookmark__details" ${!(item.expanded) ? 'hidden' : ''}>
          <a href="${item.url}">${item.url}</a>
          <p>${item.desc ? item.desc : 'There\'s no description for this item yet.'}</p>
          <div class="bookmark__buttons">
            <button class="bookmark__edit">Edit Bookmark</button>
            <button class="bookmark__delete">Delete Bookmark</button>
          </div>
        </section>
        <button class="bookmark__expand">${item.expanded ? 'collapse' : 'expand'}</button>
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
      const item = store.findById(store.editing);
      Object.assign(placeholders, item);
      for (const key in placeholders) {
        if (placeholders[key] === null) {
          placeholders[key] = '';
        }
      }
    }
    return placeholders;
  }

  function generateBookmarksForm() {
    const placeholders = addPlaceholders();
    let string = `
      <h2>${store.editing ? 'Edit' : 'Add'} Bookmark</h2>
      <p>Required fields marked with a *</p>
      <p class="error-message" ${!(store.error) ? 'hidden' : ''}>ERROR: ${store.error}</p>
      <form action="" class="bookmark-form">
        <div class="bookmark__fields">
          <label for="title">Title<span class="required">*</span></label>
          <input type="text" name="title" id="title" value="${placeholders.title}">
          <label for="url">URL<span class="required">*</span></label>
          <input type="url" name="url" id="url" value="${placeholders.url}" placeholder="http(s)://domainname.com">
          <label for="description">Description</label>
          <textarea name="desc" id="description" cols="30" rows="10">${placeholders.desc}</textarea>
          <label for="rating">Rating</label>
          <input type="number" name="rating" id="rating" value="${placeholders.rating}">
        </div>
        <div class="bookmark__controls">
          <button type="reset" class="js-bookmark-form-cancel">Cancel</button>
          <button type="submit">${store.editing ? 'Apply Changes' : 'Add Bookmark'}</button>
          ${store.editing ? '<input type="hidden" id="bookmarkID" name="id" value="' + placeholders.id + '">' : ''}
        </div>
      </form>
    `;
    return string;
  }

  function generateMinRatingOptions() {
    const currentMinRating = store.minRating;
    const optionElementArr = [];
    function generateOptionLabel(num) {
      if (num === 0) {
        return 'No minimum';
      } else if (num === 1) {
        return num + ' star';
      } else {
        return num + ' stars';
      }
    }
    for (let i = 0; i <= 5; i++) {
      optionElementArr.push(`<option value="${i}" ${i ===  currentMinRating ? 'selected' : ''}>${generateOptionLabel(i)}</option>`);
    }
    const optionsString = optionElementArr.join('');
    return optionsString;
  }
  
  function generateBookmarksString() {
    const toolbar = `
      <section class="toolbar">
        <div class="min-rating">
          <label for="minRating">Minimum Rating:</label>
          <select name="minRating" id="minRating">
            ${generateMinRatingOptions()}
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
      const id = getItemIdFromElement(event.target);
      store.toggleEditing(id);
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
      const id = $('#bookmarkID').val();
      const formData = $(event.target).serializeJson();
      if (store.editing) {
        const newData = extractNewData(formData);
        api.updateItem(newData, id, () => {
          store.updateItem(id, newData);
          store.clearAddingAndEditing();
          render();
        });
      }
      else {
        api.createItem(formData, (item) => {
          store.addItem(item);
          store.clearAddingAndEditing();
          render();
        });
      }
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

  function handleMinRatingDropdownChange() {
    $('.bookmark-app').on('change', '#minRating', () => {
      const val = $(event.target).val();
      store.setMinRating(val);
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
    handleMinRatingDropdownChange();
  }

  return {
    render,
    bindEventListeners
  };
}());