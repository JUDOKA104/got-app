import { useState, useEffect, useMemo } from 'react';
import type {Character, CharactersByHouse} from '../types';

export const useThronesData = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://thronesapi.com/api/v2/Characters')
            .then((res) => {
                if (!res.ok) throw new Error('Erreur réseau');
                return res.json();
            })
            .then((data) => {
                setCharacters(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Algorithme de tri et de nettoyage
    const { houses, charactersByHouse } = useMemo(() => {
        const grouped: CharactersByHouse = {};

        characters.forEach((char) => {
            let houseName = char.family || 'Inconnue';

            houseName = houseName.replace('House ', '').trim();
            if (houseName === 'Targaryan') houseName = 'Targaryen';
            if (houseName === 'Lanister') houseName = 'Lannister';
            if (houseName === 'None' || houseName === 'Unkown' || houseName === '') houseName = 'Inconnue';

            const finalHouseName = houseName === 'Inconnue' ? 'Inconnue' : `Maison ${houseName}`;

            if (!grouped[finalHouseName]) {
                grouped[finalHouseName] = [];
            }
            grouped[finalHouseName].push(char);
        });

        const sortedHouses = Object.keys(grouped).sort((a, b) => {
            if (a === 'Inconnue') return 1;
            if (b === 'Inconnue') return -1;
            return a.localeCompare(b);
        });

        return { houses: sortedHouses, charactersByHouse: grouped };
    }, [characters]);

    return { houses, charactersByHouse, loading, error };
};