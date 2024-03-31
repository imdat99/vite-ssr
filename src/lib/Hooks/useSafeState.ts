import { Dispatch, SetStateAction, useCallback, useState } from "react";

import useMounted from "./useMounted";

const useSafeState = <s>(
  initialState: s | (() => s)
): [s, Dispatch<SetStateAction<s>>] => {
  const [state, setState] = useState(initialState);

  const mounted = useMounted();
  const safeSetState: Dispatch<SetStateAction<s>> = useCallback(
    (update) => {
      if (mounted) {
        setState(update);
      }
    },
    [mounted]
  );
  return [state, safeSetState];
};

export default useSafeState;