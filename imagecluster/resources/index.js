fetch("100.json")
    .then(function (response) {
    return response.json();
})
    .then(function (data) {
    // Dendrogram location
    var left = document.querySelector("#left");
    // Initial data structures
    var tree = d3.cluster().size([left.offsetWidth, left.offsetHeight]);
    var root = d3.hierarchy(data);
    tree(root);
    // Create canvas
    var G = d3.select("#left")
        .append("svg")
        .append("g")
        .style("margin", "10px");
    G.append("g").classed("links", true);
    G.append("g").classed("nodes", true);
    // Add nodes
    d3.select("svg g.nodes")
        .selectAll("circle.node")
        .data(root.descendants())
        .enter()
        .append("circle")
        .classed('node', true)
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('r', 2);
    // Add links
    d3.select('svg g.links')
        .selectAll('line.link')
        .data(root.links())
        .enter()
        .append('line')
        .classed('link', true)
        .attr('x1', function (d) { return d.source.x; })
        .attr('y1', function (d) { return d.source.y; })
        .attr('x2', function (d) { return d.target.x; })
        .attr('y2', function (d) { return d.target.y; });
    // Calculate min and max distance for controls
    d3.select("#flatSlider")
        .attr("min", d3.min(root.descendants(), function (d) { return d.data.distance; }))
        .attr("max", d3.max(root.descendants(), function (d) { return d.data.distance; }));
});
