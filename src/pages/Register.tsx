import { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  useIonRouter,
  IonContent,
  IonButton,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonNavLink,
} from "@ionic/react";
import { arrowForwardOutline, personCircleOutline } from "ionicons/icons";
import "./Register.css";
// import Logo from "../assets/horatioLogo.png";
import Login from "./Login";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { LocalNotifications } from "@capacitor/local-notifications";
import { apiUrl } from "../config";

type Productos = {
  id: string;
  codigo_producto: string;
  nombre_producto: string;
  nombre_suplidor: number;
  nombre_local: string;
  inventario_actual: number;
};
const Register: React.FC = () => {
  const [nombre, setnombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPaswword] = useState("");
  const [, setInputError] = useState(false);

  const navigation = useIonRouter();

  useEffect(() => {
    //Veificar si hay un token en el Localstorage
    const token = localStorage.getItem("token");
    if (token) {
      //verificar a la pagina principal si hay un token
      navigation.push("/app/reader", "forward", "replace");
    }
  }, []);

  const GoToLogin = () => {
    navigation.push("/login", "forward", "replace");
  };

  const Registrar = () => {
    if (!nombre || !apellido || !email || !password) {
      setInputError(true);
      toast.error("Por favor, ingrese todos los campos");
      return;
    }

    //Peticion HTTP
    axios
      .post(`${apiUrl}registro`, {
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        setnombre("");
        setApellido("");
        setEmail("");
        setPaswword("");

        toast.success("Usuario Registrado", {
          icon: "👍",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProductos = async () => {
    try {
      const response = await axios.get<Productos[]>(`${apiUrl}stock`);
      console.log(response.data);

      const lowStockProducts: string[] = [];
      response.data.map((producto) => {
        console.log(producto);
        if (producto.inventario_actual < 5) {
          lowStockProducts.push(producto.nombre_producto);
        }
      });
      if (lowStockProducts.length > 0) {
        scheduleNotification(lowStockProducts.join(", "));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const scheduleNotification = (message: string) => {
    LocalNotifications.schedule({
      notifications: [
        {
          title: "Inventario bajo",
          body: `Los siguientes productos tienen un inventario actual menor a 5: ${message}`,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },

          extra: null,
        },
      ],
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getProductos();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IonIcon icon={personCircleOutline} style={{ fontSize: "100px" }} />
          {/* <img src={Logo} width="100" /> */}
        </div>

        <IonItem className="tex">
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput
            placeholder="Enter text"
            type="text"
            onIonChange={(event) => {
              setnombre(event.detail.value!);
            }}
          />
        </IonItem>

        <IonItem className="tex">
          <IonLabel position="stacked">Apellido</IonLabel>
          <IonInput
            placeholder="Enter text"
            type="text"
            onIonChange={(event) => {
              setApellido(event.detail.value!);
            }}
          />
        </IonItem>

        <IonItem className="tex">
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            placeholder="@hirehoratio.co"
            type="email"
            onIonChange={(event) => {
              setEmail(event.detail.value!);
            }}
          />
        </IonItem>

        <IonItem className="tex">
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            placeholder="Enter text"
            type="password"
            onIonChange={(event) => {
              setPaswword(event.detail.value!);
            }}
          />
        </IonItem>

        <IonButton expand="full" onClick={Registrar}>
          Registrate
          <IonIcon icon={arrowForwardOutline} />
        </IonButton>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonTitle>Ya tienes una cuenta?</IonTitle>
          <IonNavLink routerDirection="forward" component={() => <Login />}>
            <IonButton fill="clear" slot="end" onClick={GoToLogin}>
              Log in
            </IonButton>
          </IonNavLink>
        </IonToolbar>
      </IonFooter>
      <Toaster position="top-center" reverseOrder={false} />
    </IonPage>
  );
};

export default Register;
