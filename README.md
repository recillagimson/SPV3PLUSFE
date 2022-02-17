## Install & Start

⚠️ Using [NodeJS](https://nodejs.org/en/).
⚠️ Using [Yarn Package Manager](https://yarnpkg.com) is recommended over `npm`.

Clone this project repository

```shell
git clone <GitRepoURL> <YourProjectFolder>
```

Change directory into <YourProjectFolder>

```shell
cd <YourProjectFolder>
yarn install
yarn start
```

Start Coding!

---

### Notes

1. Application pages should be placed under `app/pages`
2. Application Routes (urls) are declared under `app/App/index.tsx` - import the pages and declare the route under the Switch tag
3. Components should be placed under `app/component` folder
4. API integration steps, if container/component will have API integration, create a `slice` directory inside the container/component folder, refer to `app/pages/Login` for sample `slice` (API) integration
5. If some helper utilities will be made, put it under `utils` folder (ie: faLibrary, etc...)
6. Font used is Museo Sans, for regular text, font weight is `300`, for bold, font weight is `700`;

### To Dos

1. Route might be changed to accommodate services on each tier

---

### Release notes

v1.0.1

- Login / Registration / Forgot Password Modules
  - Update Profile of first time user
- Notifications
- Transaction History
- Send Money (Squid to Squid)
- Update Profile
  - Change Avatar
  - Update Full Name, Email, Mobile and Birthdate Contact Support Notification
- Add Money via Dragonpay
  - Update Email if none exists before using Dragonpay
- Send To Bank (Instapay, Pesonet and UBP Direct)
  - Instapay - replaced with secbank
- Generate QR Code
  - Resized the QR code with QRPH logo
- Account Security (Change Password and Change PIN)
- Paybills
  - SMART
  - MECOR
  - MWCOM
  - MWSN
  - RFID1
  - ETRIP
  - PRULI
  - SSS03
- Buy Load
- Tier Upgrade
  - Silver with ID and Selfie
  - Gold & Platinum Contact Support Notification
- News and Inquiry (Link to SquidPay Facebook Page)
- Promos and Deals (Link to SquidPay Facebook Page)
- Merchant Inquiry
- Help Center
  - FAQ
  - Chat Support (Link to SquidPay Messenger)
  - Privacy Policy
  - Terms and Conditions
- Contact Us
- Chat Plugin Integration

v1.0.2

- Fixes on some bugs
- Added sentry error logging
- Fix fetching of remote config

v1.0.3

- Fix send to bank review page UI display on details
- Fix Send to Bank Total amount display with service fee
- Fix Verify OTP message where the OTP was sent (either Email or Mobile Number)
- Error display on changing password or pin
- Modified RegEx for validating number that causes bug on Safari browser
- Update Profile Nationality and Country dropdown fix
- Buy load proper handling of error messages from API
- Added catching of error 500 on API calls
- Paybills (404) Fix
- Contact Us icon (sidebar) fix correct size
- Fix transaction history date display

v1.0.4

- Send Money
  - Message Field maximum character length changed to 60 in line with the BE (VVBT-281 & VVBT-236)
  - Redirect to dashboard on successfull transaction (VVBT-284)
- Fix copy of "a sms" replaced to "an SMS" in the transaction receipts UI (VVBT-260)
- Generate QR Code, fix issue of input type="number" in Firefox browser (VVBT-244)
- UI Fix for Verify OTP on Profile Update (duplicate message) (VVBT-283)
- Verify OTP proper message "sent to your email or sent to your mobile" (VVBT-235)
- First time user profile creation - Successfull message (VVBT-229)
- Transaction History additional information on Paybills details (VVBT-232)
- Paybills MECOR changes, added BayadPartner Logo (BayadCenter)

v1.0.5

- OTP standardize message

v1.0.6

- VVBT-328 Fix OTP message on Update Email in Dragonpay

v1.0.7

- Fix OTP message on Dragonpay Update Email (VVBT-328)
- Fix display on transaction history details (VVBT-232)

v1.1.0

- Foreign Exchange Rate
- Updated FAQs

v1.1.1

- Upload ID UI modifications, limit to 2 files for upload, added validation on invalid files (VVBT-230, VVBT-338)
- Total transaction amount on Send to Bank. Fix wrong display of adding amount and service fee (VVBT-421)
- Verify OTP Fix (VVBT-282)
- Enhance loading of references on Updating profile (VVBT-400)
- QR Code limit entry on amount (VVBT-245)
- Added a date picker for Date Field in Pay bill due date (VVBT-242, VVBT-273)
- Paybills fix on account number (VVBT-291, VVBT-304)

v1.1.2

- Add 2 Decimal Places in the Amount in the Transaction Confirmation Screen of Send Money (VP2-246)
- Forex - Search parameter should be searching for the 3 char forex symbol, not its description (VP2-285)
- Buy EPINS load description in Review and Receipt screen (VP2-290)
- Additional display of error message on Buy EPINs and fix display of amount in receipt modal (VP2-309 & VP2-328)
- Remove validation of PDF file in Uploading of ids in account upgrade (VP2-300)
- Removed Verify OTP screen on account upgrade to silver (VP2-316)
- Masking of characters in email address and mobile number (VP2-324)

v1.1.3

- Buy load fix stuck in page (VVBT-498)
- Fix on Dragonpay postback url (VVBT-496)
- Arrange alphabetically Buy EPINs products (VP2-371)
- High Resolution Loader (VP2-245)
- Verify OTP Clearing error message and added response when Resend Code is clicked (VP2-241)

v1.2.0

- Display of avatar on send money and buy load (VP2-338, VP2-251)
- Loans (VP2-265, VP2-266, VP2-267, VP2-268, 277)
- Add Money via BPI (VP2-42)
- If no Load ID generated, disable next button (VP2-427)
- Fix resend icon indicator when success (VP2-498)
- Forgot Password - OTP session timeout (VVBT-523)
- Fix BE error to display for non-supported prefix in buy load (VP2-516)

v1.2.1

- Success Modal when user click Resend Code in Verify OTP (VP2-242)
- Display Avatar on Buy Load and Send Money (VP2-251, VP2-338)
- Loans Change Next Button to Confirm in generate ID and trigger sending of sms/email (VP2-631)

v1.2.2

- Fix double click (VP2-441, VP2-444, VP2-447, VP2-459, VP2-461)
- Added service fee in Instapay and Pesonet (VP2-528, VP2-525)

v1.3.0

- QR Code - ScanQR, Receive and Send Money QR (VP2-358)
- ECPay (VP2-469)
- Changes on Add Money via BPI (VP2-42)
- Add Money via UBP (VP2-124)
- Add Money via ECPay (VP2-469)
- Request Transaction History to Email (VP2-581)
- Send to Bank - PesoNet>UBP- I'm getting "not enough balance" if I enter amount more than php1 (QA-193)

v1.3.1

- Fix typo errors
- Updated RSFC loan url

v1.3.2

- Fix Add Money via BPI Account selection not showing

v1.3.3

- Add new billers (World Vision, Angeles Electric Corporation, Pampanga II Electric Cooperative, Inc., National Housing Authority, Pag-Ibig, Pag-Ibig OFW)
- Fix validation of account numbers in Paybills feature.
