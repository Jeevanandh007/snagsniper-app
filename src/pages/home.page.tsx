import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useAppContextHook } from "../app.context";
import { SnagList } from "../components/home.page/snag-list";

export function HomePage() {
  const { initState } = useAppContextHook();

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>S N A G - S N I P E R</IonTitle>
          {/* <IonButtons slot="end">
            <IonButton onClick={initState}>Load</IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <SnagList />
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/create-snag">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}
