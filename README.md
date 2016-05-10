# Meteor searchIn

It's package for Meteor which allows server side search functionality.

## Features

 - Indexing of selected fields for faster search.
 - Transliteration. You can search for `Rīga` by typing `riga` or `Рига`.
 - Possibility to use together with `chompomonim:autoform-picker`.

## Usage

First you have register your collection.

```JavaScript
import searchIn from 'meteor/chompomonim:search-in'
import myCollection from './collections/myCollection'

if (Meteor.isServer) {
  searchIn.register(myCollection, function () {
    return {
      name: `${this.first_name} ${this.last_name}`,
      email: ((this.emails != null) ? this.emails : []).join(' ')    }
  })
}
```

And then you can use it in any place you have to search.

```JavaScript
  Meteor.call('searchIn', _collection, txt, filter.get(), (error, result) => {
    if (error) {
      alert(error.reason)
    }
    else {
      // Do wathewer you need.
      for (let res of result) {
        console.log('Result obj: ', res)
      }
    }
  })
```
