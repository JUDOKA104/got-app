import type {Character} from '../types';
import { CharacterCard } from './CharacterCard';
import { getHouseLogo } from './HouseVisualCard';

interface HouseDetailSplitProps {
    houseName: string;
    characters: Character[];
    onClose: () => void;
    onOpenDetails: (char: Character) => void;
    isFavorite: (id: number) => boolean;
    onToggleFavorite: (id: number) => void;
}

export const HouseDetailSplit = ({ houseName, characters, onClose, onOpenDetails, isFavorite, onToggleFavorite }: HouseDetailSplitProps) => {
    const logoUrl = getHouseLogo(houseName);
    const isGeneric = logoUrl.includes('Game_of_Thrones_2011_logo');

    return (
        <div className="split-view-container">
            <div className="split-left slide-in-left">
                <button className="back-btn" onClick={onClose}>← Retour</button>
                <div className="house-banner giant">
                    <div className="banner-rod"></div>
                    <h1 className="house-name-giant">{houseName}</h1>
                    <div className="emblem-placeholder">
                        <img
                            src={logoUrl}
                            alt={`Emblème ${houseName}`}
                            className={`giant-emblem ${isGeneric ? 'generic-logo' : ''}`}
                        />
                    </div>
                </div>
            </div>

            <div className="split-right slide-in-right">
                <div className="split-header">
                    <h2>Membres de la maison</h2>
                    <span className="count-badge">{characters.length} effectifs</span>
                </div>
                <div className="characters-grid split-grid">
                    {characters.map((char) => (
                        <CharacterCard
                            key={char.id}
                            character={char}
                            onOpenDetails={onOpenDetails}
                            isFavorite={isFavorite(char.id)}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};