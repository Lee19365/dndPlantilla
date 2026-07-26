// personajesStore.ts
import { create } from 'zustand';
import { DNDBonificadores, DNDPlantilla, personajeDND,Armas } from '../hooks/tipos'; // Importamos tu interfaz
import ScreenPlantilla from '@/components/ScrenPlantilla';
import { guardarValor, guardarArmas, cargarPersonajes, eliminarPersonajeDB } from '../db/database';

// Definimos qué datos y qué funciones va a tener nuestro Store
interface PersonajesState {
  personajes: personajeDND[];
  crearPersonaje: (nombre: string, clase: string, raza: string) => void;
  eliminarPersonaje: (id: string) => void;
  actualizarPersonaje: (personajeActualizado: personajeDND) => void;
  cargarDesdeDB: () => void;   
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
  personajes: [], // ya no arrancamos con datos de prueba, se cargan desde SQLite

  cargarDesdeDB: () => {
    const personajesGuardados = cargarPersonajes();
    set({ personajes: personajesGuardados });
  },

  crearPersonaje: (nombre, clase, raza) => set((state) => {
    const nuevo: personajeDND = {
      id: Date.now().toString(),
      nombre,
      clase,
      raza,
      nivel: 1,
      bonificadores: BonificadoresIniciales,
      plantilla: infoDND,
      armas: [],
    };

    guardarValor(nuevo);
    guardarArmas(nuevo);

    return { personajes: [...state.personajes, nuevo] };
  }),

  actualizarPersonaje: (personajeActualizado) => set((state) => {
    guardarValor(personajeActualizado);
    guardarArmas(personajeActualizado);

    return {
      personajes: state.personajes.map((p) =>
        p.id === personajeActualizado.id ? personajeActualizado : p
      ),
    };
  }),

  eliminarPersonaje: (id) => set((state) => {
    eliminarPersonajeDB(id);
    return { personajes: state.personajes.filter((p) => p.id !== id) };
  }),
}));