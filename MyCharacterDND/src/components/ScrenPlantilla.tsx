import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePersonajesStore } from "@/store/personajeStore";
import { personajeDND,DNDBonificadores,DNDPlantilla,Armas } from '@/hooks/tipos';


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

    const infoP=() =>{
        return(
            Object.entries(personaje.plantilla).map(([clave,valor])=>{
                const atributo = clave as keyof DNDPlantilla;
                return(

                    <View key={clave}>
                        <Text>{clave}</Text>
                        <TextInput
                        style={estilos.infoPlantilla}
                        value={String(personaje.plantilla[atributo]?? " ")}
                        onChangeText={(texto)=>setPersonaje({
                            ...personaje,plantilla:{...personaje.plantilla, [atributo]:Number(texto)}})}
                        
                        />
                        
                    </View>
                )
            }

            )
        )
    }
    const bonos =()=>{
        return(
        Object.entries(personaje.bonificadores).map(([clave,valor])=>{
        const atributo = clave as keyof DNDBonificadores;

            return (
        <View key={clave}>
            <Text>{clave}</Text>

            <TextInput
                style={estilos.bonificadores}
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
    const armas =()=> {
        return(
            <View style={estilos.contenedorArmas}>

                {personaje.armas.map((arma, index) => (
                    
                
                    <View style={estilos.contenedorArmas} key ={index}>
                    <TextInput
                    style={estilos.infoArma}
                    
                    value={arma.NombreArma}
                    onChangeText={(texto) =>
                    setPersonaje({
                        ...personaje,
                        armas: personaje.armas.map((a, i) =>
                        i === index
                            ? { ...a, NombreArma: texto }
                            : a
                        )
                    })
                    }
                />
                 {/*Bonificadores---------------------------------------------------------- */}

                <TextInput 
                style={estilos.infoArma}
                value={String(arma.Bonificador)}
                onChangeText={(texto)=>setPersonaje({
                    ...personaje,armas:personaje.armas.map((a,i)=>
                    i===index
                        ?{...a,Bonificador:Number(texto)}:a
                    )
                })}
                />
                {/*DAÑO---------------------------------------------------------- */}
                <TextInput
                    style={estilos.infoArma}
                    
                    value={arma.Daño}
                    onChangeText={(texto) =>
                    setPersonaje({
                        ...personaje,
                        armas: personaje.armas.map((a, i) =>
                        i === index
                            ? { ...a, Daño: texto }
                            : a
                        )
                    })
                    }
                />
                {/*cantidad---------------------------------------------------------- */}
                <TextInput 
                style={estilos.infoArma}
                value={String(arma.Cantidad)}
                onChangeText={(texto)=>setPersonaje({
                    ...personaje,armas:personaje.armas.map((a,i)=>
                    i===index
                        ?{...a,Cantidad:Number(texto)}:a
                    )
                })}
                />
                </View>
                
                
                )
                
                )}
            </View>
        )
    }
    {/*Agregar Arma---------------------------------------------------------- */}
    const agregarArma = () => {
    const armaVacia: Armas = {
        NombreArma: "espada",
        Bonificador: 0,
        Daño:'1d6',
        Cantidad:0
    };
    
    setPersonaje({
            ...personaje,
            armas: [...personaje.armas, armaVacia]
        });
    };
    return(
        
        <SafeAreaView style={estilos.contenedorG}>
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
                    onChangeText={(texto)=>setPersonaje({...personaje,transfondo:texto})}
                    />

                </View>
            
            <ScrollView style={estilos.contenedorb}>
                {/* se llama a la funcion para ilustar y poder editar los campos bonificacion */}
                
                <View style = {estilos.bonificacionC}>
                    
                
                    {bonos()}
                    
                </View>
                {/*plantillaC donde esta clase de armadura e iniciativa */}
                <View style={estilos.plantilaC}>
                    {infoP()}
                    
                    
                </View>
                {/*armas----------------------------------------------------*/}
                <View style={estilos.armasC}>
                    {armas()}
                    <TouchableOpacity style={estilos.botonguardar} onPress={agregarArma}>
                    <Text>agregar arma</Text>
                    </TouchableOpacity>
                    
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
    contenedorb:{
        flex:1
    },
    contenedorG:{
        flex: 1,
    },
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
    bonificacionC:{
        backgroundColor: '#c6baba'
    },
    
    infoPlantilla:{backgroundColor: '#d0c1c1', padding: 16, borderRadius: 8, alignItems: 'center'

    },
    plantilaC:{
        backgroundColor:'#d3c5c5'
    },
    armasC:{
        backgroundColor:'#d3c5c5'
    },
    footer:{ padding: 16, backgroundColor: '#fff' 

    },
    botonguardar:{backgroundColor: '#800000', padding: 16, borderRadius: 8, alignItems: 'center'},

    contenedorArmas:{
        backgroundColor:'#978c8c',borderRadius: 8, padding:16
    },
    infoArma:{
        backgroundColor:'#d2c9c9',borderRadius: 8
    }
    
});