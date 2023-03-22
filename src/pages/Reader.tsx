import { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonList,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonLabel,
  useIonRouter,
  IonItem,
  IonInput,
  IonSearchbar,
} from "@ionic/react";
import axios from "axios";

type Entrada = {
  Fecha: string;
  Codigo_producto: string;
  Producto: string;
  precio: number;
  suplidor: string;
  cantidad: number;
  encargado_entrega: string;
  quien_registra: string;
  plaza: string;
  costo_por_unidad: number;
};

type Productos = {
  id: string;
  codigo_producto: string;
  nombre_producto: string;
  id_suplidor: number;
  id_plaza: string;
  inventario_actual: number;
};

const Reader: React.FC = () => {
  const navigation = useIonRouter();

  useEffect(() => {
    //Veificar si hay un token en el Localstorage
    const token = localStorage.getItem("token");
    if (!token) {
      //verificar a la pagina principal si hay un token
      navigation.push("/register", "forward", "replace");
    }
  }, []);

  const [productos, setProductos] = useState<Productos[]>([]);

  const getProductos = async () => {
    try {
      const response = await axios.get<Productos[]>(
        "http://localhost:4000/productos"
      );
      setProductos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  const [busqueda, setBusqueda] = useState("");
  const buscarProductos = (event: CustomEvent) => {
    const texto = event.detail.value;
    setBusqueda(texto);

    if (texto.trim() === "") {
      // Si no hay texto de búsqueda, muestra todos los productos
      getProductos();
    } else {
      // Filtra los productos según el texto de búsqueda
      const productosFiltrados = productos.filter((producto) =>
        producto.nombre_producto.toLowerCase().includes(texto.toLowerCase())
      );
      setProductos(productosFiltrados);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Reader</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar onIonChange={buscarProductos} debounce={1000} />
        {/* <IonList>
          {results.map((result) => (
            <IonItem>{result}</IonItem>
          ))}
        </IonList> */}
        {productos.map((produc) => (
          <IonCard key={produc.id}>
            <IonCardHeader>
              <IonCardSubtitle>
                Codigo: {produc.codigo_producto}
              </IonCardSubtitle>
              <IonCardTitle>{produc.nombre_producto}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Existencia: {produc.inventario_actual}
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Reader;
