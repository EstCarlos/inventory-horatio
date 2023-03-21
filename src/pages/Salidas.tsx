import { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonSearchbar,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import axios from "axios";

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

interface LocationState {
  nombre: string;
  apellido: string;
}

const Salidas: React.FC = () => {
  const [cantidad, setCantidad] = useState<number>();
  const [date, setDate] = useState(new Date());

  // Aqui usamos la funcion para tener la fecha en formato (dd-mm-yyyy)
  const formatDate = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    //Productos
    axios
      .get("http://localhost:4000/productos")
      .then((response) => {
        // Aquí puedes manejar la respuesta de la API
        console.log(response.data);
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
          <IonTitle>Salidas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonSearchbar></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonItem className="ion-padding">
          <IonLabel position="floating">Cantidad</IonLabel>
          <IonInput
            type="number"
            placeholder="Enter text"
            onIonChange={(event) => {
              const cantidad = Number(event.detail.value);
              setCantidad(cantidad);
            }}
          />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Salidas;
