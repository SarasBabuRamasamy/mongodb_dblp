//1. List of all books.  
db.publis.find({type:'Book'})

//2. List of publications since 2012.  
db.publis.find({year:{$gt:2012}})

//3. List of publications by the author “Massimo Zancanaro”. 
db.publis.find({authors:'Massimo Zancanaro'})

//4. Count the number of “Massimo Zancanaro publications. 
db.publis.count({authors:'Massimo Zancanaro'})

//5. Sort “Massimo Zancanaro” publications by book title and start page.  
db.publis.find({authors:'Massimo Zancanaro'}).sort({'booktitle':1})
db.publis.find({authors:'Massimo Zancanaro'}).sort({'pages.start':1})

//6. List of all distinct publishers.  
db.publis.distinct('publisher')

//7. List of all publications which title contains the word “database”.
db.publis.createIndex({'title':'text'})
//all the values of the field 'title' is text indexed
db.publis.find({$text:{$search:'database'}})
//after indexing, the field title is text searched for the word 'database'
