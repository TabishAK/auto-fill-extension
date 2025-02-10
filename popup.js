document.addEventListener('DOMContentLoaded', () => {
  const capturedDataList = document.getElementById('capturedDataList');
  const clearButton = document.getElementById('clear-btn');

  chrome.storage.local.get('capturedData', (result) => {
    const capturedData = result.capturedData || {};

    capturedDataList.innerHTML = '';

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
      
      planId: 'Plan ID',
      medicad: 'Medicaid',
      newCarrierName: 'New Carrier Name',
      newCarrierPlanName: 'New Carrier Plan Name',
      confirmationNumber: 'Confirmation Number',
    };

    // Iterate in the predefined order and display only non-empty values
    Object.entries(FIELD_LABELS).forEach(([key, label]) => {
      if (capturedData[key] && capturedData[key].trim() !== '') {
        const listItem = document.createElement('li');

        const labelSpan = document.createElement('span');
        labelSpan.className = 'data_label';
        labelSpan.textContent = `${label}: `;

        listItem.appendChild(labelSpan);
        listItem.appendChild(document.createTextNode(capturedData[key]));

        capturedDataList.appendChild(listItem);
      }
    });
  });

  // Auto-fill button functionality
  document.getElementById('autoFillButton').addEventListener('click', () => {
    chrome.storage.local.get('capturedData', (result) => {
      const capturedData = result.capturedData;

      if (capturedData && Object.keys(capturedData).length > 0) {
        console.log('Sending data to content script:', capturedData);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: 'autoFill', data: capturedData },
            (response) => {
              console.log('Response from content script:', response);
            }
          );
        });
      } else {
        alert(
          'No captured data found! Please highlight text and capture it first.'
        );
      }
    });
  });

  // Clear button functionality
  clearButton.addEventListener('click', () => {
    chrome.storage.local.remove('capturedData', () => {
      if (chrome.runtime.lastError) {
        console.error('Error clearing storage:', chrome.runtime.lastError);
      } else {
        capturedDataList.innerHTML = ''; // Clear the UI list
      }
    });
  });
});
