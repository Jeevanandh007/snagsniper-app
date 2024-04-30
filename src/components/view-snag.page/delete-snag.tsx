import {
  IonButton,
  IonIcon,
  useIonActionSheet,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import { useAppContextHook } from "../../app.context";

interface DeleteSnagProps {
  id: string;
}

export function DeleteSnag(props: DeleteSnagProps) {
  const { deleteSnag } = useAppContextHook();
  const [presentTost] = useIonToast();
  const router = useIonRouter();

  const [presentAction] = useIonActionSheet();

  const handleDelete = () => {
    presentAction({
      header: "Are you sure?",
      buttons: [
        {
          text: "Yes",
          role: "confirm",
          handler: () => {
            deleteSnag(props.id);

            presentTost({
              message: "Snag removed successfully!",
              duration: 1500,
              position: "bottom",
            });

            router.goBack();
          },
        },
        {
          text: "No",
          role: "cancel",
        },
      ],
    });
  };
  return (
    <IonButton onClick={handleDelete}>
      <IonIcon slot="start" icon={trash}></IonIcon>
      Delete
    </IonButton>
  );
}
