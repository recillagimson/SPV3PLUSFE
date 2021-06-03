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
  defaults,
  children,
}: {
  defaults: {};
  children: any;
}) {
  const [flags, setFlags] = React.useState(defaults);

  React.useEffect(() => {
    // remoteConfig.defaultConfig = defaults;

    remoteConfig
      .fetchAndActivate()
      .then(activated => {
        if (!activated) console.log('not activated');
        return remoteConfig.getAll();
      })
      .then(remoteFlags => {
        const newFlags = {
          ...flags,
        };

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
