import { useEffect, useState, useCallback } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonSearchbar,
  IonItem,
  IonLabel,
  IonInput,
  IonCard,
  IonCardSubtitle,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonRippleEffect,
  IonModal,
  IonButton,
  IonList,
  IonNote,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  useIonRouter,
} from "@ionic/react";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import { apiUrl } from "../config";

type Productos = {
  id: string;
  codigo_producto: string;
  nombre_producto: string;
  id_suplidor: number;
  id_plaza: number;
  inventario_actual: number;
};

const Salidas: React.FC = () => {
  //TODO: Aqui usamos la funcion para tener la fecha en formato (dd-mm-yyyy) (SALIDAS) ✅
  const [date, setDate] = useState(new Date());
  const formatDate = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

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

  //TODO: PETICION  HTTP PARA EL ENDPOINT DE LOS PRODUCTOS (SALIDAS) ✅
  const [productos, setProductos] = useState<Productos[]>([]);
  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = async () => {
    try {
      const response = await axios.get<Productos[]>(`${apiUrl}productos`);
      setProductos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //TODO: AQUI ESTAMOS IMPLEMENTANDO LA BUSQUEDA DE LOS PRODUCTOS (SALIDAS) ✅
  const [, setBusqueda] = useState("");
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

  //TODO: PARA ABRIR EL MODAL DEL PRODUCTO SELECCIONADO Y EJECUTAR PROCEDIMIENTO (SALIDAS)✅
  const [cantidad, setCantidad] = useState<number>(0);

  const [selectedProduct, setSelectedProduct] = useState<Productos>();
  const [showModal, setShowModal] = useState(false);

  const openModal = (product: Productos) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const Confirm = () => {
    //FIXME: HAY QUE ARREGLAR LAS ENTRADAS DE PRECIO UNITARIO Y EL PRECIO TOTAL (SALIDAS) ⚠️

    axios
      .post(`${apiUrl}execsalidas`, {
        //AQUI VAN LOS VALORE
        codigo_producto: selectedProduct?.codigo_producto,
        fecha: formatDate(date),
        id_suplidor: selectedProduct?.id_suplidor,
        id_plaza: selectedProduct?.id_plaza,
        producto: selectedProduct?.nombre_producto,
        cantidad: cantidad,
        precio_unitario: 1,
        precio_total: 1,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    toast.success("Guardado", {
      icon: "👍",
    });
    setShowModal(false);
  };

  //TODO: REFRESCAR LA PAGINA (SALIDAS) ✅
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      getProductos();
      event.detail.complete();
    }, 2000);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Salidas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonSearchbar onIonChange={buscarProductos} debounce={1000} />
          </IonToolbar>
        </IonHeader>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {productos.map((produc) => (
          <IonCard
            className="ion-activatable ripple-parent rectangle"
            onClick={() => openModal(produc)}
            key={produc.id}
          >
            <IonRippleEffect></IonRippleEffect>
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

        {/* Esto es parte cuando se abre el modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          {selectedProduct && (
            <>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton onClick={() => setShowModal(false)}>
                      Cancel
                    </IonButton>
                  </IonButtons>
                  <IonTitle>{selectedProduct.nombre_producto}</IonTitle>
                  <IonButtons slot="end">
                    <IonButton strong={true} onClick={Confirm}>
                      Confirm
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>

              <IonContent>
                <IonList>
                  <IonItem>
                    <IonLabel>Código:</IonLabel>
                    <IonNote slot="end">
                      {selectedProduct.codigo_producto}
                    </IonNote>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Existencia:</IonLabel>
                    <IonNote slot="end">
                      {selectedProduct.inventario_actual}
                    </IonNote>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating"> Cantidad</IonLabel>
                    <IonInput
                      placeholder="A disminuir"
                      onIonChange={(event) => {
                        const cantidad = Number(event.detail.value);
                        setCantidad(cantidad);
                      }}
                    />
                  </IonItem>
                </IonList>
              </IonContent>
            </>
          )}
        </IonModal>
      </IonContent>
      <Toaster position="top-center" reverseOrder={false} />
    </IonPage>
  );
};

export default Salidas;
