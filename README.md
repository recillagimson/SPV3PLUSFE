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
