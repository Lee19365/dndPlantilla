import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView,TouchableOpacity } from 'react-native';

import { usePersonajesStore } from "@/store/personajeStore";
import { personajeDND,DNDBonificadores } from '@/hooks/tipos';


interface ScreenPlantillaProps {
    id: string;
}

export default function ScreenPlantilla ({ id }: ScreenPlantillaProps){
    
    //traemos los datos
    const {personajes,actualizarPersonaje} = usePersonajesStore();
    const encontrarPersonaje = personajes.find(personaje => personaje.id === id);  //traemos el personaje que coincida con el id recibido por props
    const [personaje, setPersonaje] = useState <personajeDND | null> (encontrarPersonaje ?? null);
    //si no encuentra el personaje mostramos un mensaje de error
    if (!personaje) {
        return (
            <View style={estilos.box}>
                <Text> personaje no encontrado</Text>
            </View>

        )
    
    }
    const actualizar= ()=>{ 
        actualizarPersonaje(personaje);
    };


    const bonos =()=>{
        return(
        Object.entries(personaje.bonificadores).map(([clave,valor])=>{
        const atributo = clave as keyof DNDBonificadores;

            return (
        <View key={clave}>
            <Text>{clave}</Text>

            <TextInput
                value={String(personaje.bonificadores[atributo] ?? "")}
                onChangeText={(texto) =>
                    setPersonaje({
                        ...personaje,
                        bonificadores: {
                            ...personaje.bonificadores,
                            [atributo]: Number(texto),
                        },
                    })
                }
            />
        </View>
    );

        })
    )}
    
    
    return(
        
        <SafeAreaView>
            {/*Encabezado*/}
            <View style={estilos.header}>
            {/*le decimos que sera una caja de texto editable */}
            <TextInput
                style={estilos.infoPrincipal}
                value={personaje.nombre}
                onChangeText={(texto) =>setPersonaje({...personaje,nombre: texto})}/>

                <TextInput 
                    style={estilos.infoPrincipal}
                    value={String(personaje.nivel)}
                    onChangeText={(texto)=>setPersonaje ({...personaje,nivel:Number(texto)})}
                    />
                <TextInput
                    style ={estilos.infoPrincipal}
                    value={personaje.raza}
                    onChangeText={(texto)=> setPersonaje({...personaje, raza:texto})}
                    />
                <TextInput 
                    style = {estilos.infoPrincipal}
                    value={personaje.transfondo ?? " "}
                    onChangeText={(text)=>setPersonaje({...personaje,transfondo:text})}
                    />

                </View>
            
            <ScrollView>
                
                <View>
                    
                
                    {bonos()}
                    
                    
                </View>
            </ScrollView>
            {/* Botón inferior para guardar */}
                <View style={estilos.footer}>
                    <TouchableOpacity style={estilos.botonguardar} onPress={actualizar}>
                    <Text>Guardar datos</Text>
                    </TouchableOpacity>
                </View>

        </SafeAreaView>
    )
}


const estilos = StyleSheet.create({
    box: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingTop: 100},

    header: { padding: 20, 
        backgroundColor: '#fff', 
        borderBottomWidth: 1,
        borderBottomColor: '#eee' },
    infoPrincipal: { fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 5 },
    bonificadores :{backgroundColor: '#8b7373', padding: 16, borderRadius: 8, alignItems: 'center'
    
        

    },
    footer:{ padding: 16, backgroundColor: '#fff' 

    },
    botonguardar:{backgroundColor: '#800000', padding: 16, borderRadius: 8, alignItems: 'center'}
    
});