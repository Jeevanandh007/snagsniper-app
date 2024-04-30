import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { useAppContextHook } from "../app.context";
import { DeleteSnag } from "../components/view-snag.page/delete-snag";
import { UpdateActivityModel } from "../components/view-snag.page/update-activity-model";
import { statusTextMap } from "../constants";

interface ViewSnagPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

export function ViewSnagPage({ match }: ViewSnagPageProps) {
  const { snagList, loading } = useAppContextHook();

  const currentSnag = snagList.find(
    (snagItem) => snagItem.id === match.params.id
  );

  const [presentUpdateStatus, dismiss] = useIonModal(UpdateActivityModel, {
    dismiss: () => dismiss(),
    id: currentSnag?.id,
  });

  if (!currentSnag) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Snag Details</IonTitle>
          <IonButtons slot="end">
            <DeleteSnag id={currentSnag.id} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding space-y-4" fullscreen>
        <IonLoading isOpen={loading} message="Processing..." />

        <div className="flex items-center space-x-3">
          <div className="text-gray-600">Status:</div>
          <div>
            <IonChip color={statusTextMap[currentSnag.status].chipColor}>
              {statusTextMap[currentSnag.status].text}
            </IonChip>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-600">Snag Description:</div>
          <div className="mt-2">{currentSnag?.description}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-600">Snag Photos:</div>
          <div className="mt-2">
            <IonGrid className="-mx-2">
              <IonRow>
                {currentSnag?.snagPhotos.map((photo, index) => (
                  <IonCol size="6" key={index}>
                    <IonImg src={photo.webviewPath} />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-gray-600">Snag Location:</div>
          <div className="mt-2">
            Latitude: {currentSnag.snagLocation.latitude}
            <br />
            Longitude: {currentSnag.snagLocation.longitude}
          </div>
        </div>

        {currentSnag?.fixDescription && (
          <div className="flex flex-col">
            <div className="text-gray-600">Snag Fix Description:</div>
            <div className="mt-2">{currentSnag?.fixDescription}</div>
          </div>
        )}

        {currentSnag?.fixPhotos && (
          <div className="flex flex-col">
            <div className="text-gray-600">Snag Fix Photos:</div>
            <div className="mt-2">
              <IonGrid className="-mx-2">
                <IonRow>
                  {currentSnag?.fixPhotos?.map((photo, index) => (
                    <IonCol size="6" key={index}>
                      <IonImg src={photo.webviewPath} />
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </div>
          </div>
        )}

        {currentSnag?.fixLocation && (
          <div className="flex flex-col">
            <div className="text-gray-600">Snag Fix Location:</div>
            <div className="mt-2">
              Latitude: {currentSnag.fixLocation?.latitude}
              <br />
              Longitude: {currentSnag.fixLocation?.longitude}
            </div>
          </div>
        )}

        <IonButton
          fill="solid"
          expand="full"
          onClick={() => presentUpdateStatus({})}
        >
          Update Activity
        </IonButton>
        <div className="text-gray-600">Activity Log:</div>
        <IonList className="-ml-4 mt-0">
          {currentSnag.activityLog.map((activity) => (
            <IonItem>
              <IonLabel>{activity.description}</IonLabel>
              <IonBadge color={statusTextMap[activity.status].chipColor}>
                {statusTextMap[activity.status].text}
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
