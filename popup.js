// popup.js

document.getElementById("fillForm").addEventListener("click", () => {
  // Retrieve captured data from local storage
  chrome.storage.local.get("capturedData", (result) => {
    const capturedData = result.capturedData;

    if (Array.isArray(capturedData) && capturedData.length > 0) {
      const latestData = capturedData[capturedData.length - 1]; // Get the most recent data
      console.log("Sending data to content script:", latestData);

      // Send the data to the content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "autoFill", data: latestData }, (response) => {
          console.log("Response from content script:", response);
        });
      });
    } else {
      alert("No captured data found! Please highlight text on Page 1 and capture it first.");
    }
  });
});
