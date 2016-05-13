import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import unidecode from 'unidecode'
import { range, getCollectionByName } from './utils'

function buildIndex (doc, projection) {
    let fields = projection.call(doc),
        search = [],
        pos = 0,
        positions = {},
        inverse = {},
        inv = 0

    for (let key in fields) {
        let value = (fields[key]) ? fields[key] : ''
        let transliterated = unidecode(value)
        search.push(transliterated)
        positions[key] = pos
        for (let i in range(value.length)) {
            let part = value.substr(0,i)
            let part_t = unidecode(part)
            inverse[part_t.length+inv] = i + pos
        }
        pos += value.length
        inv += transliterated.length + 1
        inverse[inv-1] = pos
    }

    search = search.join(' ').toLowerCase()
    return {
      search_strings: search,
      positions: positions,
      inverse: inverse
    }
}

export function searchIn (collection, txt, filter) {
    if (!(collection instanceof Mongo.Collection))
        throw new Error(`Passed param is not a Mongo Collection.`)

    if (searchIn.collections[collection._name] !== true)
        throw new Error("This collection is not registered in buildIndex")

    let normalized = unidecode(txt).toLowerCase()

    let query = normalized.split(' ').map((x) => {
        return { search_strings: new RegExp(x.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")) }
    })
    if (typeof filter !== "undefined" && filter !== null)
        query.push(filter)

    return collection.find({$and: query}, {limit : 10}).fetch()
}

searchIn.collections = {}
searchIn.register = (collection, index_by) => {
    if (!(collection instanceof Mongo.Collection))
        throw new Error(`Passed param is not a Mongo Collection.`)

    collection.before.insert((userId, doc) => {
        Object.assign(doc, buildIndex(doc, index_by))
    })

    collection.before.update((userId, doc, field_names, modifier) => {
        if (modifier.$set == null) modifier.$set = {}
        transformed = Object.assign(doc, modifier.$set)
        Object.assign(modifier.$set, buildIndex(transformed, index_by))
    })

    // Add collection into list be able check that it was registered.
    searchIn.collections[collection._name] = true
}

export getCollectionByName
export default searchIn
