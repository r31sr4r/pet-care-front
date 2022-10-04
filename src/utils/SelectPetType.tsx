export const SelectPetType = (type: string) => {
    switch (type.toUpperCase()) {
        case 'DOG':
            return 'Cão';
        case 'CAT':
            return 'Gato';
        case 'BIRD':
            return 'Pássaro';
        case 'FISH':
            return 'Peixe';
        case 'RABBIT':
            return 'Coelho';
        case 'REPTILE':
            return 'Réptil';
        case 'OTHER':
            return '';
        default:
            return '';
    }
};