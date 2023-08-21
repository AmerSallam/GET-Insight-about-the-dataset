document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click", generatePlot);
});

function generatePlot() {
    const datasetOption = document.getElementById("dataset").value;
    const plotFunction = document.getElementById("plotFunction").value;
    const colorScheme = document.getElementById("colorScheme").value;

    fetchPlotData(datasetOption, plotFunction, colorScheme);
}

function fetchPlotData(datasetOption, plotFunction, colorScheme) {
    // You would need to implement data fetching logic here using JavaScript, similar to how pandas is used in Python.
    // For the purpose of this example, I'm assuming the data is already available.

    const data = {};  // Replace with fetched data
    const cleanedData = {};  // Replace with fetched cleaned data

    if (plotFunction === "Histogram") {
        plotHistogram(data, datasetOption, "message", colorScheme);
        plotHistogram(cleanedData, datasetOption, "cleaned_message", colorScheme);
    } else if (plotFunction === "Scatter") {
        plotScatter(data, datasetOption, "message", colorScheme);
        plotScatter(cleanedData, datasetOption, "cleaned_message", colorScheme);
    }
}

function plotHistogram(data, datasetName, columnName, colorScheme) {
    const wordCounts = data[columnName].map(message => message.split(" ").length);

    const trace = {
        x: wordCounts,
        type: "histogram",
        colorscale: colorScheme,
        xaxis: "x",
        yaxis: "y",
        title: `The distribution of the ${datasetName} dataset based on the number of words in each instance (${columnName})`,
        xaxis_title: "Instance Length (Number of Words)",
        yaxis_title: "Frequency",
    };

    Plotly.newPlot("plotContainer", [trace]);
}

function plotScatter(data, datasetName, columnName, colorScheme) {
    const wordCounts = data[columnName].map(message => message.split(" ").length);

    const trace = {
        x: wordCounts,
        y: wordCounts,
        mode: "markers",
        marker: {
            color: wordCounts,
            colorscale: colorScheme,
        },
        type: "scatter",
        title: `The scatter plot of the ${datasetName} dataset based on the number of words in each instance (${columnName})`,
        xaxis: "x",
        yaxis: "y",
        xaxis_title: "Instance Index",
        yaxis_title: "Instance Length (Number of Words)",
    };

    Plotly.newPlot("plotContainer", [trace]);
}
