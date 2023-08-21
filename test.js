// Select the input element where the user can choose a file
const fileInput = document.getElementById("idatasets/SMS_Spam.txt"); // Replace 'file-input' with your actual input element ID

// Add an event listener to the input element
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0]; // Get the selected file

  if (file) {
    const reader = new FileReader(); // Create a new FileReader instance

    reader.onload = (e) => {
      const fileContent = e.target.result; // Get the content of the file
      console.log(fileContent); // Print the content to the console

      // You can perform further processing with the file content here
    };

    // Read the file as text
    reader.readAsText(file);
  }
});
