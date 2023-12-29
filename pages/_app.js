//import "../node_modules/normalize.css/normalize.css";
//import "../styles/tailwind.css";
import "../styles/globals.css";

// antd
import "../node_modules/antd/lib/input-number/style/index.css";
import "../node_modules/antd/lib/select/style/index.css";
import "../node_modules/antd/lib/tag/style/index.css";
import "../node_modules/antd/lib/message/style/index.css";
import "../node_modules/antd/lib/radio/style/index.css";
import "../node_modules/antd/lib/input/style/index.css";
import "../node_modules/antd/lib/button/style/index.css";
import "../node_modules/antd/lib/icon/style/index.css";

// blueprint
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/table/lib/css/table.css";
import "../node_modules/@blueprintjs/select/lib/css/blueprint-select.css";
import "../node_modules/@blueprintjs/datetime/lib/css/blueprint-datetime.css";

// polaris
import "../styles/polaris.css";

// tailwind
import "../styles/tailwind.css";

// map
import "../styles/map.css";

// map
import "../styles/borehole_editor.css";

import { AppProvider } from "@shopify/polaris";
import App, { Container } from "next/app";
import enTranslations from "@shopify/polaris/locales/en.json";
import { Provider } from "next-auth/client";

export default class WrappedApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider session={pageProps.session}>
        <AppProvider i18n={enTranslations}>
          <Component {...pageProps} />
        </AppProvider>
      </Provider>
    );
  }
}
