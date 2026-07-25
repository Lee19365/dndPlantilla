import * as SQLite from 'expo-sqlite';
import { personajeDND } from '../hooks/tipos';

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
    db.runSync(
    `INSERT OR REPLACE INTO personajes  (
        id, nombre, clase,transfondo,
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
        ?,?,?,?,?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )`,
    [
        personaje.id,
        personaje.nombre,
        personaje.clase,
        
        personaje.nivel,
        personaje. raza,
        personaje.transfondo  ?? null,

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

}
