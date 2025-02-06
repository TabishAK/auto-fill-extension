// Define the available form fields for selection
const FIELD_LABELS = {
  first_name: 'First Name',
  last_name: 'Last Name',
  birth_date: 'Date of Birth',
  address: 'Address',
  city: 'City',
  state: 'State',
  phone: 'Phone',
  postal_code: 'Zip Code',
  mbi: 'MBI',
};

// Create the parent context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'captureDataParent',
    title: 'Capture Highlighted Data As...',
    contexts: ['selection'],
  });

  Object.entries(FIELD_LABELS).forEach(([key, label]) => {
    chrome.contextMenus.create({
      id: `captureData_${key}`,
      parentId: 'captureDataParent',
      title: label,
      contexts: ['selection'],
    });
  });

  console.log('Context menus created.');
});

// Handle context menu click events
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId.startsWith('captureData_')) {
    const selectedKey = info.menuItemId.replace('captureData_', ''); // Extract the field key
    const selectedValue = info.selectionText;

    if (selectedKey && selectedValue) {
      chrome.storage.local.get({ capturedData: {} }, (result) => {
        console.log('result ---> ', result);

        const updatedData = {
          ...result.capturedData,
          [selectedKey]: selectedValue,
        };
        console.log('Updated data:', updatedData);
        chrome.storage.local.set({ capturedData: updatedData }, () => {
          console.log(`Captured data saved: ${selectedKey} = ${selectedValue}`);
        });
      });
    }
  }
});
