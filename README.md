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
- Generate QR Code
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
