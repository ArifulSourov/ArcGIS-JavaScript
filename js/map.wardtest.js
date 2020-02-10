require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/MapImageLayer",
  "esri/layers/FeatureLayer",
  "esri/widgets/LayerList",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/widgets/ScaleBar",
  "esri/tasks/support/Query",
  "esri/tasks/support/StatisticDefinition",
  "esri/widgets/Popup",
  "esri/PopupTemplate",
  "esri/widgets/Home",
  "esri/widgets/Search",
  "esri/Graphic",
  "dojo/domReady!"], 
  function(	Map,
			MapView,
			MapImageLayer,
			FeatureLayer,
			LayerList,
			Legend,
			Expand,
			ScaleBar,
			Query,
			StatisticDefinition,
			Popup,
			PopupTemplate,
			Home,
			Search,Graphic){

  	var mapImageLayer = new MapImageLayer({
  		id: 0,
  		url: "http://103.58.93.172/tillerwebadaptor/rest/services/DPHE/Bangladesh/MapServer",
  		sublayers: [
      {
  			title: "Division",
  			id: 0,
  			source: {
  				type: "map-layer",
  				mapLayerId: 0

  			}
  		}
      ]

  		});
    

  	var map= new Map({
  		basemap: "streets",
  		layers: [mapImageLayer]
  	});

  	var view = new MapView({
  		container: "viewDiv",
  		map: map,
  		zoom: 8,
  		center: [90,23] // longitude, latitude
  	});

    view.when(function(){                                                                              

      var layer_List = new Expand({
        content: new LayerList({
          view: view
        }),
        view: view,
        expanded: false
      });

      var legend = new Expand({
        content: new Expand({
          view: view
        }),
        view: view,
        expanded: false
      });

      var scaleBar = new ScaleBar({
        view: view,
        unit: "metric",
        style: "line"
      });

      view.ui.add(layer_List, "top-right");
      view.ui.add(legend, "bottom-left");
      view.ui.add(scaleBar, "bottom-right");

   

    // division query start

    var division_sublayer = mapImageLayer.findSublayerById(0);
      var divisionquery = division_sublayer.createQuery();
       divisionquery.where = "Division is not null";
       divisionquery.outFields = ["Division"];
       divisionquery.displayFieldName = ["Division"];
       divisionquery.returnDistinctValues = true;
       divisionquery.returnGeometry = false;

       division_sublayer.queryFeatures(divisionquery).then(function(response){
        response.features.forEach(function(arrayItem){
          var division = arrayItem.attributes.division;
          var el = document.createElement("option");
          el.textContent = division;
          el.value = division;
          dropdivision.appendChild(el);
           // console.log(el);

        });

       });

       var value_query = null;
       var dist_Value = null;

       var dropdivision = document.getElementById("divisiondropdown");
        dropdivision.onchange = function(){
          value_query = select_value(dropdivision);
          division_sublayer.definitionExpression = value_query;
            console.log(value_query);
          //view.goTo(division_sublayer.queryExtent(), {duration: 3000});

          //District Query 
          

                document.getElementById("districtdropdown").options.length = 0;
                var dropdistrict = document.getElementById("districtdropdown");
                dropdistrict.onchange = function(){
                dist_Value = select_distvalue(dropdistrict);
                division_sublayer.definitionExpression = dist_Value;

                console.log(dist_Value);

                //(District sub layer)City Corporation() 
                {
                var mapImageLayerWard = new MapImageLayer({
                  id: 1,
                  url: "http://103.58.93.172/tillerwebadaptor/rest/services/DPHE/Cumilla/MapServer/0",
                  title: "Comilla",
                  supportsSublayerVisibility: true,
                  supportsSublayerDefinitionExpression: true,
                  supportsSublayersChanges: true,
                  sublayers: [
                 {  title: "Ciy Corporation",
                    id: 4,
                    source: {
                      type: "map-layer",
                      mapLayerId: 4
                    }
                  }]

                  }); map.add(mapImageLayerWard);
              }

               var district_sublayer = mapImageLayerWard.findSublayerById(4);
               console.log(district_sublayer); 

               var wardquery = district_sublayer.createQuery();
                   wardquery.where = "Ward is not null";
                   wardquery.outFields = ["W"];
                   wardquery.displayFieldName = ["W"];
                   wardquery.returnDistinctValues = true;
                   wardquery.returnGeometry = false;
                              
                district_sublayer.queryFeatures(wardquery).then(function(response){
                    response.features.forEach(function(arrayItem){
                        var ward = arrayItem.attributes.W;  
                        var el = document.createElement("option");
                        el.textContent = ward;
                        el.value = ward;
                       dropward.appendChild(el);  
                       // console.log(ward); 
       
                    });
                          
              });
                      var dropward = document.getElementById("warddropdown");
                        dropward.onchange = function(){
                        var ward = select_wardvalue(dropward);
                        district_sublayer.definitionExpression = ward;
                        console.log(ward);
                      }
            }//district on change

              //District Query
                var districtquery = division_sublayer.createQuery();
                        districtquery.where = value_query;
                        districtquery.outFields = ["district"];
                        districtquery.displayFieldName = ["district"];
                        districtquery.returnDistinctValues = true;
                        districtquery.returnGeometry = false;
                              
                division_sublayer.queryFeatures(districtquery).then(function(response){
                    response.features.forEach(function(arrayItem){
                        var district = arrayItem.attributes.district;  
                        var el = document.createElement("option");
                        el.textContent = district;
                        el.value = district;
                        dropdistrict.appendChild(el);   
       
                    });
                          
              });

      //division on change                                                              
      }
        
  //view function end
  });

// end here
});

  //All functions

  function select_value(dropDown){
    var selectedValue = dropDown.options[dropDown.selectedIndex].value;
    var wheretext = null;
    if(selectedValue!="ALL"){
      wheretext = "Division = '"+selectedValue+"'";
    }
    else{
      wheretext = "Division is not null";
    }
   // console.log(wheretext);
    return wheretext;
  } 
  function select_wardvalue(dropDown){
    var selectedValue = dropDown.options[dropDown.selectedIndex].value;
    var wheretext = null;
    if(selectedValue!="ALL"){
      wheretext = "Division = '"+selectedValue+"'";
    }
    else{
      wheretext = "Division is not null";
    }
   // console.log(wheretext);
    return wheretext;
  }

  function select_distvalue(dropDown){
    var selecteddistValue = dropDown.options[dropDown.selectedIndex].value;
    var distValue = null;
    if(selecteddistValue!="ALL"){
      distValue = "District = '"+selecteddistValue+"'";
    }
    else{
      distValue = "District is not null";
    }
   // console.log(wheretext);
    return distValue;
  }