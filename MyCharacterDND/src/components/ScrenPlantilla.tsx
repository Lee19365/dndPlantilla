import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';

import { usePersonajesStore } from "@/store/personajeStore";
import { useRouter } from 'expo-router';

interface ScreenPlantillaProps {
    id: string;
}

export default function ScreenPlantilla ({ id }: ScreenPlantillaProps){

    //traemos los datos
    const {personajes} = usePersonajesStore();
    const encontrarPersonaje = personajes.find(personaje => personaje.id === id);
    if (!encontrarPersonaje) {
        return (
            <View style={estilos.box}>
                <Text> personaje no encontrado</Text>
            </View>

        )
    }
}


const estilos = StyleSheet.create({
    box: {
        flex: 1,}
});