// personajesStore.ts
import { create } from 'zustand';
import { personajeDND } from '../hooks/tipos'; // Importamos tu interfaz

// Definimos qué datos y qué funciones va a tener nuestro Store
interface PersonajesState {
  personajes: personajeDND[];
  crearPersonaje: (nombre: string, clase: string, raza: string) => void;
  eliminarPersonaje: (id: string) => void;
}

export const usePersonajesStore = create<PersonajesState>((set) => ({
  // 1. Estado inicial: empezamos con dos personajes de prueba
  personajes: [
    { id: '1', nombre: 'Grog', clase: 'Bárbaro', raza: 'Goliath', nivel: 1, bonificadores: {}, plantilla: {}, armas: [] },
    { id: '2', nombre: 'Jester', clase: 'Clérigo', raza: 'Tiefling', nivel: 3, bonificadores: {}, plantilla: {}, armas: [] },
  ],

  // 2. Función para crear uno nuevo
  crearPersonaje: (nombre, clase, raza) => set((state) => {
    const nuevo: personajeDND = {
      id: Date.now().toString(), // Genera un ID único usando el tiempo actual
      nombre,
      clase,
      raza,
      nivel: 1, // Todos empiezan en nivel 1 por defecto
      bonificadores: {},
      plantilla: {},
      armas: [],
    };
    return { personajes: [...state.personajes, nuevo] }; // Agrega el nuevo a la lista existente
  }),

  // 3. Función para eliminar
  eliminarPersonaje: (id) => set((state) => ({
    personajes: state.personajes.filter((p) => p.id !== id), // Filtra y quita el del ID indicado
  })),
  
}));
