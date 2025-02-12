// Function to auto-fill the form
function autoFillForm(data) {
  const INPUT_NAME_MAPPING = {
    first_name: [
      'contact.first_name',
      'firstName',
      'FirstName',
      'first_name',
      'firstname',
    ],
    last_name: ['contact.last_name', 'lastName', 'LastName', 'last_name'],
    birth_date: ['contact.birth_date', 'birthDate', 'BirthDate', 'birth_date'],
    phone: ['contact.phone', 'phoneNumber', 'PhoneNumber', 'phone'],
    address: ['contact.address1', 'address', 'Address', 'address1'],
    city: ['contact.city', 'city', 'City'],
    state: ['contact.state', 'state', 'State'],
    postal_code: [
      'contact.postal_code',
      'zip',
      'Zip',
      'postalCode',
      'PostalCode',
    ],
    mbi: ['contact.mbi', 'mbi', 'MBI'],

    planId: ['contact.planId', 'contact.plan_id', 'planId', 'PlanId'],
    medicad: ['contact.medicaid', 'medicaid', 'Medicaid'],
    newCarrierName: [
      'contact.carrier',
      'contact.new_carrier_name',
      'contact.newCarrierName',
      'newCarrierName',
      'NewCarrierName',
      'new_carrier_name',
    ],
    newCarrierPlanName: [
      'contact.new_plan_name',
      'contact.new_carrier_plan_name',
      'newCarrierPlanName',
      'NewCarrierPlanName',
      'new_carrier_plan_name',
    ],
    confirmationNumber: [
      'contact.confirmation_number',
      'contact.confirmationNumber',
      'confirmationNumber',
      'ConfirmationNumber',
      'confirmation_number',
    ],
  };

  console.log('Auto-filling form with data:', data);

  for (const [key, value] of Object.entries(data)) {
    const possibleNames = INPUT_NAME_MAPPING[key];
    if (!possibleNames) {
      console.warn(`No selector mapping for key: ${key}`);
      continue;
    }

    // Select ALL input fields (text + tel)
    const inputs = document.querySelectorAll(
      'input[type="text"], input[type="tel"]'
    );

    inputs.forEach((input) => {
      const inputName = input.name.toLowerCase().replace(/\s+/g, ''); // Normalize input name

      if (
        possibleNames.some((name) => inputName.includes(name.toLowerCase()))
      ) {
        input.value = value; // Set value
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        console.log(
          `Filled ${key} in input with name="${input.name}" with value: ${value}`
        );
      }
    });
  }
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'autoFill') {
    console.log('Received auto-fill request:', request.data);
    autoFillForm(request.data);
    sendResponse({ status: 'success' });
  }
});
