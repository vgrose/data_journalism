// @TODO: YOUR CODE HERE!
// You need to create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.

// Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. You'll code this graphic in the app.js file of your homework directory—make sure you pull in the data from data.csv by using the d3.csv function. Your scatter plot should ultimately appear like the image at the top of this section.


// Include state abbreviations in the circles.
// Create and situate your axes and labels to the left and bottom of the chart.

// Define SVG area dimensions
var svgWidth = 800;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var divSelection = d3.select(".scatter");

var svg = divSelection.append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var scatterGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from csv
d3.csv("assets/data/data.csv", function(error, journalismData) {

  // Throw an error if one occurs
  if (error) throw error;

  // Print the journalismData
  console.log(journalismData);

    // Configure a linear scale with a range between the chartHeight and 0
    // Set the domain for the xLinearScale function
    var yLinearScale = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([d3.min(journalismData, data => data.obesity), d3.max(journalismData, data => data.obesity)]);

    var xLinearScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([d3.min(journalismData, data => data.income), d3.max(journalismData, data => data.income)]);

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    scatterGroup.selectAll("dot")
        .data(journalismData)  // using the values in the ydata array
        .enter()
        .append("svg:circle")  // create a new circle for each value
        .attr("cx", data => xLinearScale(data.income)) // translate y value to a pixel
        .attr("cy", data => yLinearScale(data.obesity)) // translate x value
        .attr("r", 12) // radius of circle
        .attr("fill", "purple")
        .style("opacity", 0.6); // opacity of circle

    var text = scatterGroup.selectAll("text")
        .data(journalismData)
        .enter()
        .append("text");
    
    var textLabels = text
        .attr("x", data => xLinearScale(data.income))
        .attr("y", data => yLinearScale(data.obesity)+4)
        .text(data => data.abbr)
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "white")
        .classed("stateText", true);

    // Append an SVG group element to the SVG area, create the left axis inside of it
    scatterGroup.append("g")
        .classed("axis", true)
        .call(leftAxis);
    
    scatterGroup.append("text")
        .attr("x", -chartHeight/2)
        .attr("y", -margin.left/2) 
        .attr("transform", "translate(0,0) rotate(270)")
        .attr("fill", "black")         
        .text("Obesity (%)")
        .classed("aText", true);

    scatterGroup.append("text")
        .attr("y", chartHeight + margin.top/1.5)
        .attr("x", chartWidth/2)
        .attr("fill", "black")
        .text("Annual Household Income ($)")
        .classed("aText", true);
        
    scatterGroup.append("text")
        .attr("y", -margin.top/2)
        .attr("x", chartWidth/2)
        .attr("fill", "black")
        .text("Annual Household Income vs. Obesity Percentage by State")
        .classed("aText", true);

    // Append an SVG group element to the SVG area, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    scatterGroup.append("g")
        .classed("axis", true)
        .attr("transform", "translate(0, " + chartHeight + ")")
        .call(bottomAxis);
});
