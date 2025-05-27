import { createContext, useContext } from 'react';

export const MobXStoreContext = createContext(null);

export const useStores = () => useContext(MobXStoreContext);