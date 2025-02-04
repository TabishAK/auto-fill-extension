// content.js

// Function to auto-fill the form
function autoFillForm(data) {
  const mapping = {
    firstName: 'input[name="contact.first_name"]', // First Name
    lastName: 'input[name="contact.last_name"]',  // Last Name
    dob: 'input[name="contact.birth_date"]',      // Date of Birth
    phone: 'input[name="contact.phone"]',        // Phone
    address: 'input[name="contact.address1"]',   // Address
    city: 'input[name="contact.city"]',          // City
    state: 'input[name="contact.state"]',        // State
    zip: 'input[name="contact.postal_code"]',    // Zip Code
    mbi: 'input[name="contact.mbi"]'            // MBI
  };

  console.log("Auto-filling form with data:", data);

  // Loop through the data and populate fields
  for (const [key, value] of Object.entries(data)) {
    const selector = mapping[key]; // Get the field selector
    if (selector) {
      const element = document.querySelector(selector); // Find the input
      if (element) {
        element.value = value; // Set the value
        element.dispatchEvent(new Event("input", { bubbles: true })); // Trigger "input" event
        element.dispatchEvent(new Event("change", { bubbles: true })); // Trigger "change" event
        console.log(`Filled ${key} with value: ${value}`);
      } else {
        console.warn(`No field found for key: ${key}`);
      }
    } else {
      console.warn(`No selector mapping for key: ${key}`);
    }
  }
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "autoFill") {
    console.log("Received auto-fill request:", request.data);
    autoFillForm(request.data); // Call the function to fill the form
    sendResponse({ status: "success" });
  }
});
