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


//#mapreduce to find the number of publications by an author

db.runCommand({
mapReduce: 'publis',
map: function(){
    for (let index = 0; index < this.authors.length;++index) 
    {
        let author=this.authors[ index ];
        emit(author,1);
    }
},
reduce: function(author, counters){
    count = 0;
    for (let index=0; index <counters.length; ++index)
    {
        count +=counters[index];
    }
    return count;
},
out: {inline: 1}
}
)

//mapreduce to find all the fields in the database

mr=db.runCommand({
    'mapreduce':'publis',
    'map':function(){
        for(var key in this){emit(key, null);}
    },
    'reduce' : function(key, s){return null;},
    'out':'publis' +'_keys'
})
db[mr.result].distinct('_id')
