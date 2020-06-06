import { useObserver } from "mobx-react-lite";
import { MessageBar } from "office-ui-fabric-react";
import { useStore } from "../Store";
import React from "react";

export const TopMessageBar: React.FunctionComponent = () => {
  const store = useStore();

  const closeMessage = () => {
    store.message.msg = null;
  };

  return useObserver(() => (
    <div>
      {store.message.msg && (
        <MessageBar
          styles={{
            root: {
              position: "fixed",
              zIndex: 1024,
            },
          }}
          messageBarType={store.message.type}
          onDismiss={closeMessage}
          dismissButtonAriaLabel="Close"
        >
          {store.message.msg}
        </MessageBar>
      )}
    </div>
  ));
};
