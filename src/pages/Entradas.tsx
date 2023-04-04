import { useEffect, useState } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";

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
  RefresherEventDetail,
  IonRefresher,
  IonRefresherContent,
  useIonRouter,
} from "@ionic/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner";
import { apiUrl } from "../config";

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

interface User {
  user: string;
}

const Entradas: React.FC = () => {
  //TODO: Verificar si existe un token o no para sacarlo de la ruta
  const navigation = useIonRouter();
  useEffect(() => {
    //Veificar si hay un token en el Localstorage
    const token = localStorage.getItem("token");
    if (!token) {
      //verificar a la pagina principal si hay un token
      navigation.push("/register", "forward", "replace");
    }
  }, []);

  const [user, setUser] = useState("");

  const [codigo_producto, setCodigo_producto] = useState("");

  //TODO: Aqui usamos la funcion para tener la fecha en formato (dd-mm-yyyy) (ENTRADAS)
  const [date, setDate] = useState(new Date());
  const formatDate = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState<number>();
  const [cantidad, setCantidad] = useState<number>();
  const [costo, setCosto] = useState<number | undefined>(undefined);

  const [suplidor, setSuplidor] = useState<Suplidor[]>([]);
  const [currentSuplidor, setCurrentSuplidor] = useState<string>("");

  const [local, setLocal] = useState<Localidad[]>([]);
  const [currentLocalidad, setCurrentLocalidad] = useState<string>("");

  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    //Localidad
    axios
      .get(`${apiUrl}localidad`)
      .then((response) => {
        // Aquí puedes manejar la respuesta de la API
        setLocal(response.data);
      })
      .catch((error) => {
        // Aquí puedes manejar cualquier error que se haya producido
        console.error(error);
      });
  }, [local]);

  const compareLocalidadWith = (a: Localidad, b: Localidad) =>
    a && b ? a.id_plaza === b.id_plaza : a === b;

  useEffect(() => {
    //suplidor
    axios
      .get(`${apiUrl}suplidor`)
      .then((response) => {
        // Aquí puedes manejar la respuesta de la API
        setSuplidor(response.data);
      })
      .catch((error) => {
        // Aquí puedes manejar cualquier error que se haya producido
        console.error(error);
      });
  }, [suplidor]);

  const compareSuplidorWith = (a: Suplidor, b: Suplidor) =>
    a && b ? a.id_suplidor === b.id_suplidor : a === b;

  //TODO: CALCULAR EL COSTO PRECIO / CANTIDAD (ENTRADAS) ✅
  function calcularCosto(
    precio: number | undefined,
    cantidad: number | undefined
  ) {
    if (
      typeof precio === "number" &&
      typeof cantidad === "number" &&
      cantidad !== 0
    ) {
      const costo = precio / cantidad;
      setCosto(costo);
    } else {
      setCosto(undefined);
    }
  }
  useEffect(() => {
    calcularCosto(precio, cantidad);
  }, [precio, cantidad]);

  //TODO: REGISTRAR LA ENTRADA DE LOS PRODUCTOS Y EJECUTRAR EL PROCEDIMIENTO (ENTRADAS)
  const GuardarEntrada = () => {
    if (!codigo_producto || !cantidad) {
      setInputError(true);
      toast.error("Por favor, complete los espacios en blancos");
      return;
    }

    // Peticion HTTP
    axios
      .post(`${apiUrl}execentradas`, {
        codigo_producto: codigo_producto,
        fecha: formatDate(date),
        producto: producto,
        precio: precio,
        id_suplidor: currentSuplidor,
        id_plaza: currentLocalidad,
        cantidad: cantidad,
        encargado_entrega: user,
        quien_registra: user,
        costo_por_unidad: costo,
      })
      .then((response) => {
        console.log(response.data);
        // Limpiar el input después de enviar la petición
        setRegistrado(true);
      })
      .catch((error) => {
        console.error(error);
      });

    toast.success("Guardado", {
      icon: "✅",
    });
  };

  //TODO: Limpiar los campos cuando se confirme la peticion
  const [registrado, setRegistrado] = useState(false);
  useEffect(() => {
    if (registrado) {
      setCodigo_producto("");
      setProducto("");
      setPrecio(undefined);
      setCantidad(undefined);
    }
  }, [registrado]);

  //TODO: OBTENER EL NOMBRE DESDE EL LOCALSTORAGE Y GUARDARLO EN EL ESTADO (ENTRADAS) ✅
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  //TODO: IMPLEMENTAR EL LECTOR DE CODIGO DE BARRAS (Entradas) ⚠️
  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    console.log(`Barcode data: ${data.text}`);
  };

  //TODO: REFRESCAR LA PAGINA (SALIDAS) ✅
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here

      event.detail.complete();
    }, 2000);
  }

  //TODO: FUNCIONALIDAD SI EXISTE UN PRODUCTO DESHABILITAR EL INPUT DEL NOMBRE
  const [productoExists, setProductoExists] = useState(false);

  const handleCodigoProductoChange = async (event: any) => {
    const codigo_producto = event.detail.value!;
    setCodigo_producto(codigo_producto);

    if (codigo_producto) {
      try {
        const response = await axios.get(
          `${apiUrl}productos/${codigo_producto}`
        );
        const data = response.data;
        if (data.length > 0) {
          setProducto(data[0].nombre_producto);
          setProductoExists(true);
        } else {
          setProducto("");
          setProductoExists(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //TODO: AGREGAR NOTIFICACIONES LOCALES PARA LAS ALERTAS DEL STOCK
  const scheduleNotification = async () => {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "¡Hola!",
          body: "Esta es una notificación de prueba",
          id: 1,
          schedule: { at: new Date(Date.now() + 10000) },
          actionTypeId: "",
          extra: null,
        },
      ],
    });
  };
  const handleScheduleNotification = () => {
    scheduleNotification();
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

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonItem className="ion-padding">
          <IonLabel position="floating">Codigo de Producto</IonLabel>
          <IonInput
            required
            placeholder="Enter text"
            onIonChange={handleCodigoProductoChange}
          ></IonInput>
        </IonItem>

        {/* <IonItem className="ion-padding">
          <IonButton onClick={openScanner}>Scan barcode</IonButton>
        </IonItem> */}

        <IonItem className="ion-padding">
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput
            placeholder="Enter text"
            onIonChange={(event) => {
              setProducto(event.detail.value!);
            }}
            disabled={productoExists}
            value={producto}
          ></IonInput>
        </IonItem>

        <IonItem className="ion-padding">
          <IonLabel position="floating">Precio</IonLabel>
          <IonInput
            placeholder="Enter text"
            onIonChange={(event) => {
              const precio = Number(event.detail.value);
              setPrecio(precio);
              calcularCosto(precio, cantidad!);
            }}
          />
        </IonItem>

        <IonItem className="ion-padding">
          <IonLabel position="floating">Cantidad</IonLabel>
          <IonInput
            type="number"
            placeholder="Enter text"
            onIonChange={(event) => {
              const cantidad = Number(event.detail.value);
              setCantidad(cantidad);
              calcularCosto(precio!, cantidad);
            }}
          />
        </IonItem>

        {/* //TODO: Selecte que me trae el ID del seleccionado (Localidad) */}

        <IonList>
          <IonItem>
            <IonSelect
              placeholder="Localidad"
              compareWith={compareLocalidadWith}
              className="ion-padding"
              onIonChange={(ev) =>
                setCurrentLocalidad(JSON.stringify(ev.detail.value.id_plaza))
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

        <IonList>
          <IonItem>
            <IonSelect
              placeholder="Selecciona suplidor"
              compareWith={compareSuplidorWith}
              onIonChange={(ev) =>
                setCurrentSuplidor(JSON.stringify(ev.detail.value.id_suplidor))
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

        <p>Costo unitario: {costo}</p>

        <IonButton expand="full" onClick={GuardarEntrada}>
          Registrar
        </IonButton>
      </IonContent>
      <Toaster position="top-center" reverseOrder={false} />
    </IonPage>
  );
};

export default Entradas;
