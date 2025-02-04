// background.js

// Listen for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // Check if the context menu API is available and then create the menu
  if (chrome.contextMenus) {
    chrome.contextMenus.create({
      id: "captureData", // Unique ID for the menu item
      title: "Capture Highlighted Data", // Text displayed in the context menu
      contexts: ["selection"] // Show this menu when text is selected
    });

    console.log("Context menu created.");
  } else {
    console.error("chrome.contextMenus is not available.");
  }
});

// Handle context menu click events
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "captureData" && info.selectionText) {
    console.log("Context menu clicked. Captured text:", info.selectionText);

    // Save the selected text to local storage
    chrome.storage.local.get({ capturedData: [] }, (result) => {
      const newCapturedData = result.capturedData || [];
      newCapturedData.push(info.selectionText);
      chrome.storage.local.set({ capturedData: newCapturedData }, () => {
        console.log("Captured data saved:", newCapturedData);
      });
    });
  }
});
