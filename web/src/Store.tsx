import React from "react";
import { MessageBarType } from "office-ui-fabric-react";

export const storeContext = React.createContext<TStore | null>(null);

export type TUser = {
  id: number;
  name: string;
  avatar: string;
};

export type TMessage = {
  msg: string | null;
  type: MessageBarType;
};

export function createStore() {
  return {
    user: {
      id: 12257555,
      name: "站着做梦的你",
      avatar:
        "http://i2.hdslb.com/bfs/face/67a825a9066a02c342fe7ff1cce505da54e76a09.jpg",
    } as TUser,
    message: {
      msg: null,
      type: MessageBarType.info,
    } as TMessage,
  };
}

export type TStore = ReturnType<typeof createStore>;

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error("You have forgot to use StoreProvider, shame on you.");
  }
  return store;
};

export const showMessage = (
  msg: string,
  type: MessageBarType = MessageBarType.info
) => {
  const store = useStore();
  store.message.msg = msg;
  store.message.type = type;
};
