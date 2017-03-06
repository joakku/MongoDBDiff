var mongo = require('mongodb').MongoClient;
var _ = require('lodash');
var _async=require('async');

module.exports = {
  "setConnection":function(params,callback){
    var url="mongodb://";
    (params.user && params.pass) ? (url += (params.user+":"+params.pass+"@")) : null;
    url+=(params.host || "localhost");
    params.port ? (url += (":"+params.port)) : null;
    mongo.connect(url,function(err,db){
      module.exports.dbParams=params;
      module.exports.client=db;
      callback(err);
    })
  },
  "getDBNames":function(res){
    if(this.client){
      this.client.admin().listDatabases(function(err,dbs){
        if(err) throw err;
        res.send(_.map(dbs.databases,(n)=>{return n.name}));
      })
    }else{
        res.send({"message":"First set the db"});
    }
  },
  "getCommonCollections":function(params,callback){
    if(this.client){
      var that=this;
      var collections = {};
      var colNames=_.map(params,(n)=>{return n});
      _async.each(
        colNames,
        (name,cbk)=>{
          that.client.db(name).listCollections({}).toArray((err,col)=>{
            if(err) throw err;
            collections[name]=_.map(col,(n)=>{return n.name});
            cbk();
          })
        },
        (err)=>{
          callback(err, _.intersection(collections[colNames[0]],collections[colNames[1]]));
        }
      )
    }else{
        callback({"message":"First set the db"});
    }
  }
};
