var pieChart = function(dataset, json_loc){
    var w = 800;	//SVG width
    var h = 500;	//SVG height
    var r = 200;	//Outer radius
    var ir = 80;	//Inner radius
    var textOffset = 14;
    var tweenDuration = 750;	//Number of milliseconds for transition to take place
    var ValueFS = "20px";   //Value-label font-size
    var TextFS = "20px";    //Text-label font-size
    var CtrTxtFS = "26px";  //Center text-label font-size
    var CtrCntFS = "26px";  //Center Count text-label font-size
    var socket = io.connect(config.Server);    //Socket.IO connection
    
    //OBJECTS TO BE POPULATED WITH DATA LATER
    var lines, valueLabels, nameLabels;
    var pieData = [];    
    var oldPieData = [];
    var filteredPieData = [];
    
    //D3 helper function to populate pie slice parameters from array data
    var donut = d3.layout.pie().value(function(d){
      return parseInt(d.Value);   //Changed "d.octetTotalCount" to "d.Value"
    })
    .sort(null);
    
    //D3 helper function to create colors from an ordinal scale
    var color = d3.scale.category20();
    
    //D3 helper function to draw arcs, populates parameter "d" in path object
    var arc = d3.svg.arc()
      .startAngle(function(d){ return d.startAngle; })
      .endAngle(function(d){ return d.endAngle; })
      .innerRadius(ir)
      .outerRadius(r);
    
    ///////////////////////////////////////////////////////////
    // GENERATE FAKE DATA /////////////////////////////////////
    ///////////////////////////////////////////////////////////
    
    var arrayRange = 100000; //range of potential values for each item
    var arraySize;
    var streakerDataAdded;
    
    function fillArray() {
      return {
        port: "port",
        octetTotalCount: Math.ceil(Math.random()*(arrayRange))
      };
    }
    
    ///////////////////////////////////////////////////////////
    // CREATE VIS & GROUPS ////////////////////////////////////
    ///////////////////////////////////////////////////////////
    
    var vis = d3.select("#pie-display").append("svg:svg")
      .attr("width", w)
      .attr("height", h);
    
    //GROUP FOR ARCS/PATHS
    var arc_group = vis.append("svg:g")
      .attr("class", "arc")
      .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");
    
    //GROUP FOR LABELS
    var label_group = vis.append("svg:g")
      .attr("class", "label_group")
      .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");
    
    //GROUP FOR CENTER TEXT  
    var center_group = vis.append("svg:g")
      .attr("class", "center_group")
      .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");
    
    //PLACEHOLDER GRAY CIRCLE
    var paths = arc_group.append("svg:circle")
        .attr("fill", "#EFEFEF")
        .attr("r", r);
    
    ///////////////////////////////////////////////////////////
    // CENTER TEXT ////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    
    //WHITE CIRCLE BEHIND LABELS
    var whiteCircle = center_group.append("svg:circle")
      .attr("fill", "white")
      .attr("r", ir);
    
    // "TOTAL" LABEL
    var totalLabel = center_group.append("svg:text")
      .attr("class", "label")
      .attr("dy", -20)	//Original Value: -15
      .attr("text-anchor", "middle") // text-align: right
      .attr("font-size", CtrTxtFS)
      .text("Responses:");
    
    //TOTAL TRAFFIC VALUE
    var totalValue = center_group.append("svg:text")
      .attr("class", "total")
      .attr("dy", 17)	//Original Value: -7
      .attr("text-anchor", "middle") // text-align: right
      .attr("font-size", CtrCntFS)
      .text("Waiting...");
    
    //UNITS LABEL
    var totalUnits = center_group.append("svg:text")
      .attr("class", "units")
      .attr("dy", 21)
      .attr("text-anchor", "middle") // text-align: right
      .attr("font-size", "24px")
      .text("");
        
    //---------------------------------- UPDATE ------------------------------------------------
    refresh();
    
    function refresh() {

        //Assume new data is in SCRdata.json
        d3.json(json_loc, function(json) {
            console.log("JSON is:");
            console.log(json);
            dataset = json;
            update(dataset);
        });


	    // to run each time data is generated
	    function update(Newdataset) {

	      streakerDataAdded = Newdataset;  //Bind the passed-in data "dataset" to the already-created "streakerDataAdded"

	      oldPieData = filteredPieData;
	      pieData = donut(streakerDataAdded);

	      var totalOctets = 0;
	      filteredPieData = pieData.filter(filterData);
	      function filterData(element, index, array) {
	        element.name = streakerDataAdded[index].Content;
	        element.value = parseInt(streakerDataAdded[index].Value);
	        totalOctets += element.value;
	        return (element.value > 0);
	      }

	      if(filteredPieData.length > 0 && oldPieData.length > 0){

	        //REMOVE PLACEHOLDER CIRCLE
	        arc_group.selectAll("circle").remove();

	        totalValue.text(function(){
	          var kb = totalOctets;
	          return kb.toFixed(0);	//Controls number of decimal points to display
	        });

	        //DRAW ARC PATHS
	        paths = arc_group.selectAll("path").data(filteredPieData);
	        paths.enter().append("svg:path")
	          .attr("stroke", "white")
	          .attr("stroke-width", 0.5)
	          .attr("fill", function(d, i) { return color(i); })
	          .transition()
	            .duration(tweenDuration)
	            .attrTween("d", pieTween);
	        paths
	          .transition()
	            .duration(tweenDuration)
	            .attrTween("d", pieTween);
	        paths.exit()
	          .transition()
	            .duration(tweenDuration)
	            .attrTween("d", removePieTween)
	          .remove();

	        //DRAW TICK MARK LINES FOR LABELS
	        lines = label_group.selectAll("line").data(filteredPieData);
	        lines.enter().append("svg:line")
	          .attr("x1", 0)
	          .attr("x2", 0)
	          .attr("y1", -r-3)
	          .attr("y2", -r-8)
	          .attr("stroke", "gray")
	          .attr("transform", function(d) {
	            return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
	          });
	        lines.transition()
	          .duration(tweenDuration)
	          .attr("transform", function(d) {
	            return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
	          });
	        lines.exit().remove();

	        //DRAW LABELS WITH PERCENTAGE VALUES
	        valueLabels = label_group.selectAll("text.value").data(filteredPieData)
	          .attr("dy", function(d){
	            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
	              return 5;
	            } else {
	              return -7;
	            }
	          })
	          .attr("text-anchor", function(d){
	            if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
	              return "beginning";
	            } else {
	              return "end";
	            }
	          })
	          .text(function(d){
	            var percentage = (d.value/totalOctets)*100;
	            return percentage.toFixed(1) + "%";
	          });

	        valueLabels.enter().append("svg:text")
	          .attr("class", "value")
	          .attr("transform", function(d) {
	            return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ")";
	          })
	          .attr("dy", function(d){
	            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
	              return 10;	//Original Value: 5
	            } else {
	              return -10;	//Original Value: -7
	            }
	          })
	          .attr("text-anchor", function(d){
	            if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
	              return "beginning";
	            } else {
	              return "end";
	            }
	          }).text(function(d){
	            var percentage = (d.value/totalOctets)*100;
	            return percentage.toFixed(1) + "%";
	          })
	            .attr("font-size", ValueFS);	//Change percentage-label font-size

	        valueLabels.transition().duration(tweenDuration).attrTween("transform", textTween);

	        valueLabels.exit().remove();


	        //DRAW LABELS WITH ENTITY NAMES
	        nameLabels = label_group.selectAll("text.units").data(filteredPieData)
	          .attr("dy", function(d){
	            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
	              return 17;
	            } else {
	              return 5;
	            }
	          })
	          .attr("text-anchor", function(d){
	            if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
	              return "beginning";
	            } else {
	              return "end";
	            }
	          }).text(function(d){
	            return d.name;
	          });

	        nameLabels.enter().append("svg:text")
	          .attr("class", "units")
	          .attr("transform", function(d) {
	            return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ")";
	          })
	          .attr("dy", function(d){
	            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
	              return 28;	//Original Value: 17
	            } else {
	              return 7;		//Original Value: 5
	            }
	          })
	          .attr("text-anchor", function(d){
	            if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
	              return "beginning";
	            } else {
	              return "end";
	            }
	          }).text(function(d){
	            return d.name;
	          })
	            .attr("font-size", TextFS);		//Change font-size of each slice's text labels

	        nameLabels.transition().duration(tweenDuration).attrTween("transform", textTween);

	        nameLabels.exit().remove();
	      }  
	    }
    }
    
    refresh();

    socket.on('push-response', function(data) {
        var qid = $("#questionID").val();
    
        if(data.questionID == qid) {
            refresh();
        }
    });
    ///////////////////////////////////////////////////////////
    // FUNCTIONS //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    
    // Interpolate the arcs in data space.
    function pieTween(d, i) {
      var s0;
      var e0;
      if(oldPieData[i]){
        s0 = oldPieData[i].startAngle;
        e0 = oldPieData[i].endAngle;
      } else if (!(oldPieData[i]) && oldPieData[i-1]) {
        s0 = oldPieData[i-1].endAngle;
        e0 = oldPieData[i-1].endAngle;
      } else if(!(oldPieData[i-1]) && oldPieData.length > 0){
        s0 = oldPieData[oldPieData.length-1].endAngle;
        e0 = oldPieData[oldPieData.length-1].endAngle;
      } else {
        s0 = 0;
        e0 = 0;
      }
      var i = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
      return function(t) {
        var b = i(t);
        return arc(b);
      };
    }
    
    function removePieTween(d, i) {
      s0 = 2 * Math.PI;
      e0 = 2 * Math.PI;
      var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
      return function(t) {
        var b = i(t);
        return arc(b);
      };
    }
    
    function textTween(d, i) {
      var a;
      if(oldPieData[i]){
        a = (oldPieData[i].startAngle + oldPieData[i].endAngle - Math.PI)/2;
      } else if (!(oldPieData[i]) && oldPieData[i-1]) {
        a = (oldPieData[i-1].startAngle + oldPieData[i-1].endAngle - Math.PI)/2;
      } else if(!(oldPieData[i-1]) && oldPieData.length > 0) {
        a = (oldPieData[oldPieData.length-1].startAngle + oldPieData[oldPieData.length-1].endAngle - Math.PI)/2;
      } else {
        a = 0;
      }
      var b = (d.startAngle + d.endAngle - Math.PI)/2;
    
      var fn = d3.interpolateNumber(a, b);
      return function(t) {
        var val = fn(t);
        return "translate(" + Math.cos(val) * (r+textOffset) + "," + Math.sin(val) * (r+textOffset) + ")";
      };
    }
};
