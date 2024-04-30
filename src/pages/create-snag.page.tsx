import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { camera, save } from "ionicons/icons";
import { useCallback, useState } from "react";
import { SnagDTO, useAppContextHook } from "../app.context";
import { useCamera } from "../hooks/use-camera.hook";

export function CreateSnagPage() {
  const { takePhoto, onSelectPhoto, photos } = useCamera();
  const router = useIonRouter();
  const [presentTost] = useIonToast();

  const { createSnag } = useAppContextHook();

  const [description, setDescription] = useState("");

  const handleSave = useCallback(async () => {
    try {
      if (!description) throw new Error("Description cannot be empty");
      if (photos.length == 0) throw new Error("Should have at least one photo");

      const newSnag = await SnagDTO.createInstance(description, photos);

      createSnag(newSnag);

      presentTost({
        message: "Snag created successfully!",
        duration: 1500,
        position: "bottom",
      });

      router.goBack();
    } catch (exception) {
      if (exception instanceof Error) {
        presentTost({
          message: exception.message,
          duration: 1500,
          position: "bottom",
        });
      }
    }
  }, [description, photos, router]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Create Snag</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave}>
              <IonIcon slot="start" icon={save}></IonIcon>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonTextarea
          label="Snag Description"
          fill="solid"
          labelPlacement="stacked"
          placeholder="eg: crack in the wall"
          autoGrow
          value={description}
          onIonInput={(e) => setDescription(e.target.value || "")}
        />

        <IonButton className="mt-4" expand="full" onClick={() => takePhoto()}>
          <IonIcon slot="start" icon={camera}></IonIcon>
          Capture Snag Image
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
      </IonContent>
    </IonPage>
  );
}
