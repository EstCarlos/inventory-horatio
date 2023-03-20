import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
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
import toast, { Toaster } from "react-hot-toast";

import { cameraOutline, arrowBackCircleOutline } from "ionicons/icons";

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

const Entradas: React.FC<RouteComponentProps<any, {}, LocationState>> = ({
  location,
}) => {
  // const location = useLocation();
  // const { nombre } = location.state;
  // console.log(`${nombre}`);

  const [codigo_producto, setCodigo_producto] = useState("");

  const [date, setDate] = useState(new Date());

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };
  // console.log(formatDate(date));

  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState(0);

  const [suplidor, setSuplidor] = useState<Suplidor[]>([]);
  const [currentSuplidor, setCurrentSuplidor] = useState<string>("");

  const [local, setLocal] = useState<Localidad[]>([]);
  const [currentLocalidad, setCurrentLocalidad] = useState<string>("");

  const [user, setUser] = useState<Usuarios[]>([]);
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    //Localidad
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

  const compareLocalidadWith = (a: Localidad, b: Localidad) =>
    a && b ? a.id_plaza === b.id_plaza : a === b;

  useEffect(() => {
    //suplidor
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

  const compareSuplidorWith = (a: Suplidor, b: Suplidor) =>
    a && b ? a.id_suplidor === b.id_suplidor : a === b;

  useEffect(() => {
    //Usuarioss
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

  const GuardarEntrada = () => {
    if (!codigo_producto) {
      setInputError(true);
      toast.error("Por favor, ingrese un nombre de proveedor");
      return;
    }

    // Peticion HTTP
    axios
      .post("http://localhost:4000/execsuplidores", {
        codigo_producto: codigo_producto,
      })
      .then((response) => {
        console.log(response.data);
        // Limpiar el input después de enviar la petición
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

        <IonItem className="ion-padding">
          <IonLabel position="floating">Cantidad</IonLabel>
          <IonInput type="number" placeholder="Enter text"></IonInput>
        </IonItem>

        {/* //TODO: Selecte que me trae el ID del seleccionado (Localidad) */}

        <IonList>
          <IonItem>
            <IonSelect
              placeholder="Localidad"
              compareWith={compareLocalidadWith}
              className="ion-padding"
              onIonChange={(ev) =>
                setCurrentLocalidad(JSON.stringify(ev.detail.value))
              }
            >
              {local.map((localidad) => (
                <IonSelectOption key={localidad.id_plaza} value={localidad}>
                  {localidad.nombre_local}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {/* <IonItem lines="none">
            <IonLabel>Current localidad: {currentLocalidad}</IonLabel>
          </IonItem> */}
        </IonList>

        {/* //TODO: Selecte que me trae el ID del seleccionado (Suplidor) */}

        <IonList>
          <IonItem>
            <IonSelect
              placeholder="Selecciona suplidor"
              compareWith={compareSuplidorWith}
              onIonChange={(ev) =>
                setCurrentSuplidor(JSON.stringify(ev.detail.value))
              }
            >
              {suplidor.map((suplidor) => (
                <IonSelectOption key={suplidor.id_suplidor} value={suplidor}>
                  {suplidor.nombre_suplidor}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {/* <IonItem lines="none">
            <IonLabel>Current suplidor: {currentSuplidor}</IonLabel>
          </IonItem> */}
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
