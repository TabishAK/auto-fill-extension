# Data Capture and Autofill Chrome Extension

This Chrome Extension allows users to **capture highlighted text** from any web page via the context menu and **autofill** it into form fields on another page.

---

## ✨ Features

- Right-click to capture selected text as specific data fields (e.g., First Name, Address).
- Store captured data in Chrome's local storage.
- View captured data in a popup.
- Autofill the stored data into form fields on any page.
- Clear captured data from the popup.

---

## 🧠 How It Works

1. **Highlight and Capture**  
   Right-click selected text → choose `Capture Highlighted Data As...` → select the corresponding field (e.g., First Name).

2. **View Captured Data**  
   Click the extension icon → view the captured field values in the popup.

3. **Autofill Forms**  
   On the target form page, click `Auto Fill on Page` in the popup to populate matching input fields.

4. **Clear Data**  
   Use the "Clear" button to remove all stored data.

---

## 📁 Project Structure
extension-root
#### 📜 background.js # Handles context menu creation & data storage
#### 📜 content.js # Injected into pages to perform autofill
#### 📜 popup.js # Handles popup UI logic
#### 📜 popup.html # UI for viewing and autofilling captured data
#### 📜 manifest.json # Extension configuration
#### 📁 icons # Icon assets



---

## 🛠 Installation (For Development)

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer Mode** (top-right corner).
4. Click **Load unpacked** and select the extension directory.
5. The extension icon should appear in your toolbar.

---

## 🧪 Testing the Extension

1. Go to any webpage, highlight some text.
2. Right-click and select a field under `Capture Highlighted Data As...`.
3. Click the extension icon to verify captured data.
4. Navigate to a form page and click **Auto Fill on Page** to populate inputs.

---

## 📌 Supported Fields

- First Name
- Last Name
- Date of Birth
- Address
- City
- State
- Phone
- Zip Code
- MBI
- Plan ID
- Medicaid
- New Carrier Name
- New Carrier Plan Name
- Confirmation Number

---

## 💡 Notes

- Autofill uses a flexible name-matching strategy, so inputs with names like `firstName`, `first_name`, or `contact.first_name` will be recognized.
- The extension only targets `<input>` fields for now — you can extend it for `<textarea>` or `<select>` as needed.

---

## 📃 License

MIT License

---

## 🙌 Credits

Developed by Tabish Ali Khan.  
Contributions and improvements are welcome!

