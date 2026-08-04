import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { usePersonajesStore } from '@/store/personajeStore';
import { personajeDND, DNDBonificadores, DNDPlantilla, Armas } from '@/hooks/tipos';

interface ScreenPlantillaProps {
  id: string;
}

export default function ScreenPlantilla({ id }: ScreenPlantillaProps) {
  const { personajes, actualizarPersonaje } = usePersonajesStore();
  const encontrarPersonaje = personajes.find((personaje) => personaje.id === id);
  const [personaje, setPersonaje] = useState<personajeDND | null>(encontrarPersonaje ?? null);
  const [activeTab, setActiveTab] = useState<'Atributos' | 'Combate' | 'Habilidades' | 'Diario'>('Atributos');
  const nameInputRef = useRef<TextInput | null>(null);

  if (!personaje) {
    return (
      <View style={estilos.box}>
        <Text style={estilos.emptyText}>personaje no encontrado</Text>
      </View>
    );
  }

  const actualizar = () => {
    actualizarPersonaje(personaje);
  };

  const updateBonificador = (atributo: keyof DNDBonificadores, texto: string) => {
    setPersonaje({
      ...personaje,
      bonificadores: {
        ...personaje.bonificadores,
        [atributo]: Number(texto),
      },
    });
  };

  const updatePlantilla = (atributo: keyof DNDPlantilla, texto: string) => {
    setPersonaje({
      ...personaje,
      plantilla: {
        ...personaje.plantilla,
        [atributo]: Number(texto),
      },
    });
  };

  const infoP = () => {
    const campos = [
      { key: 'ClaseArmadura' as const, label: 'CA' },
      { key: 'Iniciativa' as const, label: 'Iniciativa' },
      { key: 'Velocidad' as const, label: 'Velocidad' },
      { key: 'PuntosGolpe' as const, label: 'PG' },
      { key: 'PuntosGolpeTemp' as const, label: 'PG Temp' },
      { key: 'DadosGolpe' as const, label: 'Dados' },
    ];

    return (
      <View style={estilos.combatGrid}>
        {campos.map((campo) => (
          <View key={campo.key} style={estilos.combatCard}>
            <Text style={estilos.cardLabel}>{campo.label}</Text>
            <TextInput
              style={estilos.textInputInline}
              value={String(personaje.plantilla[campo.key] ?? '')}
              onChangeText={(texto) => updatePlantilla(campo.key, texto)}
              keyboardType={campo.key === 'DadosGolpe' ? 'default' : 'numeric'}
            />
          </View>
        ))}
      </View>
    );
  };

  const bonos = () => {
    const habilidades = [
      ['Acrobacias', 'Acrobacias'],
      ['Atletismo', 'Atletismo'],
      ['Historia', 'Historia'],
      ['Perspicacia', 'Perspicacia'],
      ['Persuasion', 'Persuasión'],
      ['Sigilo', 'Sigilo'],
      ['Supervivencia', 'Supervivencia'],
      ['Investigacion', 'Investigación'],
    ] as const;

    return (
      <View style={estilos.skillsList}>
        {habilidades.map(([key, label]) => (
          <View key={key} style={estilos.skillRow}>
            <Text style={estilos.skillLabel}>{label}</Text>
            <TextInput
              style={estilos.skillInput}
              value={String(personaje.bonificadores[key as keyof DNDBonificadores] ?? '')}
              onChangeText={(texto) => updateBonificador(key as keyof DNDBonificadores, texto)}
              keyboardType="numeric"
            />
          </View>
        ))}
      </View>
    );
  };

  const armas = () => {
    return (
      <View style={estilos.weaponList}>
        {personaje.armas.map((arma, index) => (
          <View style={estilos.weaponCard} key={`${arma.NombreArma ?? 'arma'}-${index}`}>
            <TextInput
              style={estilos.weaponInput}
              value={arma.NombreArma ?? ''}
              onChangeText={(texto) =>
                setPersonaje({
                 ...personaje,
                 armas: personaje.armas.map((a, i) => (i === index ? { ...a, NombreArma: texto } : a)),
                })
              }
              placeholder="Arma"
            />
            <TextInput
              style={estilos.weaponInput}
              value={String(arma.Bonificador ?? '')}
              onChangeText={(texto) =>
                setPersonaje({
                 ...personaje,
                 armas: personaje.armas.map((a, i) => (i === index ? { ...a, Bonificador: Number(texto) } : a)),
                })
              }
              keyboardType="numeric"
              placeholder="Bonif."
            />
            <TextInput
              style={estilos.weaponInput}
              value={arma.Daño ?? ''}
              onChangeText={(texto) =>
                setPersonaje({
                 ...personaje,
                 armas: personaje.armas.map((a, i) => (i === index ? { ...a, Daño: texto } : a)),
                })
              }
              placeholder="Daño"
            />
            <TextInput
              style={estilos.weaponInput}
              value={String(arma.Cantidad ?? '')}
              onChangeText={(texto) =>
                setPersonaje({
                 ...personaje,
                 armas: personaje.armas.map((a, i) => (i === index ? { ...a, Cantidad: Number(texto) } : a)),
                })
              }
              keyboardType="numeric"
              placeholder="Cant."
            />
          </View>
        ))}
      </View>
    );
  };

  const agregarArma = () => {
    const armaVacia: Armas = {
      NombreArma: 'Espada',
      Bonificador: 0,
      Daño: '1d6',
      Cantidad: 1,
    };

    setPersonaje({
      ...personaje,
      armas: [...personaje.armas, armaVacia],
    });
  };

  const tabs = ['Atributos', 'Combate', 'Habilidades', 'Diario'] as const;

  const renderPrimaryAttributes = () => {
    const atributos = [
      { key: 'Fuerza' as const, label: 'FUE', value: personaje.bonificadores.Fuerza ?? 0 },
      { key: 'Destreza' as const, label: 'DES', value: personaje.bonificadores.Destreza ?? 0 },
      { key: 'Constitucion' as const, label: 'CON', value: personaje.bonificadores.Constitucion ?? 0 },
      { key: 'Inteligencia' as const, label: 'INT', value: personaje.bonificadores.Inteligencia ?? 0 },
      { key: 'Sabiduria' as const, label: 'SAB', value: personaje.bonificadores.Sabiduria ?? 0 },
      { key: 'Carisma' as const, label: 'CAR', value: personaje.bonificadores.Carisma ?? 0 },
    ];

    return (
      <View style={estilos.attributesGrid}>
        {atributos.map((atributo) => (
          <View key={atributo.key} style={estilos.attributeCard}>
            <Text style={estilos.cardLabel}>{atributo.label}</Text>
            <TextInput
              style={estilos.attributeValue}
              value={String(atributo.value)}
              onChangeText={(texto) => updateBonificador(atributo.key, texto)}
              keyboardType="numeric"
            />
            <Text style={estilos.attributeModifier}>Mod. {atributo.value}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderInfoSecondary = () => {
    return (
      <View style={estilos.infoGrid}>
        <View style={estilos.infoCard}>
          <Text style={estilos.cardLabel}>Trasfondo</Text>
          <TextInput
            style={estilos.infoTextInput}
            value={personaje.transfondo ?? ''}
            onChangeText={(texto) => setPersonaje({ ...personaje, transfondo: texto })}
            placeholder="Trasfondo"
          />
        </View>
        <View style={estilos.infoCard}>
          <Text style={estilos.cardLabel}>Alineación</Text>
          <Text style={estilos.infoValue}>Sin definir</Text>
        </View>
        <View style={estilos.infoCard}>
          <Text style={estilos.cardLabel}>Nivel</Text>
          <TextInput
            style={estilos.infoTextInput}
            value={String(personaje.nivel ?? 1)}
            onChangeText={(texto) => setPersonaje({ ...personaje, nivel: Number(texto) })}
            keyboardType="numeric"
          />
        </View>
        <View style={estilos.infoCard}>
          <Text style={estilos.cardLabel}>Experiencia</Text>
          <Text style={estilos.infoValue}>{personaje.bonificadores.BPC ?? 0} XP</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={estilos.contenedorG}>
      <ScrollView contentContainerStyle={estilos.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={estilos.header}>
          <View style={estilos.headerTop}>
            <TouchableOpacity style={estilos.iconButton} onPress={() => router.back()}>
              <Text style={estilos.iconButtonText}>←</Text>
            </TouchableOpacity>

            <TextInput
              ref={nameInputRef}
              style={estilos.infoPrincipal}
              value={personaje.nombre}
              onChangeText={(texto) => setPersonaje({ ...personaje, nombre: texto })}
              textAlign="center"
            />

            <TouchableOpacity style={estilos.iconButton} onPress={() => nameInputRef.current?.focus()}>
              <Text style={estilos.iconButtonText}>✎</Text>
            </TouchableOpacity>
          </View>

          <View style={estilos.metaRow}>
            <Text style={estilos.metaText}>{personaje.clase}</Text>
            <Text style={estilos.metaDivider}>•</Text>
            <Text style={estilos.metaText}>{personaje.raza}</Text>
            <Text style={estilos.metaDivider}>•</Text>
            <Text style={estilos.metaText}>Nivel {personaje.nivel}</Text>
          </View>
        </View>

        <View style={estilos.tabRow}>
          {tabs.map((tab) => {
            const active = tab === activeTab;
            return (
              <TouchableOpacity key={tab} style={estilos.tabButton} onPress={() => setActiveTab(tab)}>
                <Text style={[estilos.tabText, active && estilos.tabTextActive]}>{tab}</Text>
                {active ? <View style={estilos.activeTabLine} /> : null}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={estilos.inspirationCard}>
          <Text style={estilos.inspirationLabel}>Inspiración</Text>
          <Text style={estilos.inspirationValue}>Bono +{personaje.bonificadores.BPC ?? 0}</Text>
        </View>

        <View style={estilos.sectionCard}>
          <Text style={estilos.sectionTitle}>ATRIBUTOS</Text>
          {renderPrimaryAttributes()}
        </View>

        <View style={estilos.divider}>
          <View style={estilos.dividerLine} />
          <Text style={estilos.dividerIcon}>⚔</Text>
          <View style={estilos.dividerLine} />
        </View>

        <View style={estilos.sectionCard}>
          <Text style={estilos.sectionTitle}>INFORMACIÓN</Text>
          {renderInfoSecondary()}
        </View>

        <View style={estilos.sectionCard}>
          <Text style={estilos.sectionTitle}>HABILIDADES</Text>
          {bonos()}
        </View>

        <View style={estilos.sectionCard}>
          <Text style={estilos.sectionTitle}>COMBATE</Text>
          {infoP()}
          {armas()}
          <TouchableOpacity style={estilos.botonguardar} onPress={agregarArma}>
            <Text style={estilos.textoBotonGuardar}>Agregar arma</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={estilos.footer}>
        <TouchableOpacity style={estilos.botonguardar} onPress={actualizar}>
          <Text style={estilos.textoBotonGuardar}>Guardar datos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedorG: {
    flex: 1,
    backgroundColor: '#EFE1B8',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFE1B8',
  },
  emptyText: {
    color: '#3D2B1F',
    fontSize: 16,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
    backgroundColor: '#F4E8C5',
    borderBottomWidth: 1,
    borderBottomColor: '#B89B66',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#B89B66',
    backgroundColor: '#FDF7E8',
  },
  iconButtonText: {
    color: '#8A3D3D',
    fontSize: 18,
    fontWeight: '700',
  },
  infoPrincipal: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#3D2B1F',
    marginHorizontal: 8,
    paddingVertical: 2,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    gap: 6,
  },
  metaText: {
    color: '#6F5135',
    fontSize: 14,
    fontWeight: '600',
  },
  metaDivider: {
    color: '#B89B66',
    fontSize: 14,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
    backgroundColor: '#EFE1B8',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    color: '#6F5135',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: '#8A3D3D',
  },
  activeTabLine: {
    width: 36,
    height: 2,
    backgroundColor: '#8A3D3D',
    marginTop: 6,
  },
  inspirationCard: {
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B89B66',
    borderRadius: 10,
    backgroundColor: '#F4E8C5',
  },
  inspirationLabel: {
    color: '#3D2B1F',
    fontWeight: '700',
    fontSize: 14,
  },
  inspirationValue: {
    color: '#8A3D3D',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#B89B66',
    borderRadius: 12,
    backgroundColor: '#F4E8C5',
  },
  sectionTitle: {
    color: '#8A3D3D',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  attributeCard: {
    width: '31%',
    minWidth: 94,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#B89B66',
    borderRadius: 10,
    backgroundColor: '#FDF7E8',
    alignItems: 'center',
  },
  attributeValue: {
    color: '#3D2B1F',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 2,
  },
  attributeModifier: {
    color: '#6F5135',
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#B89B66',
  },
  dividerIcon: {
    marginHorizontal: 10,
    color: '#8A3D3D',
    fontSize: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  infoCard: {
    width: '48%',
    minWidth: 140,
    padding: 12,
    borderWidth: 1,
    borderColor: '#B89B66',
    borderRadius: 10,
    backgroundColor: '#FDF7E8',
  },
  infoValue: {
    color: '#3D2B1F',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },
  infoTextInput: {
    color: '#3D2B1F',
    fontSize: 15,
    fontWeight: '600',
    paddingVertical: 2,
  },
  skillsList: {
    gap: 8,
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DCC8A4',
  },
  skillLabel: {
    color: '#3D2B1F',
    fontSize: 14,
    fontWeight: '600',
  },
  skillInput: {
    width: 56,
    color: '#3D2B1F',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
  combatGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  combatCard: {
    width: '48%',
    minWidth: 140,
    padding: 12,
    borderWidth: 1,
    borderColor: '#B89B66',
    borderRadius: 10,
    backgroundColor: '#FDF7E8',
  },
  cardLabel: {
    color: '#8A3D3D',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  textInputInline: {
    color: '#3D2B1F',
    fontSize: 15,
    fontWeight: '600',
    paddingVertical: 2,
  },
  weaponList: {
    gap: 10,
    marginTop: 8,
  },
  weaponCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#B89B66',
    borderRadius: 10,
    backgroundColor: '#FDF7E8',
    gap: 8,
  },
  weaponInput: {
    color: '#3D2B1F',
    fontSize: 14,
    paddingVertical: 2,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F4E8C5',
    borderTopWidth: 1,
    borderTopColor: '#B89B66',
  },
  botonguardar: {
    backgroundColor: '#1a0e07',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotonGuardar: {
    color: '#f0e6c8',
    fontSize: 16,
    fontWeight: '700',
  },
});