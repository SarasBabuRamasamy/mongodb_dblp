db.publis.find({type:'Book'})
db.publis.find({year:{$gt:2012}})
db.publis.find({authors:'Massimo Zancanaro'})
db.publis.count({authors:'Massimo Zancanaro'})
db.publis.find({authors:'Massimo Zancanaro'}).sort({'booktitle':1})
db.publis.find({authors:'Massimo Zancanaro'}).sort({'pages.start':1})
db.publis.distinct('publisher')
db.publis.createIndex({'title':'text'})

db.publis.find({$text:{$search:'database'}})

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
