var pieChart = function(dataset, json_loc){
    //Width and height
    var w = 350;
    var h = 350;
    var dur = 750;
    
    //Dataset Total
    var total;
    
    //Arc Dimensions
	var outerRadius = w / 2;
	var innerRadius = 50;
	var arc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius);

	var donut = d3.layout.pie()
                        //Get just the "Values" from the JSON
                        .value(function(d){
                            total = (total + d.Value);  //Calculate the total number of responses
                            return d.Value;
                        })
                        .sort(null);    //Preserve original order.  Default sort is descending.

	//Easy colors accessible via a 10-step ordinal scale
	var color = d3.scale.category10();

    //Create SVG element
    var svg = d3.select("#pie-display")
                .append("svg:svg")
                .attr("width", w)
                .attr("height", h);
                //.append("g")
    
    var arc_grp = svg.append("svg:g")
                    .attr("class", "arcGrp")
                    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

    var label_group = svg.append("svg:g")
                        .attr("class", "lblGroup")
                        .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

    // Group for Center Text
    var center_group = svg.append("svg:g")
                        .attr("class", "ctrGroup")
                        .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

    // Center Label
    var pieLabel = center_group.append("svg:text")
                                .attr("dy", ".35em")
                                .attr("class", "chartLabel")
                                .attr("text-anchor", "middle")
                                .text(total);

    // Draw Arc Paths
    var arcs = arc_grp.selectAll("path")
                    .data(donut(dataset));
    arcs.enter().append("svg:path")
                .attr("stroke", "white")
                .attr("stroke-width", 1.5)
                .attr("fill", function(d,i) {
                    return color(i);
                })
                .attr("d", arc)
                .each(function(d) {
                    this._current = d;
                });

    // Draw Slice Labels
    var sliceLabel = label_group.selectAll("text")
                                .data(donut(dataset));
    sliceLabel.enter().append("svg:text")
                    .attr("class", "arcLabel")
                    .attr("transform", function(d) {
                        return "translate(" + arc.centroid(d) + ")";
                    })
                    .attr("text-anchor", "middle")
                    .text(function(d, i){
                        return dataset[i].Content;
                    });
        
    //---------------------------------- UPDATE ------------------------------------------------
    function refresh() {
        //Get JSON file (and hopefully new data)
        d3.json(json_loc, function(json) {
            dataset = json;
            total = 0;
            
            //Only update the data once, then pass the result to redraw the arcs, and redraw the labels
            var newData = donut(dataset);    //Update the data
            
            //New Arcs:
            arcs.data(newData);
            arcs.transition().duration(dur).attrTween("d", arcTween);       //Redraw the arcs
            
            //New Labels:
            sliceLabel.data(newData);
            sliceLabel.transition().duration(dur)
                    .attr("transform", function(d) {
                        return "translate(" + arc.centroid(d) + ")";
                    })
                    .style("fill-opacity", function(d) {
                        return d.value===0 ? 1e-6 : 1;
                    });
            pieLabel.text(total);
        });
        setTimeout(refresh, 1000);
    }
    
    refresh();
    
    // Store the displayed angles in _current.
    // Then, interpolate from _current to the new angles.
    // During the transition, _current is updated in-place by d3.interpolate.
    function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
    }
};
