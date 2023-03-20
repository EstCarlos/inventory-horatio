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

const Register: React.FC = () => {
  const [nombre, setnombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPaswword] = useState("");
  const [inputError, setInputError] = useState(false);

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
      .post("http://localhost:4000/registro", {
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
        // Guardar el token en localStorage
        localStorage.setItem("token", response.data.token);
        toast.success("Usuario Registrado", {
          icon: "👍",
        });
        navigation.push("/app", "forward", "replace");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
