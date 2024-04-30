import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonLoading,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { camera } from "ionicons/icons";
import moment from "moment";
import { useCallback, useState } from "react";
import { SnagStatus, useAppContextHook } from "../../app.context";
import { statusOptions } from "../../constants";
import { useCamera } from "../../hooks/use-camera.hook";

interface UpdateActivityModelProps {
  dismiss: () => void;
  id: string;
}

export function UpdateActivityModel(props: UpdateActivityModelProps) {
  const { snagList, updateSnag, loading } = useAppContextHook();

  const { takePhoto, photos, onSelectPhoto } = useCamera();
  const [description, setDescription] = useState<string>();
  const [status, setStatus] = useState<SnagStatus>();
  const [presentTost] = useIonToast();

  const [savingLoading, setSavingLoading] = useState(false);

  const onHandleSave = useCallback(async () => {
    try {
      setSavingLoading(true);
      const selectedSnag = snagList.find((snag) => snag.id == props.id);

      if (!selectedSnag) throw new Error("Cloud not find snag");

      if (!status) throw new Error("Status cannot be empty");

      if (!description) throw new Error("Description cannot be empty");

      if (status == SnagStatus.COMPLETED) {
        await selectedSnag.setFix(description, photos);
      }

      selectedSnag.activityLog.push({
        createdAt: moment().toISOString(),
        description,
        status,
      });

      selectedSnag.status = status;

      updateSnag(selectedSnag);

      props.dismiss();
    } catch (exception) {
      if (exception instanceof Error) {
        presentTost({
          message: exception.message,
          duration: 1500,
          position: "bottom",
        });
      }
    }

    setSavingLoading(false);
  }, [description, status, snagList, photos]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => props.dismiss()}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle className="text-center">Update Activity</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onHandleSave} strong={true}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading isOpen={loading || savingLoading} message="Saving..." />

        <div className="flex items-center space-x-3 mb-3">
          {/* <div>Status:</div> */}
          <IonSelect
            value={status}
            onIonChange={(v) => setStatus(v.detail.value)}
            interface="alert"
            placeholder="Select status"
            label="Status"
          >
            {statusOptions.map((option) => (
              <IonSelectOption value={option.status}>
                {option.label}
              </IonSelectOption>
            ))}
          </IonSelect>
        </div>

        <IonTextarea
          label="Change Description"
          fill="solid"
          labelPlacement="stacked"
          placeholder="eg: snag assigned to worker"
          autoGrow
          value={description}
          onIonInput={(e) => setDescription(e.target.value || "")}
        />

        {status == SnagStatus.COMPLETED && (
          <>
            <IonButton
              className="mt-4"
              expand="full"
              onClick={() => takePhoto()}
            >
              <IonIcon slot="start" icon={camera}></IonIcon>
              Capture Fix Image
            </IonButton>

            <IonGrid className="-mx-2">
              <IonRow>
                {photos.map((photo, index) => (
                  <IonCol size="6" key={index}>
                    <IonImg
                      onClick={() => onSelectPhoto(photo)}
                      src={photo.webviewPath}
                    />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
}
