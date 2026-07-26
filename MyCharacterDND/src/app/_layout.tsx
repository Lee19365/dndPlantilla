import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { crearTablas } from '@/db/database'; // ajustá la ruta según donde guardaste tu archivo
import { usePersonajesStore } from '@/store/personajeStore';

    
export default function RootLayout() {
    const cargarDesdeDB = usePersonajesStore((state) => state.cargarDesdeDB);
    useEffect(() => {
        console.log('🟡 Creando tablas...');
        crearTablas();
        console.log('🟡 Cargando desde DB...');
        cargarDesdeDB();

    }, []);

    return (
        <SafeAreaProvider>
            <Stack>
                {/* acá Expo Router va a mostrar tus pantallas automáticamente */}
            </Stack>
        </SafeAreaProvider>
    );
}