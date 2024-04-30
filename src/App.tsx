import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./main.css";
import "./theme/variables.css";

import { AppContextProvider } from "./app.context";
import { CreateSnagPage } from "./pages/create-snag.page";
import { HomePage } from "./pages/home.page";
import { ViewSnagPage } from "./pages/view-snag.page";

setupIonicReact();

export function App() {
  return (
    <AppContextProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/" exact={true}>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact={true} component={HomePage} />
            <Route
              path="/create-snag"
              component={CreateSnagPage}
              exact={true}
            />
            <Route
              path="/view-snag/:id"
              component={ViewSnagPage}
              exact={true}
            />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AppContextProvider>
  );
}
