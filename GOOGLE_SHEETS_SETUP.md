# Google Sheets Lead Capture — Setup Guide

## Yeh Script kya karti hai?
Har baar koi user brochure ya enquiry form fill kare, uska naam, number, project — sab Google Sheet mein automatically save ho jaata hai.

---

## Step 1 — Ek nayi Google Sheet banao

1. Open karo: https://sheets.google.com
2. **Blank spreadsheet** pe click karo
3. Name dena: `EastProject Leads`
4. Row 1 mein yeh headers type karo (A1 se start):

```
Timestamp | Name | Phone | Email | Property | Budget | Message | Source
```

---

## Step 2 — Apps Script deploy karo

1. Sheet mein upar **Extensions** menu → **Apps Script** click karo
2. Jo code wahan hai use saara delete karo
3. Neeche diya hua poora code paste karo:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var d = e.parameter;
    sheet.appendRow([
      new Date(),
      d.name    || '',
      d.phone   || '',
      d.email   || '',
      d.property|| '',
      d.budget  || '',
      d.message || '',
      d.source  || 'website'
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. **Save** karo (Ctrl+S)

---

## Step 3 — Script Deploy karo

1. Upar right mein **Deploy** button → **New deployment** click karo
2. Gear icon (⚙️) → **Web app** select karo
3. Settings:
   - **Description**: EastProject Lead Form
   - **Execute as**: Me (your Gmail)
   - **Who has access**: **Anyone** ← yeh zaroori hai!
4. **Deploy** click karo
5. Google permissions maangega — **Allow** karo
6. **Web app URL** copy karo — kuch aisa dikhega:
   ```
   https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec
   ```

---

## Step 4 — URL website mein daalo

`src/components/LeadForm.jsx` file mein line 6 pe yeh line hai:

```js
const SHEET_URL = 'https://script.google.com/macros/s/AKfycby.../exec'
```

Isko replace karo apni nayi URL se.

Phir:
```
git add .
git commit -m "fix: update google sheets script url"
git push
```

---

## ✅ Test karo
1. Koi bhi project kholo website pe
2. "Download Brochure" click karo
3. Name + number bharo → Submit
4. WhatsApp automatically khulega apne phone pe ready message ke saath
5. Google Sheet check karo — lead wahan aa jaayega

---

## Kuch problem aayi?
WhatsApp: 8102422651 pe message karo ya sheet URL dobara check karo.
