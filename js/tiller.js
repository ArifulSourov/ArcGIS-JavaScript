function getRandomColor(chartCount) {
	var datalength= chartCount.length;
	var colorarray = []
	var letters = '0123456789ABCDEF'.split('');
    
    
	for (var j = 0; j < datalength; j++){
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		colorarray.push(color);
	}
	return colorarray;
}

function getPercentage(dataArray){
	var sum =dataArray.reduce(function(a, b) { return a + b; }, 0);
	var percentArray = [];
	var arrayLength = dataArray.length;
	for(var i=0; i<arrayLength; i++){
		var percentValue = Math.round((dataArray[i] / sum) *100);
		percentArray.push(percentValue);		
	}
	return percentArray;
}

function numberWithCommas(value) {
    value = value || 0;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//checkbox
// (function () {
//   'use strict'

//   if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
//     var msViewportStyle = document.createElement('style')
//     msViewportStyle.appendChild(
//       document.createTextNode(
//         '@-ms-viewport{width:auto!important}'
//       )
//     )
//     document.head.appendChild(msViewportStyle)
//   }

// }())
