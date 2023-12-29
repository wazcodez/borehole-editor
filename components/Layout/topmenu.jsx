import React, { useCallback, useState } from "react";
import { TopBar } from "@shopify/polaris";
import { signOut } from "next-auth/client";

const TopBarMarkup = ({
  userMenuActive,
  toggleUserMenuActive,
  toggleMobileNavigationActive,
  user,
}) => {
  return (
    <TopBar
      showNavigationToggle
      userMenu={
        <TopBar.UserMenu
          actions={[
            {
              items: [
                {
                  content: "Signout",
                  onAction: () => {
                    signOut();
                  },
                },
              ],
            },
          ]}
          name={user !== undefined ? user.name : "Unidentified"}
          detail={"User"}
          initials={user !== undefined ? user.name[0] : "U"}
          open={userMenuActive}
          onToggle={toggleUserMenuActive}
        />
      }
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );
};

export default TopBarMarkup;
