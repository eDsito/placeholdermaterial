var app = angular.module("app",["ngRoute","ngResource","ngMaterial"]);
app.config(function ($routeProvider) {
	$routeProvider
		.when("/",{
			templateUrl:"templates/home.html",
			controller:"homeCtrl"
	})
	.otherwise({redirectTo:"/"});
});


app.controller('homeCtrl',function($scope,$http,dataResource){
	$scope.titulo="Consumiendo datos del API placeholder";
	$scope.datosFormulario = {};
	
	/*
	$http.get("http://jsonplaceholder.typicode.com/posts").success(function(data){
		$scope.datos=data;
		//console.log(data);
	});	
	*/
	$scope.isLoading=true;
	$scope.datos=dataResource.get(function(data){
		$scope.isLoading=false;
	}, function(err){
		alert('request failed');
	});
	

    $scope.editar = function(data,index){
    	
    	angular.extend($scope.datosFormulario , data);
    	$scope.datosFormulario.index = index;
    }

    $scope.eliminar=function(data,index){
    	//console.log(index)
    	dataResource.delete({id:data.id},
    		function(resp){
    			$scope.datos.splice(index,1);
    		})

    }
    $scope.guardar=function(datosFormulario){
    	//console.log(datosFormulario);
    	dataResource.update({id:datosFormulario.id},datosFormulario,
    		function(response){
    				$scope.datos[datosFormulario.index] = response;
    				$scope.datosFormulario = {};
    				
    		},
    		function(error){
    			console.log(error);
    		});
		
    }

});

app.factory("dataResource", function($resource){
	return $resource("http://jsonplaceholder.typicode.com/posts/:id",{},

		{
			"get":{
				method:"GET",
				isArray:true
			},
			"update":{
				method:"PUT"
			},
			"delete":{
				method:"DELETE"
			}
		}
	);
});
