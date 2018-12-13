'use strict';

/* global $ */

const bookmarks = (function(){
  const initialState = `
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
    <section class="bookmarks">
      <p class="empty-list-message">You do not currently have any bookmarks. Add one now by clicking the "Add Bookmark" button.</p>
    </section>
  `;
  const withBookmarks = `
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
    <section class="bookmarks">
      <ul class="bookmarks__list">
        <li class="bookmark">
          <div class="bookmark__title">Bookmark Title</div>
          <div>Rating: 1</div>
          <section class="bookmark__details" hidden>
            <a href="http://example.com">Visit site</a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat. Aliquam egestas, velit at condimentum placerat, sem sapien laoreet mauris, dictum porttitor lacus est nec enim.</p>
            <div class="bookmark__buttons">
              <button class="bookmark__edit">Edit Bookmark</button>
              <button class="bookmark__delete">Delete Bookmark</button>
            </div>
          </section>
          <p class="bookmark__expand">click to expand</p>
        </li>
        <li class="bookmark">
          <div class="bookmark__title">Bookmark Title</div>
          <div>Rating: 1</div>
          <section class="bookmark__details" hidden>
            <a href="http://example.com">Visit site</a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat. Aliquam egestas, velit at condimentum placerat, sem sapien laoreet mauris, dictum porttitor lacus est nec enim.</p>
            <div class="bookmark__buttons">
              <button class="bookmark__edit">Edit Bookmark</button>
              <button class="bookmark__delete">Delete Bookmark</button>
            </div>
          </section>
          <p class="bookmark__expand">click to expand</p>
        </li>
        <li class="bookmark">
          <div class="bookmark__title">Bookmark Title</div>
          <div>Rating: 1</div>
          <section class="bookmark__details" hidden>
            <a href="http://example.com">Visit site</a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat. Aliquam egestas, velit at condimentum placerat, sem sapien laoreet mauris, dictum porttitor lacus est nec enim.</p>
            <div class="bookmark__buttons">
              <button class="bookmark__edit">Edit Bookmark</button>
              <button class="bookmark__delete">Delete Bookmark</button>
            </div>
          </section>
          <p class="bookmark__expand">click to expand</p>
        </li>
      </ul>
    </section>
  `;

  
  function generateBookmarksString(string) {
    return string;
  }

  function render() {
    $('.bookmark-app').html(generateBookmarksString(withBookmarks));
  }

  return {
    render
  };
}());