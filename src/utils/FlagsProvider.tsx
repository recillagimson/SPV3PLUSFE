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
  const [refetch, setRefetch] = React.useState(false);
  const [flags, setFlags] = React.useState(defaultFlags);

  React.useEffect(() => {
    // remoteConfig.defaultConfig = defaults;

    getRemoteConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (refetch) {
      setTimeout(() => {
        getRemoteConfig();
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  const getRemoteConfig = () => {
    remoteConfig
      .fetchAndActivate()
      .then(activated => {
        return remoteConfig.getAll();
      })
      .then((remoteFlags): any => {
        const newFlags = {
          ...flags,
        };
        // loop to each flags and save as boolean
        Object.entries(remoteFlags).map((item: any) => {
          const [key, config] = item;
          newFlags[key] = config.asBoolean();
          return false;
        });

        setFlags(newFlags);
        setRefetch(false);
      })
      .catch(error => setRefetch(true));
  };

  return (
    <FlagsContext.Provider value={flags}>{children}</FlagsContext.Provider>
  );
}
