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

### Release notes

1. Login / Registration / Forgot Password Modules
2. Notifications
3. Transaction History
4. Send Money (Squid to Squid)
5. Update Profile (Bronze/Silver and Up) and Change Avatar
6. Add Money via Dragonpay
7. Send To Bank (Instapay and Pesonet)
8. Generate QR Code
9. Account Security (Change Password and Change PIN)
10. News and Inquiry (Link to FB)
11. Promos and Deals (Link to FB)
12. Merchant Inquiry
13. Help Center
14. Contact Us
