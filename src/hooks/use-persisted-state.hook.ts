import { Preferences } from "@capacitor/preferences";
import { useEffect, useState } from "react";

export function useUsePersistedStateHook<T>(
  initialState: T | (() => T),
  key: string,
  mapper = {
    serializer: (value: any) => JSON.stringify(value),
    deserializer: (value: string) => JSON.parse(value),
  }
) {
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState<T>(initialState);

  const setStateWithSave = async (value: T) => {
    setLoading(true);

    await Preferences.set({
      key: key,
      value: mapper.serializer(value),
    });

    setState(value);

    setLoading(false);
  };

  const initState = async () => {
    try {
      setLoading(true);

      const { value } = await Preferences.get({
        key: key,
      });

      if (value) {
        setState(mapper.deserializer(value));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initState();
  }, []);

  return { state, setState: setStateWithSave, loading, initState };
}
