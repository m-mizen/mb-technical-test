/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3283744169")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number1361375778",
    "max": null,
    "min": 0,
    "name": "sort",
    "onlyInt": true,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3283744169")

  // remove field
  collection.fields.removeById("number1361375778")

  return app.save(collection)
})
