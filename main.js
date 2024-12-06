d3.csv('colleges.csv').then(function(data) {
    data.forEach(d => {
        d.debt = +d["Median Debt"];
        d.earnings = +d["Mean Earnings 8 years After Entry"];
    })

    function scaleDebt(debt) {
        return debtScale(debt);
    }

    function scaleEarnings(earnings) {
        return earningScale(earnings);
    }

    var debtScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.debt))
        .range([0,700]);

    var earningScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.earnings))
        .range([600, 0]);

    var xAxis = d3.axisBottom(debtScale);
    var yAxis = d3.axisLeft(earningScale);

    var svg = d3.select('svg');

    svg.append("g")
        .attr("class", "x axis")
        .attr('transform', 'translate(100, 620)')
        .call(xAxis)

    svg.append("text")
        .attr("class", "x label")
        .attr("x", 450)
        .attr("y", 670)
        .style("font-size", "20px")
        .text("Median Debt");

    svg.append("g")
        .attr("class", "y axis")
        .attr('transform', 'translate(100, 20)')
        .call(yAxis)

    svg.append("text")
        .attr("class", "y label")
        .attr("x", 140)
        .attr("y", 225)
        .attr("transform", "rotate(90, 40, 200)")
        .style("font-size", "20px")
        .text("Mean Earnings 8 Years after Entry");

    svg.append("text")
        .attr("transform", 'translate(290, 30)')
        .text("You'll Earn More than What You Went in Debt for")
        .style("font-size", "20px");

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => scaleDebt(d.debt))
        .attr("cy", d => scaleEarnings(d.earnings))
        .attr("r", 5)
        .style("fill", "purple")
        .style("opacity", 0.7)

});