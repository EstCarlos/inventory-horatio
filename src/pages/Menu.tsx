import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSplitPane,
  IonMenu,
  IonRouterOutlet,
  IonContent,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonButton,
} from "@ionic/react";

import {
  homeOutline,
  newspaperOutline,
  logOutOutline,
  navigateCircle,
  barChart,
} from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import Entradas from "./Entradas";
import Reader from "./Reader";
import Salidas from "./Salidas";
const Menu: React.FC = () => {
  const paths = [
    { name: "Reader", url: "/app/reader", icon: barChart },
    { name: "Entradas", url: "/app/entradas", icon: homeOutline },
    { name: "Salidas", url: "/app/salidas", icon: navigateCircle },
  ];

  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {paths.map((item, index) => (
              <IonMenuToggle key={index}>
                <IonItem routerLink={item.url} routerDirection="none">
                  <IonIcon icon={item.icon} slot="start" />
                  {item.name}
                </IonItem>
              </IonMenuToggle>
            ))}
            <IonButton routerLink="/" routerDirection="back" expand="full">
              <IonIcon
                icon={logOutOutline}
                slot="start"
                className="ion-padding"
              />
              Cerrar sesión
            </IonButton>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="main">
          <Route exact path="/app/entradas" component={Entradas} />
          <Route exact path="/app/salidas" component={Salidas} />
          <Route exact path="/app/reader" component={Reader} />
          <Route>
            <Redirect to="/app/reader" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
