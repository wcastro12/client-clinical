export module AppEnumerations {

	export enum TypeOrder {
        Medicamentos,
        Dietas,
        Mezclas,
        OrdenesGenerales,
        Materiales
    }
    export enum Priority{
        Alta,
        Media,
        Baja
    }
    export enum State{
        Ordenado,
        Cancelado,
        Suministrado
    }
   

    export class EnumTools{
    static EnumToArray(enumObject: AppEnumerations.Enumerations): Array<any> {
        let all = [];
        for (var key in enumObject) {
            if (!isNaN(Number(key)) && enumObject[key] != 'Default' )
                all.push(
                    {
                        id: key,
                        value: enumObject[key]
                    }
                );
        }
        return all;
    };

    static EnumToString(enumObject: AppEnumerations.Enumerations,keynumber:number): string {
       
        for (var key in enumObject) {

            if ( Number(key) == keynumber ){
           
            return enumObject[key]
            }
        }
    };
}

export class Enumerations{
    public static readonly TypeOrder = TypeOrder;
    public static readonly Priority = Priority;
    public static readonly State = State;

    constructor() {
    }
}
}