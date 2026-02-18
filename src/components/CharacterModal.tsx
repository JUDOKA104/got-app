import type {Character} from '../types';

interface CharacterModalProps {
    character: Character;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
    onClose: () => void;
}

export const CharacterModal = ({ character, isFavorite, onToggleFavorite, onClose }: CharacterModalProps) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content parchment-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn wax-seal" onClick={onClose}>✕</button>

                <div className="parchment-inner">
                    <div className="modal-header-parchment">
                        <img src={character.imageUrl} alt={character.fullName} className="parchment-portrait" />
                        <button
                            className={`favorite-btn-large ${isFavorite ? 'active' : ''}`}
                            onClick={() => onToggleFavorite(character.id)}
                        >
                            {isFavorite ? '👑 Main du Roi' : '📌 Épingler'}
                        </button>
                    </div>

                    <div className="modal-details">
                        <h2 className="ink-title">{character.fullName}</h2>
                        <p className="modal-title ink-subtitle">"{character.title}"</p>

                        <div className="modal-stats ink-text">
                            <div className="stat-group-ink">
                                <span>Prénom</span>
                                <strong>{character.firstName}</strong>
                            </div>
                            <div className="stat-group-ink">
                                <span>Nom</span>
                                <strong>{character.lastName || 'Inconnu'}</strong>
                            </div>
                            <div className="stat-group-ink">
                                <span>Allégeance</span>
                                <strong>{character.family}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};