// import "@shopify/polaris/dist/styles.css";
import React, { useCallback, useState } from "react";
import NavigationMarkup from "./navigation";
import TopBarMarkup from "./topmenu";
import {
  AppProvider,
  Frame,
  Layout,
  Loading,
  Navigation,
  Page,
  TopBar,
} from "@shopify/polaris";
import { HomeMajorMonotone, OrdersMajorTwotone } from "@shopify/polaris-icons";

function MyLayout({ children, location, user }) {
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const theme = {
    colors: {
      topBar: {
        background: "#357997",
      },
    },
    logo: {
      width: 124,
      topBarSource:
        "https://uploads-ssl.webflow.com/5f17a1fcb8dc49ecd5d5f371/5f288538a910e51d669484fc_OPEN-Color-NoBG-Light-Side.svg",
      contextualSaveBarSource:
        "https://uploads-ssl.webflow.com/5f17a1fcb8dc49ecd5d5f371/5f288538a910e51d669484fc_OPEN-Color-NoBG-Light-Side.svg",
      url: "",
      accessibilityLabel: "Liftoff",
    },
  };

  return (
    <div style={{ height: "500px" }}>
      <AppProvider theme={theme} features={{ newDesignLanguage: true }}>
        <Frame
          topBar={
            <TopBarMarkup
              user={user}
              userMenuActive={userMenuActive}
              toggleUserMenuActive={toggleUserMenuActive}
              toggleMobileNavigationActive={toggleMobileNavigationActive}
            />
          }
          navigation={<NavigationMarkup location={location} />}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
        >
          {children}
        </Frame>
      </AppProvider>
      <style jsx global>{`
        html,
        body {
          font-size: 1.5rem;
          font-weight: 400;
          line-height: 2rem;
          text-transform: initial;
          letter-spacing: initial;
          font-weight: 400;
          color: var(--p-text, #212b36);
        }
        @media (min-width: 40em) {
          html,
          body {
            font-size: 1.4rem;
          }
        }
        html {
          position: relative;
          font-size: 62.5%;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
          text-rendering: optimizeLegibility;
        }
        body {
          min-height: 100%;
          margin: 0;
          padding: 0;
        }
        html,
        body {
          min-height: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export default MyLayout;
