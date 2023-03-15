import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";

const Tienda: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Salidas</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default Tienda;
