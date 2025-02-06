document.addEventListener('DOMContentLoaded', () => {
  const capturedDataList = document.getElementById('capturedDataList');

  chrome.storage.local.get('capturedData', (result) => {
    const capturedData = result.capturedData || {};

    capturedDataList.innerHTML = ''; // Clear the list before adding items

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
});

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
