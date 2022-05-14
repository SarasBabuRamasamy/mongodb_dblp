db.publis.createIndex({'title':'text'})
db.publis.find({$text:{$search:'database'}})