import * as SQLite from 'expo-sqlite';

import { personajeDND, Armas, DNDBonificadores, DNDPlantilla } from '../hooks/tipos';

const db = SQLite.openDatabaseSync('personajes.db');

export function crearTablas() {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS personajes (
            id TEXT PRIMARY KEY,
            nombre TEXT,
            clase TEXT,
            nivel INTEGER,
            raza TEXT,
            transfondo TEXT,
            Fuerza INTEGER,
            Destreza INTEGER,
            
            Constitucion INTEGER,
            Inteligencia INTEGER,
            Sabiduria INTEGER,
            Carisma INTEGER,
            -- --------------habilidades -----------------------------------------
            Acrobacias INTEGER,
            Atletismo INTEGER,
            Arcano INTEGER,
            Engaño INTEGER,
            Historia INTEGER,
            Interpretacion INTEGER,
            Intimidacion INTEGER,
            Investigacion INTEGER,
            Medicina INTEGER,
            Naturaleza INTEGER,
            Percepcion INTEGER,
            Perspicacia INTEGER,
            Persuasion INTEGER,
            Religion INTEGER,
            Sigilo INTEGER,
            Supervivencia INTEGER,
            TconAnimales INTEGER,
            -- ------------tiradas de salvacion--------------------------------------
            TSFuerza INTEGER,
            TSDestreza INTEGER,
            TSConstitucion INTEGER,
            TSInteligencia INTEGER,
            TSSabiduria INTEGER,
            TSCarisma INTEGER,
            -- ---------------otros-----------------------------------------------
            BPC INTEGER, --bonificacion por experiencia 
            -- -----------------------------------------------------------
            ClaseArmadura INTEGER,
            Iniciativa INTEGER,
            Velocidad INTEGER,
            PuntosGolpe INTEGER,
            PuntosGolpeTemp INTEGER,
            DadosGolpe TEXT
                );
        CREATE TABLE IF NOT EXISTS armas (
        id TEXT PRIMARY KEY,
        personaje_id TEXT,
        
        NombreArma TEXT,
        Bonificador INTEGER,
        Daño TEXT,
        Cantidad INTEGER,
        FOREIGN KEY (personaje_id) REFERENCES personajes(id)
        );
    `);
}
export function guardarValor(personaje:personajeDND){
    console.log('🔵 Intentando guardar:', personaje.id, personaje.nombre);
    db.runSync(
    `INSERT OR REPLACE INTO personajes  (
        id, nombre, clase, nivel, raza, transfondo,
        Fuerza, Destreza, Constitucion, Inteligencia, Sabiduria, Carisma,
        Acrobacias, Atletismo, Arcano, Engaño, Historia, Interpretacion,
        Intimidacion, Investigacion, Medicina, Naturaleza, Percepcion,
        Perspicacia, Persuasion, Religion, Sigilo, Supervivencia,
        TconAnimales,
        TSFuerza, TSDestreza, TSConstitucion, TSInteligencia,
        TSSabiduria, TSCarisma,
        BPC,
        ClaseArmadura,
        Iniciativa,
        Velocidad,
        PuntosGolpe,
        PuntosGolpeTemp,
        DadosGolpe
    ) VALUES (
        ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
    )`,
    [
        personaje.id,
        personaje.nombre,
        personaje.clase,
        personaje.nivel,
        personaje.raza,
        personaje.transfondo ?? null,

        personaje.bonificadores.Fuerza ?? null,
        personaje.bonificadores.Destreza ?? null,
        personaje.bonificadores.Constitucion ?? null,
        personaje.bonificadores.Inteligencia ?? null,
        personaje.bonificadores.Sabiduria ?? null,
        personaje.bonificadores.Carisma ?? null,

        personaje.bonificadores.Acrobacias ?? null,
        personaje.bonificadores.Atletismo ?? null,
        personaje.bonificadores.Arcano ?? null,
        personaje.bonificadores.Engaño ?? null,
        personaje.bonificadores.Historia ?? null,
        personaje.bonificadores.Interpretacion ?? null,
        personaje.bonificadores.Intimidacion ?? null,
        personaje.bonificadores.Investigacion ?? null,
        personaje.bonificadores.Medicina ?? null,
        personaje.bonificadores.Naturaleza ?? null,
        personaje.bonificadores.Percepcion ?? null,
        personaje.bonificadores.Perspicacia ?? null,
        personaje.bonificadores.Persuasion ?? null,
        personaje.bonificadores.Religion ?? null,
        personaje.bonificadores.Sigilo ?? null,
        personaje.bonificadores.Supervivencia ?? null,
        personaje.bonificadores.TconAnimales ?? null,

        personaje.bonificadores.TSFuerza ?? null,
        personaje.bonificadores.TSDestreza ?? null,
        personaje.bonificadores.TSConstitucion ?? null,
        personaje.bonificadores.TSInteligencia ?? null,
        personaje.bonificadores.TSSabiduria ?? null,
        personaje.bonificadores.TSCarisma ?? null,

        personaje.bonificadores.BPC ?? null,
        
        personaje.plantilla.ClaseArmadura ?? null,
        personaje.plantilla.Iniciativa ?? null,
        personaje.plantilla.Velocidad ?? null,
        personaje.plantilla.PuntosGolpe ?? null,
        personaje.plantilla.PuntosGolpeTemp ?? null,
        personaje.plantilla.DadosGolpe  ?? null
    ]
);
console.log('✅ Guardado en tabla personajes');

}
export function guardarArmas(personaje: personajeDND) {
    personaje.armas.forEach((arma, index) => {
        // Si el arma no trae id (por ejemplo, recién creada en el formulario),
        // le generamos uno combinando el id del personaje + su posición
        const armaId = arma.id ?? `${personaje.id}-${index}`;

        db.runSync(
            `INSERT OR REPLACE INTO armas (
                id, personaje_id, NombreArma, Bonificador, Daño, Cantidad
            ) VALUES (?,?,?,?,?,?)`,
            [
                armaId,
                personaje.id,
                arma.NombreArma ?? null,
                arma.Bonificador ?? null,
                arma.Daño ?? null,
                arma.Cantidad ?? null,
            ]
        );
    });
}

export function cargarPersonajes(): personajeDND[] {
    const filas = db.getAllSync<any>(`SELECT * FROM personajes`);
    console.log('🟢 Filas encontradas en DB:', filas.length);
    return filas.map((fila) => {
        const armasFilas = db.getAllSync<any>(
            `SELECT * FROM armas WHERE personaje_id = ?`,
            [fila.id]
        );

        const armas: Armas[] = armasFilas.map((a) => ({
            id: a.id,
            NombreArma: a.NombreArma,
            Bonificador: a.Bonificador,
            Daño: a.Daño,
            Cantidad: a.Cantidad,
        }));

        const bonificadores: DNDBonificadores = {
            Fuerza: fila.Fuerza,
            Destreza: fila.Destreza,
            Constitucion: fila.Constitucion,
            Inteligencia: fila.Inteligencia,
            Sabiduria: fila.Sabiduria,
            Carisma: fila.Carisma,
            Acrobacias: fila.Acrobacias,
            Atletismo: fila.Atletismo,
            Arcano: fila.Arcano,
            Engaño: fila.Engaño,
            Historia: fila.Historia,
            Interpretacion: fila.Interpretacion,
            Intimidacion: fila.Intimidacion,
            Investigacion: fila.Investigacion,
            Medicina: fila.Medicina,
            Naturaleza: fila.Naturaleza,
            Percepcion: fila.Percepcion,
            Perspicacia: fila.Perspicacia,
            Persuasion: fila.Persuasion,
            Religion: fila.Religion,
            Sigilo: fila.Sigilo,
            Supervivencia: fila.Supervivencia,
            TconAnimales: fila.TconAnimales,
            TSFuerza: fila.TSFuerza,
            TSDestreza: fila.TSDestreza,
            TSConstitucion: fila.TSConstitucion,
            TSInteligencia: fila.TSInteligencia,
            TSSabiduria: fila.TSSabiduria,
            TSCarisma: fila.TSCarisma,
            BPC: fila.BPC,
        };

        const plantilla: DNDPlantilla = {
            ClaseArmadura: fila.ClaseArmadura,
            Iniciativa: fila.Iniciativa,
            Velocidad: fila.Velocidad,
            PuntosGolpe: fila.PuntosGolpe,
            PuntosGolpeTemp: fila.PuntosGolpeTemp,
            DadosGolpe: fila.DadosGolpe,
        };

        const personaje: personajeDND = {
            id: fila.id,
            nombre: fila.nombre,
            clase: fila.clase,
            nivel: fila.nivel,
            raza: fila.raza,
            transfondo: fila.transfondo ?? undefined,
            bonificadores,
            plantilla,
            armas,
        };

        return personaje;
    });
}
export function eliminarPersonajeDB(id: string) {
    db.runSync(`DELETE FROM armas WHERE personaje_id = ?`, [id]);
    db.runSync(`DELETE FROM personajes WHERE id = ?`, [id]);
}
