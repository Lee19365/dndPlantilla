import ScreenPlantilla from "@/components/ScrenPlantilla";

import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';


export default function PlantillaPage() {
  const { id } = useLocalSearchParams();
  //verificamos si id es un array si es un array mandamos solo el primer elemento
  if (Array.isArray(id)) {
    return <ScreenPlantilla id={id[0]} />;
  } else {
    
    return <ScreenPlantilla id={id} />;
  }
  
  
}