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

