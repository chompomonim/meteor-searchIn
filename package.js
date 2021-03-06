Package.describe({
  name: 'nous:search-in',
  version: '0.2.2',
  summary: 'Search in Mongo collection for Meteor apps with transliteration support.',
  git: 'https://github.com/chompomonim/meteor-searchIn',
  documentation: 'README.md'
});

Npm.depends({
  unidecode: '0.1.8'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use([
    'ecmascript',
    'matb33:collection-hooks@0.8.1',
    'lai:collection-extensions@0.2.1_1'
    ]);
  api.mainModule('search-in.js', 'server');
  api.mainModule('utils.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('nous:search-in');
  api.mainModule('search-in-tests.js');
});
