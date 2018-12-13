'use strict';

/* global $ */

// eslint-disable-next-line no-unused-vars
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
  const expandedBookmark = `
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
          <section class="bookmark__details">
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
  const minRatingFilter = `
    <section class="toolbar">
      <div class="min-rating">
        <label for="minRating">Minimum Rating:</label>
        <select name="minRating" id="minRating">
          <option value="0">No minimum</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3" selected>3 stars</option>
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
          <div>Rating: 5</div>
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
          <div>Rating: 3</div>
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
          <div>Rating: 4</div>
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
  const addBookmark = `
    <h2>Add Bookmark</h2>
    <p>Required fields marked with a *</p>
    <p class="error-message" hidden>ERROR: Error message</p>
    <form action="" class="add-bookmark-form">
      <fieldset class="add-bookmark__fields">
        <label for="title">Title<span class="required">*</span></label>
        <input type="text" name="title" id="title" required>
        <label for="url">URL<span class="required">*</span></label>
        <input type="url" name="url" id="url" required>
        <label for="description">Description</label>
        <textarea name="desc" id="description" cols="30" rows="10"></textarea>
        <label for="rating">Rating</label>
        <input type="number" name="rating" id="rating">
      </fieldset>
      <fieldset class="add-bookmark__controls">
        <button type="reset">Cancel</button>
        <button type="submit">Add Bookmark</button>
      </fieldset>
    </form>
  `;
  const addBookmarkError = `
    <h2>Add Bookmark</h2>
    <p>Required fields marked with a *</p>
    <p class="error-message">ERROR: Error message</p>
    <form action="" class="add-bookmark-form">
      <fieldset class="add-bookmark__fields">
        <label for="title">Title<span class="required">*</span></label>
        <input type="text" name="title" id="title" required>
        <label for="url">URL<span class="required">*</span></label>
        <input type="url" name="url" id="url" required>
        <label for="description">Description</label>
        <textarea name="desc" id="description" cols="30" rows="10"></textarea>
        <label for="rating">Rating</label>
        <input type="number" name="rating" id="rating">
      </fieldset>
      <fieldset class="add-bookmark__controls">
        <button type="reset">Cancel</button>
        <button type="submit">Add Bookmark</button>
      </fieldset>
    </form>
  `;
  const editBookmark = `
    <h2>Edit Bookmark</h2>
    <p>Required fields marked with a *</p>
    <p class="error-message" hidden>ERROR: Error message</p>
    <form action="" class="edit-bookmark-form">
      <fieldset class="edit-bookmark__fields">
        <label for="title">Title<span class="required">*</span></label>
        <input type="text" name="title" id="title" required placeholder="Existing Bookmark">
        <label for="url">URL<span class="required">*</span></label>
        <input type="url" name="url" id="url" required placeholder="http://example.com">
        <label for="description">Description</label>
        <textarea name="desc" id="description" cols="30" rows="10">Lorem ipsum text</textarea>
        <label for="rating">Rating</label>
        <input type="number" name="rating" id="rating" placeholder="2">
      </fieldset>
      <fieldset class="edit-bookmark__controls">
        <button type="reset">Cancel</button>
        <button type="submit">Apply Changes</button>
      </fieldset>
    </form>
  `;

  
  function generateBookmarksString(string) {
    return string;
  }

  function render() {
    $('.bookmark-app').html(generateBookmarksString(editBookmark));
  }

  return {
    render
  };
}());