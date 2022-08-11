import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { FC, ReactElement } from "react";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export const Rtl: FC<{ children: ReactElement }> = ({ children }) => {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
};
