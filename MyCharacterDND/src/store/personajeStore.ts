// personajesStore.ts
import { create } from 'zustand';
import { DNDBonificadores, DNDPlantilla, personajeDND,Armas } from '../hooks/tipos'; // Importamos tu interfaz
import ScreenPlantilla from '@/components/ScrenPlantilla';

// Definimos qué datos y qué funciones va a tener nuestro Store
interface PersonajesState {
  personajes: personajeDND[];
  crearPersonaje: (nombre: string, clase: string, raza: string) => void;
  eliminarPersonaje: (id: string) => void;
  actualizarPersonaje: (personajeActualizado: personajeDND) => void;
  
}

export const BonificadoresIniciales: DNDBonificadores={
      Fuerza:0,
    
    Destreza:0,
    Constitucion:0,
    Inteligencia:0,
    Sabiduria:0,
    Carisma:0,
    //----------------habilidades -----------------------------------------
    Acrobacias:0,
    Atletismo:0,
    Arcano:0,
    Engaño:0,
    Historia:0,
    Interpretacion:0,
    Intimidacion:0,
    Investigacion:0,
    Medicina:0,
    Naturaleza:0,
    Percepcion:0,
    Perspicacia:0,
    Persuasion:0,
    Religion:0,
    Sigilo:0,
    Supervivencia:0,
    TconAnimales:0,
    //--------------tiradas de salvacion--------------------------------------
    TSFuerza:0,
    TSDestreza:0,
    TSConstitucion:0,
    TSInteligencia:0,
    TSSabiduria:0,
    TSCarisma:0,
    //-----------------otros-----------------------------------------------
    BPC:0, //bonificacion por experiencia 
    };
export const infoDND: DNDPlantilla={
  ClaseArmadura:0,
    Iniciativa:0,
    Velocidad:0,
    PuntosGolpe:0,
    DadosGolpe:'1d6',
    PuntosGolpeTemp:0
    
}
export const usePersonajesStore = create<PersonajesState>((set) => ({
  // 1. Estado inicial: empezamos con dos personajes de prueba
  personajes: [
    { id: '1', nombre: 'Grog', clase: 'Bárbaro', raza: 'Goliath', nivel: 1, bonificadores: BonificadoresIniciales, plantilla: infoDND, armas: [] },
    { id: '2', nombre: 'Jester', clase: 'Clérigo', raza: 'Tiefling', nivel: 3, bonificadores: BonificadoresIniciales, plantilla: infoDND, armas: [] },
  ],
  
  // 2. Función para crear uno nuevo
  crearPersonaje: (nombre, clase, raza) => set((state) => {
    
    const nuevo: personajeDND = {
      id: Date.now().toString(), // Genera un ID único usando el tiempo actual
      nombre,
      clase,
      raza,
      nivel: 1, // Todos empiezan en nivel 1 por defecto
      bonificadores: BonificadoresIniciales,
      plantilla: infoDND,
      armas: [],

      
    };

    
    return { personajes: [...state.personajes, nuevo] }; // Agrega el nuevo a la lista existente
  }),
  
  

  actualizarPersonaje: (personajeActualizado) =>
  set((state) => ({
    personajes: state.personajes.map((p) =>
      p.id === personajeActualizado.id ? personajeActualizado : p
    ),
  })),
  // 3. Función para eliminar
  eliminarPersonaje: (id) => set((state) => ({
    personajes: state.personajes.filter((p) => p.id !== id), // Filtra y quita el del ID indicado
  })),

  
  
}));
