var verticalBars = function(dataset, json_loc) {
    //SVG dimensions
    var w = 900;           //SVG object width in pixels
    var h = 500;            //SVG object height in pixels
    var vertPadding = 25;   //Vertical padding (for the bottom of the SVG object)
    var socket = io.connect(config.Server);    //Socket.IO connection
    
    //SVG element creation
    var svg = d3.select("#bar-display")
        .append("svg:svg")
        .attr("width", w)
        .attr("height", h);
        
    //D3 Scales
    //Access the "value" element and scale it to the height of the SVG object
    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d){
                return d.Value;
            })
        ])
        .range([0, h - vertPadding]);
        
    var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))       //returns 'domain' an array '0' to 'n' equal to the length of dataset
        .rangeRoundBands([0, w], 0.03);         //last parameter is the space between data elements ('bars' in this case)
    
    //Easy colors accessible via a 10-step ordinal scale
    var color = d3.scale.category10();
    
    //---------------------------------- ADD NEW ELEMENTS ----------------------------------
    //Add attributes to the SVG rectangles
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i){
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - vertPadding - yScale(d.Value);
        })
        .attr("width", xScale.rangeBand())
        .attr("height", function(d) {
            return yScale(d.Value) - (vertPadding);
        })
        .attr("fill", function(d, i) {
            //Make the bar bluer as it increases in height
            //return "rgb(0, 0, " + (d.value * 10) + ")";
            return color(i);
        });
        
    //Add labels
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function (d) {
            return d.Content + ": " + d.Value;
        })
        .attr("x", function(d, i) {
            return xScale(i) + xScale.rangeBand() / 2;
        })
        .attr("y", function(d) {
            return h - (vertPadding * 0.5);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .attr("text-anchor", "middle");

    // -------------------------------------------- UPDATE ------------------------------------------------
    //Upon clicking "p", UPDATE with new data from SCRdata.json
    function refresh() {
        //Assume new data is in SCRdata.json
        d3.json(json_loc, function(json) {
            dataset = json;
            drawUpdate(dataset);
        });
    };
    
    var drawUpdate = function(dataset) {

            //Update the yScale domain (since new elements could be larger/smaller)
            yScale.domain([0, d3.max(dataset, function(d){
                return d.Value;
                })
            ]);
            //Update the xScale domain (since the dataset could contain more elements than previously)
            var xScale = d3.scale.ordinal()
                .domain(d3.range(dataset.length))   //returns 'domain' an array '0' to 'n' equal to the length of dataset
                .rangeRoundBands([0, w], 0.03);     //last parameter is the space between data elements ('bars' in this case)
            
            console.log(dataset);
            
            //Select all of the 'rect's (some already exist, some are new)
            var barRects = svg.selectAll("rect")
                .data(dataset);
                
            // Handle entering NEW dataset elements
            barRects.enter()
                .append("rect")
                .attr("x", w)
                .attr("y", function(d) {
                    return h - vertPadding - yScale(d.Value);
                })
                .attr("width", xScale.rangeBand())
                .attr("height", function(d){
                    return yScale(d.Value) - (vertPadding);
                })
                .attr("fill", function(d, i){
                    return color(i);
                });
            // Update and transition the rect's
            barRects.transition()
                .duration(1000)
                .attr("x", function(d, i){
                    return xScale(i);
                })
                .attr("y", function(d){
                    return h - vertPadding - yScale(d.Value);
                })
                .attr("width", xScale.rangeBand())
                .attr("height", function(d) {
                    return yScale(d.Value) - vertPadding;
                })
                .attr("fill", function(d, i) {
                    return color(i);
            });
                
            //Select all of the existing 'text's & update them
            var barTxt = svg.selectAll("text")
                .data(dataset);
                
            // Add text labels for new dataset elements
            barTxt.enter()
                .append("text")
                .text(function (d) {
                    return d.Content + ":" + d.Value;
                })
                .attr("x", w + xScale.rangeBand() / 2)
                .attr("y", function(d) {
                    return h - (vertPadding * 0.5);
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "16px")
                .attr("fill", "black")
                .attr("text-anchor", "middle");
            // Update text labels of existing dataset elements
            barTxt.transition().delay(750).duration(1000)
                .text(function(d) {
                    return d.Content + ": " + d.Value;
                })
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.rangeBand() / 2;
                })
                .attr("y", function (d) {
                    return h - (vertPadding * 0.5);
                });
        };

    //Listen for socket.io event and trigger the D3 update function
    socket.on('push-response', function(data) {
        
        var qid = $("#questionID").val();

        if(data.questionID == qid) {
            refresh();
        }
    });
};
