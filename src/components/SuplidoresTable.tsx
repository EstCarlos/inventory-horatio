import { IonList, IonItem, IonLabel } from "@ionic/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../config";

const SuplidoresTable: React.FC = () => {
  const [suplidores, setSuplidores] = useState([]);

  //TODO: Funcion para obtener los suplidores
  const obtenerSuplidores = () => {
    axios
      .get(`${apiUrl}suplidor`)
      .then((response) => {
        setSuplidores(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    obtenerSuplidores();
  }, [suplidores]);

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
