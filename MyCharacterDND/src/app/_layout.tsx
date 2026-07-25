import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { crearTablas } from '@/db/database'; // ajustá la ruta según donde guardaste tu archivo

export default function RootLayout() {
    useEffect(() => {
        crearTablas();
    }, []);

    return (
        <SafeAreaProvider>
            <Stack>
                {/* acá Expo Router va a mostrar tus pantallas automáticamente */}
            </Stack>
        </SafeAreaProvider>
    );
}