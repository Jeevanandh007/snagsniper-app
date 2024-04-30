import {
  IonBadge,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
} from "@ionic/react";
import { alertCircle } from "ionicons/icons";
import moment from "moment";
import { useAppContextHook } from "../../app.context";
import { statusTextMap } from "../../constants";

export function SnagList() {
  const { snagList, loading } = useAppContextHook();

  if (snagList.length == 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <IonIcon icon={alertCircle} size="large" color="secondary" />
          <div className="text-center">Your snag list seems empty now</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <IonLoading isOpen={loading} message="Loading..." />
      <IonList lines="full" className="h-full">
        {snagList.map((snagItem) => (
          <IonItem routerLink={`/view-snag/${snagItem.id}`}>
            <IonLabel>
              <h3>{snagItem.description}</h3>
              <p>{moment(snagItem.createdAt).format("LLL")}</p>
            </IonLabel>

            <IonBadge color={statusTextMap[snagItem.status].chipColor}>
              {statusTextMap[snagItem.status].text}
            </IonBadge>
          </IonItem>
        ))}
      </IonList>
    </>
  );
}
