const svgWidth = 800;
const svgHeight = 400;

// Create the SVG container
const svg = d3
  .select("#chart") // Select the SVG element by its ID
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Create a sample tableData (replace this with your actual data)
const tableData = [
  { label: 0, examples: "This is an example sentence." },
  { label: 1, examples: "Another example for demonstration." },
  // ... (add more data)
];

// Calculate word counts for each example
tableData.forEach((row) => {
  row.wordCount = row.examples.split(" ").length;
});

// Create a histogram generator
const histogram = d3.histogram()
  .value((d) => d.wordCount)
  .domain([0, d3.max(tableData, (d) => d.wordCount)])
  .thresholds(d3.range(0, d3.max(tableData, (d) => d.wordCount) + 1));

const bins = histogram(tableData);

// Define scales for x and y axes
const xScale = d3.scaleLinear()
  .domain([0, d3.max(bins, (d) => d.x1)])
  .range([0, svgWidth]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(bins, (d) => d.length)])
  .range([svgHeight, 0]);

// Create bars for the histogram
svg.selectAll("rect")
  .data(bins)
  .enter()
  .append("rect")
  .attr("x", (d) => xScale(d.x0))
  .attr("y", (d) => yScale(d.length))
  .attr("width", (d) => xScale(d.x1) - xScale(d.x0))
  .attr("height", (d) => svgHeight - yScale(d.length))
  .attr("fill", "steelblue");
