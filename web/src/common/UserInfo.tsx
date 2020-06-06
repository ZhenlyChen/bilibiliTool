import React from "react";
import { Text } from "office-ui-fabric-react";

export const UserInfo = (name: string, avatar: string) => {
  return (
    <div
      style={{
        padding: 8,
      }}
    >
      <img
        src={avatar}
        referrerPolicy="no-referrer"
        style={{
          display: "block",
          borderRadius: "50%",
          height: 42,
          width: 42,
          margin: "auto",
        }}
      />
      <Text
        variant="medium"
        style={{
          fontWeight: "bold",
          fontSize: 16,
          margin: "12px auto",
          color: "#fb7299",
          textAlign: "center",
          display: "block",
        }}
      >
        {name}
      </Text>
    </div>
  );
};
