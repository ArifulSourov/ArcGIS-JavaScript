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
        content: new Legend({
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
      var homeWidget = new Home({
        view: view
      });

      view.ui.add(layer_List, "top-right");
      view.ui.add(legend, "bottom-left");
      view.ui.add(scaleBar, "bottom-right");
      view.ui.add(homeWidget, "top-left");

   

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
            //console.log(value_query);
          //view.goTo(division_sublayer.queryExtent(), {duration: 3000});

          //District Query 
          
                //district dropdown is null on everychange
                document.getElementById("districtdropdown").options.length = 0;
                var dropdistrict = document.getElementById("districtdropdown");
                dropdistrict.onchange = function(){
                dist_Value = select_distvalue(dropdistrict);
                division_sublayer.definitionExpression = dist_Value;

                //console.log(dist_Value);

                //(District sub layer)City Corporation 
                 {

                  
                                    var mapImageLayerDistrict = new MapImageLayer({
                                      id: 0,
                                      url: "http://103.58.93.172/tillerwebadaptor/rest/services/DPHE/Cumilla/MapServer",
                                      title: "Cumilla",
                                      //supportsSublayerVisibility: true,
                                      //supportsSublayerDefinitionExpression: true,
                                      //supportsSublayersChanges: true,
                                      sublayers: [
                                            {
                                                title: "City Corporation",
                                                id: 4,
                                                source: {
                                                    type: "map-layer",
                                                    mapLayerId: 4
                                            }
                                        },
                                            {
                                              title : "Household Data",
                                              id: 2,
                                                source: {
                                                    type: "map-layer",
                                                    mapLayerId: 2
                                            }
                                        }/*,
                                            {
                                              title : "Road",
                                              id: 3,
                                                source: {
                                                    type: "map-layer",
                                                    mapLayerId: 3
                                            }
                                        },
                                            {
                                              title : "STS",
                                              id: 1,
                                                source: {
                                                    type: "map-layer",
                                                    mapLayerId: 1
                                            }
                                        }*/
                                      ]                        
                            
                                  });
                                  map.add(mapImageLayerDistrict);                                                                              
                                }
                                
                                /*var dynamic_sublayer = mapImageLayerDistrict.findSublayerById(4);
                                // var housedata_sublayer = mapImageLayerDistrict.findSublayerById(2);

                                    var dynamicquery = dynamic_sublayer.createQuery();
                                      dynamicquery.where = "W is not null";
                                      dynamicquery.outFields = ["W"];
                                      dynamicquery.displayFieldName = ["W"];
                                      dynamicquery.returnDistinctValues = true;
                                      dynamicquery.returnGeometry = false;

                                      dynamic_sublayer.queryFeatures(dynamicquery).then(function(response){
                                        response.features.forEach(function(arrayItem){
                                            var wardNumber = arrayItem.attributes.W;        
                                            var el = document.createElement("option");
                                            el.textContent = wardNumber;
                                            el.value = wardNumber;
                                            drophead.appendChild(el); 
                                            //console.log(wardNumber)                                           
                                      
                                        });                                     
                            
                                });
                                //ward dropdown is null on everychange
                                document.getElementById("headdropdown").options.length = null; 

                                  var drophead = document.getElementById("headdropdown");
                                    drophead.onchange = function(){
                                      var wardNumber = select_value(drophead);
                                      dynamic_sublayer.definitionExpression = wardNumber;
                                      //view.goTo(dynamic_sublayer.queryExtent());

                                      //console.log(wardNumber);

                                      //division_sublayer.definitionExpression = value_query;
                                    }*/

                      //household data 

                      //var hvardata=1;


                        var housedata_sublayer = mapImageLayerDistrict.findSublayerById(2);
                        //var city_sublayer = mapImageLayerDistrict.findSublayerById(0);
                        //console.log(city_sublayer)
                          var hdataquery = housedata_sublayer.createQuery();
                           hdataquery.where = "Q_6_3_Distance_of_parking_place is not null";
                           hdataquery.outFields = ["Q_6_3_Distance_of_parking_place"];
                           hdataquery.displayFieldName = ["Q 6 3 Distance_of_parking_place"];
                           hdataquery.returnDistinctValues = true;
                           hdataquery.returnGeometry = false;


                           
                           housedata_sublayer.queryFeatures(hdataquery).then(function(response){
                            response.features.forEach(function(arrayItem){
                              var hdata = arrayItem.attributes.Q_6_3_Distance_of_parking_place;
                              var el = document.createElement("option");
                              el.textContent = hdata;
                              el.value = hdata;
                              drophdata.appendChild(el);



                     });

                   });

                              document.getElementById("householddropdown").options.length = null; 

                                  var drophdata = document.getElementById("householddropdown");
                                    drophdata.onchange = function(){
                                      var housedata = select_features(drophdata);
                                
                                      housedata_sublayer.definitionExpression = housedata;
                                      //view.goTo(dynamic_sublayer.queryExtent());

                                      console.log(housedata);

                                      //division_sublayer.definitionExpression = value_query;
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
   console.log(distValue);
    return distValue;
    //console.log(distValue);
  } 



  function select_features(selected){
    var selectFeature = selected.options[selected.selectedIndex].value;
    var feature = null;
    if(selectFeature!="ALL"){
      feature = "Q_6_3_Distance_of_parking_place = '"+selectFeature+"'";
    }
    else{
      feature = "Q_6_3_Distance_of_parking_place is not null";
    }
    console.log(feature);
    return feature;
    //console.log(feature);

  }
  // checkbox value
// function select_row(input){
//   // Create a table element 
//       var table = document.createElement("table"); 
      
//       // Create table row tr element of a table 
//       var tr = table.insertRow(-1); 

//       // Adding the data to the table 
//       for (var i = 0; i < tr.length; i++) { 
        
//         // Create a new row 
//         trow = table.insertRow(-1); 
//       } 
      
//       // Add the newely created table containing json data 
//       var el = document.getElementById("cat_id"); 
//       el.innerHTML = ""; 
//       el.appendChild(cat_id); 
//   }  

// var list= new Array();
//  list[0] = "Q_3_1__drinking_water_source";
//  list[1] = "Q_1_Settlement_Type";
//  list[2] = "Q_1_3_Holding_Number";
// //var el_up = document.getElementById("hd_table");

// function check_value(checkbox){
// var select_value = checkbox.td[checkbox.select_value].value;
// for (i=0;i<list.length;i++)
// {   
 

//   }
// document.write(list.toString());
// }


function updateQuery(){
  var query = [];
  if(document.getElementById("5_1").checked = true){
    query.push(document.getElementById("5_1").value);
  }
  else if(document.getElementById("5_2").checked = true){
    query.push(document.getElementById("5_2").value);
  }
  else if(document.getElementById("5_3").checked = true){
    query.push(document.getElementById("5_3").value);
  }
  else if(document.getElementById("5_4").checked = true){
    query.push(document.getElementById("5_4").value);
  }
  else if(document.getElementById("5_5").checked = true){
    query.push(document.getElementById("5_5").value);
  }
  else{
    return "nothing";
  }


  return query;
}