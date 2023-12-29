import React from "react";
import { Navigation } from "@shopify/polaris";
import { GlobeMajor, CategoriesMajor } from "@shopify/polaris-icons";

const NavigationMarkup = ({ location }) => {
  return (
    <Navigation location={location}>
      <Navigation.Section
        title="Menu"
        items={[
          //   {
          //     url: "/home/",
          //     label: "Dashboard",
          //     icon: HomeMajorMonotone,
          //     exactMatch: true,
          //   },
          {
            exactMatch: true,
            url: "/home/boreholes",
            label: "Boreholes",
            icon: CategoriesMajor,
          },
          {
            exactMatch: true,
            url: "/home/map",
            label: "Map",
            icon: GlobeMajor,
          },
        ]}
      />
    </Navigation>
  );
};

export default NavigationMarkup;
