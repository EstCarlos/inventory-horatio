import { IonButton, IonInput, IonItem, IonLabel } from "@ionic/react";
import React, { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <IonItem>
      <IonLabel position="floating">Buscar</IonLabel>
      <IonInput
        value={query}
        onIonChange={(e) => setQuery(e.detail.value!)}
        placeholder="Ingrese el término de búsqueda"
      />
      <IonButton onClick={handleSearch}>Buscar</IonButton>
    </IonItem>
  );
};

export default SearchBar;
