import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import axios from "axios";
import { useEffect, useState } from "react";

const SuplidoresTable: React.FC = () => {
  const [suplidores, setSuplidores] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/suplidor")
      .then((response) => {
        setSuplidores(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <IonList>
      {suplidores.map((suplidor: any) => (
        <IonItem key={suplidor.id_suplidor}>
          <IonLabel>
            <h2>{suplidor.nombre_suplidor}</h2>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

export default SuplidoresTable;
