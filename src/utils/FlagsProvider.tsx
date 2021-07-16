/**
 * Remote Config Flag Provider
 */
import React from 'react';
import { remoteConfig } from './firebase';

const FlagsContext = React.createContext({});

// hook for using flags in our components
export const useFlags = () => {
  const context = React.useContext(FlagsContext);
  return context;
};

// remote config
export default function FlagsProvider({
  defaultFlags,
  children,
}: {
  defaultFlags: {};
  children: any;
}) {
  const [flags, setFlags] = React.useState(defaultFlags);

  React.useEffect(() => {
    // remoteConfig.defaultConfig = defaults;

    remoteConfig
      .fetchAndActivate()
      .then(activated => {
        return remoteConfig.getAll();
      })
      .then(remoteFlags => {
        const newFlags = {
          ...flags,
        };
        // loop to each flags and save as boolean
        for (const [key, config] of Object.entries(remoteFlags)) {
          newFlags[key] = config.asBoolean();
        }

        setFlags(newFlags);
      })
      .catch(error => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlagsContext.Provider value={flags}>{children}</FlagsContext.Provider>
  );
}
