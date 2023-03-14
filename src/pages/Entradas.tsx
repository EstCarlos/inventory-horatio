import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from "@ionic/react";

import { cameraOutline } from "ionicons/icons";

const Entradas: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Entradas</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* <IonTitle className="ion-padding">Registro de entradas</IonTitle> */}
      <IonContent>
        <IonItem>
          <IonTitle className="ion-padding">
            <IonIcon icon={cameraOutline} />
            Aqui va la camara para el lector de codigo de barras
          </IonTitle>
        </IonItem>

        <IonItem className="ion-padding">
          <IonLabel position="floating">Codigo de Producto</IonLabel>
          <IonInput placeholder="Enter text"></IonInput>
        </IonItem>

        <IonItem className="ion-padding">
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput placeholder="Enter text"></IonInput>
        </IonItem>

        <IonItem className="ion-padding">
          <IonLabel position="floating">Precio</IonLabel>
          <IonInput placeholder="Enter text"></IonInput>
        </IonItem>

        <IonList>
          <IonItem>
            <IonSelect
              interface="popover"
              placeholder="Suplidor"
              className="ion-padding"
            >
              <IonSelectOption value="jumbo">Jumbo</IonSelectOption>
              <IonSelectOption value="nacional">El Nacional</IonSelectOption>
              <IonSelectOption value="pricemart">Pricemart</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        <IonItem className="ion-padding">
          <IonLabel position="floating">Cantidad</IonLabel>
          <IonInput type="number" placeholder="Enter text"></IonInput>
        </IonItem>

        <IonList>
          <IonItem>
            <IonSelect
              interface="popover"
              placeholder="Encargado de entrega"
              className="ion-padding"
            >
              <IonSelectOption value="metroplaza">Carlos Soto</IonSelectOption>
              <IonSelectOption value="Santiago">Ramon Ramirez</IonSelectOption>
              <IonSelectOption value="Santiago">Jeudy Tavarez</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        <IonList>
          <IonItem>
            <IonSelect
              interface="popover"
              placeholder="Quien registra"
              className="ion-padding"
            >
              <IonSelectOption value="metroplaza">Carlos Soto</IonSelectOption>
              <IonSelectOption value="Santiago">Ramon Ramirez</IonSelectOption>
              <IonSelectOption value="Santiago">Jeudy Tavarez</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        <IonList>
          <IonItem>
            <IonSelect
              interface="popover"
              placeholder="Localidad"
              className="ion-padding"
            >
              <IonSelectOption value="metroplaza">Metroplaza</IonSelectOption>
              <IonSelectOption value="Santiago">Santiago</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        <IonItem className="ion-padding">
          <IonLabel position="floating">Cantidad</IonLabel>
          <IonInput type="number" placeholder="Enter text"></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Entradas;
