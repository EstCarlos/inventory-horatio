import {
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import "./Home.css";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { LocalNotifications } from "@capacitor/local-notifications";
import axios from "axios";
import { Plugins } from "@capacitor/core";

type Productos = {
  id: string;
  codigo_producto: string;
  nombre_producto: string;
  nombre_suplidor: number;
  nombre_local: string;
  inventario_actual: number;
};

class Home extends React.Component {
  state = {
    stringEncoded: "",
    encodeResponse: "Hello World",
    dataEncode: "",
  };
  handleChange = (e: any) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
    console.log(this.state);
  };
  render() {
    const dataToScan = async () => {
      const data = await BarcodeScanner.scan();
      alert(JSON.stringify(data));
      this.setState({ stringEncoded: data.text });
    };
    const createCode = () => {
      BarcodeScanner.encode(
        BarcodeScanner.Encode.TEXT_TYPE,
        this.state.encodeResponse
      ).then(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log("Error : " + error);
        }
      );
    };

    //TODO: AGREGAR NOTIFICACIONES LOCALES PARA LAS ALERTAS DEL STOCK
    const { Storage } = Plugins;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ionic QR/Barcode Scanner Example</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonButton>Programar notificación</IonButton>
          <strong>Scan Content</strong>
          <IonButton color="danger" expand="block" onClick={() => dataToScan()}>
            Scan Data
          </IonButton>
          <strong>Generate QR code</strong>
          <IonItem>
            <IonInput
              name="dataEncode"
              value={this.state.encodeResponse}
              onIonChange={this.handleChange}
              clearInput
            ></IonInput>
          </IonItem>
          <IonButton color="primary" expand="block" onClick={createCode}>
            Generate QR
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }
}
export default Home;
