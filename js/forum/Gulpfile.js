var flarum = require('flarum-gulp');

flarum({
  modules: {
    'beeta-dev/ext-quickquote': [
      'src/**/*.js'
    ]
  }
});