export const SelectBoosterUnit = (
        booster_interval: number,
        booster_unit: string) => {
    var isPluralDescription: boolean = booster_interval > 1;
    switch (booster_unit.toUpperCase()) {        
        case 'DAY':
            return isPluralDescription ? 'Dias' : 'Dia';            
        case 'MONTH':
            return isPluralDescription ? 'Meses' : 'Mês';            
        case 'YEAR':
            return isPluralDescription ? 'Anos' : 'Ano';
        case 'WEEK':
            return isPluralDescription ? 'Semanas' : 'Semana';
        case 'OTHER':
            return '';
        default:
            return '';
    }
};