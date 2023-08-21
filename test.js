// const fs = require("fs");

// const filePath = "datasets/SMS_Spam.txt"; // Replace with the actual path to your text file

// fs.readFile(filePath, "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading the file:", err);
//     return;
//   }

//   const lines = data.split("\n"); // Split the content into lines
//   const first10Lines = lines.slice(0, 10); // Get the first 10 lines

//   // Convert the data into an array of objects with keys for each column
//   const tableData = first10Lines.map((line) => {
//     const columns = line.split("\t"); // Assuming the data is comma-separated
//     const labelValue = columns[0] === "ham" ? 0 : 1; // Replace "ham" with 0, "spam" with 1
//     return {
//       label: labelValue, // Replace with actual column names
//       message: columns[1],
//       // Add more columns as needed
//     };
//   });

//   console.table(tableData); // Display the data as a table
// });

const fs = require("fs");

function processFile(filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      callback(err, null);
      return;
    }

    const lines = data.split("\n"); // Split the content into lines
    const firstLines = lines.slice(0, 5); // Get the first 20 lines

    // Convert the data into an array of objects with keys for each column
    const tableData = firstLines.map((line) => {
    const columns = line.split("\t"); // Assuming the data is tab-separated
    const labelValue = columns[0] === "ham" ? 0 : 1; // Replace "ham" with 0, "spam" with 1
    return {
        label: labelValue,
        examples: columns[1],
        // Add more columns as needed
      };
    });

    callback(null, tableData); // Return the processed data
  });
}

const filePath = "datasets/SMS_Spam.txt"; //the path of the datsset file

processFile(filePath, (err, tableData) => {
  if (!err) {
    console.table(tableData); // Display the data as a table

    const cleanedData = tableData.map((row) => {
      return {
        label: row.label,
        clean_examples: cleanDataset(row.examples, 10), // Clean the message using the cleanDataset function
      };
    });

    console.table(cleanedData); // Display the cleaned data as a table
  } else {
    console.error("Error processing the file:", err);
  }
});

// Function to clean text data
function cleanDataset(sentence, n) {
  // xx = 
  const stopWords = new Set(['should', 'haven', 're', 'was', 'between', "haven't", 'same', 'again', "hadn't", 'shan', 'it', 'have', 'yourselves', 'up', 'of', 'over', 'won', "shan't", 'll', 'themselves', 'further', 'me', 'yourself', 'yours', 'ourselves', 'who', 'these', 'that', "isn't", 'against', 'on', 'weren', 'been', 'he', 'theirs', 't', 'o', 'doing', 'is', 'too', 'what', "mustn't", 'but', 'hers', 'your', 'them', 'about', 'some', 'the', 'isn', 'our', 'to', 'when', 'at', 'which', 'each', 'did', 'or', 'by', 'during', 'after', "aren't", 'mightn', "don't", "she's", 'ma', 'whom', 'just', 'doesn', "doesn't", 'so', 'a', 'will', 'his', 's', 'myself', 'more', 'm', 'then', 'as', 'are', 'both', 'any', 'own', "wasn't", 'from', 'am', "weren't", 'before', 'here', 'ain', 'wasn', 'aren', 'only', 'under', 'were', 'can', 'itself', 'ours', 'her', 'its', 'an', "it's", 'couldn', 'don', "needn't", 'where', 'him', 'below', 'through', 'herself', 'few', "didn't", 'down', 'hadn', "shouldn't", 'other', "wouldn't", "you've", 'my', 'didn', 'because', 'i', "that'll", 'now', 'needn', 'such', 'with', 'having', 'very', 'while', 'this', 'until', 'off', 'had', 'not', 'why', 'all', 'and', 'no', 'most', 'hasn', "you're", 'being', 'out', "should've", "won't", "couldn't", 'wouldn', 've', 'than', 'y', "hasn't", 'do', 'in', 'they', 'their', "mightn't", 'be', 'above', 'there', 'you', 'nor', 'shouldn', 'into', 'how', 'mustn', "you'll", 'd', 'she', 'for', "you'd", 'does', 'himself', 'those', 'once', 'has', 'we', 'if']); // Define your stop words here
  const cleanedTokens = sentence
    .replace(/[^\w\s]|_/g, "")
    .split(/\s+/)
    .filter((word) => !stopWords.has(word));
  return cleanedTokens.slice(0, n).join(" ");
}







