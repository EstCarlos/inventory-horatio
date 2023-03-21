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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonLabel,
  useIonRouter,
  IonInput,
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

type Productos = {
  codigo_producto: string;
  nombre_producto: string;
  inventario_actual: number;
};

const Reader: React.FC = () => {
  const navigation = useIonRouter();
  useEffect(() => {
    //Veificar si hay un token en el Localstorage
    const token = localStorage.getItem("token");
    if (!token) {
      //verificar a la pagina principal si hay un token
      navigation.push("/register", "forward", "replace");
    }
  }, []);

  const [productos, setProuctos] = useState<Productos[]>([]);

  useEffect(() => {
    const getEntradas = async () => {
      try {
        const response = await axios.get<Productos[]>(
          "http://localhost:4000/productos"
        );
        setProuctos(response.data);
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

      {productos.map((produc) => (
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Codigo: {produc.codigo_producto}</IonCardSubtitle>
            <IonCardTitle>{produc.nombre_producto}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Existencia: {produc.inventario_actual}
          </IonCardContent>
        </IonCard>
      ))}
    </IonPage>
  );
};

export default Reader;
