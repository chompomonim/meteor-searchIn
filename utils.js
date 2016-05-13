import { CollectionExtensions } from 'meteor/lai:collection-extensions'

let registered_collections = {}
CollectionExtensions.addExtension(function (name, options) {
  registered_collections[name] = {
    name: name,
    instance: this,
    options: options
  };
});

export function getCollectionByName(collecion_name) {
    return registered_collections[collecion_name].instance
}

export function range(length=0) {
    return Array.from(new Array(length), (x,i) => i)
}
