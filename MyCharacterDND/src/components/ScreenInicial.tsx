import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePersonajesStore } from "@/store/personajeStore";
import { router, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';

export default function PersonajeScreen(){

    // Conectamos nuestra pantalla al Store para traer los datos y la función de borrar
    const {personajes,eliminarPersonaje,crearPersonaje}= usePersonajesStore();
    // Para mantenerlo básico al inicio, crearemos un personaje aleatorio al presionar el botón
    const CrearPrueba = () => {
        crearPersonaje("NombreAleatorio","ClaseAleatoria","RazaAleatoria");
    };
    const handleEliminarPersonaje=(id:string,nombre:string)=>{
        Alert.alert(
            "Eliminar Personaje",
            `¿Estás seguro de que deseas eliminar a ${nombre}?`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Eliminar", style: "destructive", onPress: () => eliminarPersonaje(id) }
            ]
        );

    };return(

        <SafeAreaView style={estilos.container}>
      {/* Encabezado */}
      <View style={estilos.header}>
        <Text style={estilos.titulo}>Mis Personajes D&D</Text>
        <Text style={estilos.subtitulo}>{personajes.length} Aventureros creados</Text>
      </View>
        {/* Lista de Personajes */}
      {personajes.length === 0 ? (
        <View style={estilos.vacioContainer}>
          <Text style={estilos.vacioTexto}>⚔️ No tienes personajes creados aún.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={estilos.lista}>
          {personajes.map((personaje) => (
            <View key={personaje.id} style={estilos.tarjeta}>
              <TouchableOpacity
              onPress={() => 
              router.push(`/plantilla/${personaje.id}`)}>
                
                <Text style={estilos.nombrePersonaje}>{personaje.nombre}</Text>
                <Text style={estilos.detallesPersonaje}>
                  {personaje.raza} • {personaje.clase} (Nivel {personaje.nivel})
                </Text>
              </TouchableOpacity>
              
              {/* Botón de borrar */}
              <TouchableOpacity 
                style={estilos.botonBorrar} 
                onPress={() => handleEliminarPersonaje(personaje.id, personaje.nombre)}
              >
                <Text style={estilos.botonBorrarTexto}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Botón inferior para añadir (por ahora de prueba) */}
      <View style={estilos.footer}>
        <TouchableOpacity style={estilos.botonAñadir} onPress={CrearPrueba}>
          <Text style={estilos.botonAñadirTexto}>+ Nuevo Personaje</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    )
    
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  header: { padding: 20, backgroundColor: Colors.light.backgroundElement, borderBottomWidth: 1, borderBottomColor: Colors.light.border },
  titulo: { fontSize: 24, fontWeight: 'bold', color: Colors.light.primary },
  subtitulo: { fontSize: 14, color: Colors.light.textSecondary, marginTop: 4 },
  lista: { padding: 16, gap: 12 },
  tarjeta: { 
  backgroundColor: Colors.light.backgroundElement, 
    padding: 16, 
    borderRadius: 8, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 2, elevation: 2
  },
  nombrePersonaje: { fontSize: 18, fontWeight: '600', color: Colors.light.accent },
  detallesPersonaje: { fontSize: 14, color: '#555', marginTop: 2 },
  botonBorrar: { padding: 8 },
  botonBorrarTexto: { fontSize: 18 },
  vacioContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 },
  vacioTexto: { fontSize: 16, color: '#888' },
  footer: { padding: 16, backgroundColor: Colors.light.backgroundElement },
  botonAñadir: { backgroundColor: Colors.light.primary, padding: 16, borderRadius: 8, alignItems: 'center' },
  botonAñadirTexto: { color: Colors.light.primaryForeground, fontSize: 16, fontWeight: '700' }
});





