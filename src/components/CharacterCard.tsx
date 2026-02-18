import type {Character} from '../types';

interface CharacterCardProps {
    character: Character;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
    onOpenDetails: (char: Character) => void;
}

export const CharacterCard = ({ character, isFavorite, onToggleFavorite, onOpenDetails }: CharacterCardProps) => {
    return (
        <div className="character-card">
            <div className="card-image-container">
                <img src={character.imageUrl} alt={character.fullName} className="character-avatar" loading="lazy" />
                <button
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(character.id);
                    }}
                    title={isFavorite ? "Retirer la Main du Roi" : "Nommer Main du Roi"}
                >
                    {isFavorite ? '👑' : '📌'}
                </button>
            </div>

            <div className="character-info">
                <h3>{character.fullName}</h3>
                <button className="details-btn" onClick={() => onOpenDetails(character)}>
                    Détails
                </button>
            </div>
        </div>
    );
};