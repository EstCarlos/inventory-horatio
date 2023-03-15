import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  useIonLoading,
} from "@ionic/react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import SuplidoresTable from "../components/SuplidoresTable";

const Suplidor: React.FC = () => {
  const [nombreSuplidor, setNombreSuplidor] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleNombreSuplidorChange = (event: CustomEvent) => {
    setNombreSuplidor(event.detail.value!);
  };

  const GuardarSuplidor = () => {
    if (!nombreSuplidor) {
      setInputError(true);
      toast.error("Por favor, ingrese un nombre de proveedor");
      return;
    }
    // Peticion HTTP
    axios
      .post("http://localhost:4000/execsuplidores", {
        nombre_suplidor: nombreSuplidor,
      })
      .then((response) => {
        console.log(response.data);
        setNombreSuplidor(""); // Limpiar el input después de enviar la petición
      })
      .catch((error) => {
        console.error(error);
      });

    toast.success("Guardado", {
      icon: "✅",
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Suplidor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Suplidores</h1>

        <IonItem>
          <IonLabel position="floating">Nombre del suplidor</IonLabel>
          <IonInput
            type="text"
            value={nombreSuplidor}
            onIonChange={handleNombreSuplidorChange}
          />
        </IonItem>

        <IonButton expand="block" color="success" onClick={GuardarSuplidor}>
          Guardar
        </IonButton>
        <h2>Lista de suplidores</h2>
        <SuplidoresTable />
      </IonContent>
      <Toaster position="top-center" reverseOrder={false} />
    </IonPage>
  );
};

export default Suplidor;
