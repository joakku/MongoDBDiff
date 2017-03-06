app.directive("setup",['$http','$rootScope',function($http,$rootScope){
  return {
    restrict:'E',
    templateUrl:"templates/setup.html",
    controller:function(){
      this.conn={};
      this.conn.user="foo";
      this.conn.pass="fighters";
      this.conn.host="127.0.0.1";
      this.conn.port="27017";
      this.result="";
      var that=this;
      this.send=function(){
        $http.post("/api/v1/setConnection",this.conn).then(function(data){
          that.result=data.data.message;
          $rootScope.$broadcast("setupFinished",data.data);
        })
      }
    },
    controllerAs:"settings"
  }
}])

app.directive("dbdiff",['$http','$rootScope',function($http,$rootScope){
  return {
    restrict:'E',
    templateUrl:"templates/dbdiff.html",
    controller:["$scope",function($scope){
      var that=this;
      this.data={};
      this.data.origin=[];
      this.data.destination=[];
      this.diff="";
      this.dataSource=[];
      this.collections=[];
      this.showDbDiff = false;

      this.getCollections=function(){
        $http.get("/api/v1/getCommonCollections/"+this.data.origin+"/"+this.data.destination)
        .then(function(data){
          that.collections=data.data;
        })
      }

      $scope.$on("setupFinished",function(scope,data){
        that.showDbDiff = data.success;
        data.success ? that.getDBNames() : null;
      })
      this.getDBNames=function(){
        $http.get("/api/v1/getDBNames").then(function(data){
          that.dataSource=data.data;
        })
      }
    }],
    controllerAs:"dbdiffCtrl"
  }
}])
