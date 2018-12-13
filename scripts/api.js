'use strict';

// eslint-disable-next-line no-unused-vars
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/derek/';
  console.log(BASE_URL);
  const sampleData = [
    {
      'id': 'cjpn4a474001n0kwnkv4ek4oy',
      'title': 'derekhouck.com',
      'url': 'http://derekhouck.com',
      'desc': 'The website of this guy I know',
      'rating': 5
    },
    {
      'id': 'cjpn4anc6001o0kwnzzwodvjw',
      'title': 'Example Bookmark',
      'url': 'http://example.com',
      'desc': 'Lorem ipsum text',
      'rating': 5
    },
    {
      'id': 'cjpn4b6zx001p0kwn8uh5zydx',
      'title': 'Bookmark without a rating or description',
      'url': 'http://google.com',
      'desc': null,
      'rating': null
    }
  ];
  return sampleData;
}());