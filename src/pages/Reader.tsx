import { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonList,
} from "@ionic/react";
import axios from "axios";

type Entrada = {
  Fecha: string;
  Codigo_producto: string;
  Producto: string;
  precio: number;
  suplidor: string;
  cantidad: number;
  encargado_entrega: string;
  quien_registra: string;
  plaza: string;
  costo_por_unidad: number;
};

const Reader: React.FC = () => {
  const [entradas, setEntradas] = useState<Entrada[]>([]);

  useEffect(() => {
    const getEntradas = async () => {
      try {
        const response = await axios.get<Entrada[]>(
          "http://localhost:4000/entradas"
        );
        setEntradas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getEntradas();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Reader</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {/* {entradas.map((entrada) => (
            <IonItem key={entrada.Codigo_producto}>
              <IonLabel>{entrada.Producto}</IonLabel>
            </IonItem>
          ))} */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Reader;
