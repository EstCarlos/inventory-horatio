import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  useIonRouter,
  IonIcon,
} from "@ionic/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { arrowBackCircleOutline } from "ionicons/icons";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPaswword] = useState("");
  const [inputError, setInputError] = useState(false);

  const navigation = useIonRouter();
  const history = useHistory();

  useEffect(() => {
    //Veificar si hay un token en el Localstorage
    const token = localStorage.getItem("token");
    if (token) {
      //verificar a la pagina principal si hay un token
      navigation.push("/app/reader", "forward", "replace");
    }
  }, []);

  const Logear = () => {
    if (!email || !password) {
      setInputError(true);
      toast.error("Por favor, ingrese todos los campos");
      return;
    }

    //Peticion HTTP
    axios
      .post("http://localhost:4000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // Obtener el nombre y apellido de la persona logueada
        const { nombre, apellido } = response.data;

        setEmail("");
        setPaswword("");
        // Guardar el token en localStorage
        localStorage.setItem("token", response.data.token);

        toast.success("Usuario Logeado", {
          icon: "👍",
        });

        history.push({
          pathname: "/app/entradas",
          state: { nombre, apellido },
        });

        // navigation.push("/app/reader", "forward", "replace");
      })
      .catch((error) => {
        // console.log(error.response.data.mensaje);
        toast.error(error.response.data.mensaje);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton>Atras</IonBackButton>
          </IonButtons>
          <IonButton>
            <IonIcon icon={arrowBackCircleOutline} />
          </IonButton>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>
          <b>Login</b>
        </h1>
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

        <IonButton expand="block" onClick={Logear}>
          Start
        </IonButton>
      </IonContent>
      <Toaster position="top-center" reverseOrder={false} />
    </IonPage>
  );
};

export default Login;
