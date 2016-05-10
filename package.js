Package.describe({
  name: 'chompomonim:search-in',
  version: '0.1.0',
  summary: '',
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
    'matb33:collection-hooks@0.8.1'
    ]);
  api.mainModule('search-in.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('chompomonim:search-in');
  api.mainModule('search-in-tests.js');
});
