import { useEffect, useState } from "react";
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
import axios from "axios";

import { cameraOutline } from "ionicons/icons";

type Localidad = {
  id_plaza: number;
  nombre_local: string;
};

type Suplidor = {
  id_suplidor: number;
  nombre_suplidor: string;
};

type Usuarios = {
  id_user: number;
  nombre_user: string;
  apellido_user: string;
  email: string;
};

const Entradas: React.FC = () => {
  const [local, setLocal] = useState<Localidad[]>([]);
  const [suplidor, setSuplidor] = useState<Suplidor[]>([]);
  const [user, setUser] = useState<Usuarios[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/localidad")
      .then((response) => {
        // Aquí puedes manejar la respuesta de la API
        setLocal(response.data);
      })
      .catch((error) => {
        // Aquí puedes manejar cualquier error que se haya producido
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/suplidor")
      .then((response) => {
        // Aquí puedes manejar la respuesta de la API
        setSuplidor(response.data);
      })
      .catch((error) => {
        // Aquí puedes manejar cualquier error que se haya producido
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/usuarios")
      .then((response) => {
        // Aquí puedes manejar la respuesta de la API
        setUser(response.data);
      })
      .catch((error) => {
        // Aquí puedes manejar cualquier error que se haya producido
        console.error(error);
      });
  }, []);

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
              {suplidor.map((suplidor) => (
                <IonSelectOption
                  key={suplidor.id_suplidor}
                  value={suplidor.nombre_suplidor}
                >
                  {suplidor.nombre_suplidor}
                </IonSelectOption>
              ))}
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
              {user.map((user) => (
                <IonSelectOption key={user.id_user} value={user.nombre_user}>
                  {user.nombre_user} {user.apellido_user}
                </IonSelectOption>
              ))}
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
              {user.map((user) => (
                <IonSelectOption key={user.id_user} value={user.nombre_user}>
                  {user.nombre_user} {user.apellido_user}
                </IonSelectOption>
              ))}
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
              {local.map((local) => (
                <IonSelectOption
                  key={local.id_plaza}
                  value={local.nombre_local}
                >
                  {local.nombre_local}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>

        <IonItem className="ion-padding">
          <IonLabel position="floating">Precio unitario</IonLabel>
          <IonInput type="number" placeholder="Enter text"></IonInput>
        </IonItem>

        <IonButton expand="full">Registrar</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Entradas;
