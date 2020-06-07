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
      id: 20693882,
      name: "电子马龙",
      avatar:
        "http://i2.hdslb.com/bfs/face/20074facd7c96fa2a4d120ff81d91efbf711f712.jpg",
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
  store: TStore,
  msg: string,
  type: MessageBarType = MessageBarType.info
) => {
  store.message.msg = msg;
  store.message.type = type;
};
