export interface personajeDND {
    id:string;
    nombre:string;
    clase:string;
    nivel:number;
    raza:string;
    transfondo?:string;
    bonificadores:DNDBonificadores;
    plantilla:DNDPlantilla;
    armas:Armas[];
    
}


export interface DNDBonificadores {
    Fuerza?:number;
    Destreza?:number;
    Constitucion?:number;
    Inteligencia?:number;
    Sabiduria?:number;
    Carisma?:number;
    //----------------habilidades -----------------------------------------
    Acrobacias?:number;
    Atletismo?:number;
    Arcano?:number;
    Engaño?:number;
    Historia?:number;
    Interpretacion?:number;
    Intimidacion?:number;
    Investigacion?:number;
    Medicina?:number;
    Naturaleza?:number;
    Percepcion?:number;
    Perspicacia?:number;
    Persuasion?:number;
    Religion?:number;
    Sigilo?:number;
    Supervivencia?:number;
    TconAnimales?:number;
    //--------------tiradas de salvacion--------------------------------------
    TSFuerza?:number;
    TSDestreza?:number;
    TSConstitucion?:number;
    TSInteligencia?:number;
    TSSabiduria?:number;
    TSCarisma?:number;
    //-----------------otros-----------------------------------------------
    BPC?:number; //bonificacion por experiencia 
}

export interface DNDPlantilla{
    ClaseArmadura?:number;
    Iniciativa?:number;
    Velocidad?:number;
    PuntosGolpe?:number;
    PuntosGolpeTemp?:number;
    DadosGolpe?:string;
}

export interface Armas{
    NombreArma?:string;
    Bonificador?:number;
    Daño?:string;
    Cantidad?:number;
}