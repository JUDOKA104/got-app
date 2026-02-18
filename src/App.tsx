import { useState, useMemo } from 'react';
import { useThronesData } from './hooks/useThronesData';
import { useFavorites } from './hooks/useFavorites';
import { HouseTile } from './components/HouseTile';
import { CharacterCard } from './components/CharacterCard';
import { CharacterModal } from './components/CharacterModal';
import { HouseVisualCard } from './components/HouseVisualCard';
import { HouseDetailSplit } from './components/HouseDetailSplit';
import type {Character} from './types';
import './App.css';

const GameOfThrones = () => {
    const { houses, charactersByHouse, loading, error } = useThronesData();
    const { favorites, isFavorite, toggleFavorite } = useFavorites();

    // --- AJOUT DU MODE 'favorites' ---
    const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'favorites'>('kanban');
    const [selectedHouse, setSelectedHouse] = useState<string | null>(null);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

    const [searchTerm, setSearchTerm] = useState('');

    const allCharacters = useMemo(() => {
        return Object.values(charactersByHouse).flat();
    }, [charactersByHouse]);

    const searchResults = useMemo(() => {
        if (!searchTerm.trim()) return [];
        return allCharacters.filter(c =>
            c.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, allCharacters]);

    if (loading) return <div className="loader">Corbeaux en route... (Chargement)</div>;
    if (error) return <div className="error">Erreur : {error}</div>;

    return (
        <div className="got-layout">
            {/* HEADER AVEC RECHERCHE ET BOUTONS DE VUE */}
            <header className="top-nav">
                <h1 className="main-title">Westeros Archives</h1>

                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="🔍 Chercher un personnage..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchResults.length > 0 && (
                        <div className="search-results">
                            {searchResults.map(char => (
                                <div
                                    key={char.id}
                                    className="search-item"
                                    onClick={() => {
                                        setSelectedCharacter(char);
                                        setSearchTerm('');
                                    }}
                                >
                                    <img src={char.imageUrl} alt={char.firstName} />
                                    <span>{char.fullName}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="view-toggles">
                    <button className={viewMode === 'list' ? 'active' : ''} onClick={() => { setViewMode('list'); setSelectedHouse(null); }}>Vue Liste</button>
                    <button className={viewMode === 'kanban' ? 'active' : ''} onClick={() => { setViewMode('kanban'); setSelectedHouse(null); }}>Vue Bannières</button>
                    <button className={viewMode === 'favorites' ? 'active' : ''} onClick={() => { setViewMode('favorites'); setSelectedHouse(null); }}>👑 Conseil Restreint</button>
                </div>
            </header>

            {/* --- VUE 1 : VUE LISTE --- */}
            {viewMode === 'list' && (
                <div className="classic-layout">
                    <aside className="sidebar">
                        <h2 className="sidebar-title">Les Maisons</h2>
                        <div className="house-list">
                            {houses.map((house) => (
                                <HouseTile key={house} name={house} count={charactersByHouse[house].length} isSelected={selectedHouse === house} onClick={() => setSelectedHouse(house)} />
                            ))}
                        </div>
                    </aside>
                    <main className="content">
                        {!selectedHouse ? (
                            <div className="empty-state"><h2>Sélectionnez une Maison</h2></div>
                        ) : (
                            <div className="characters-grid">
                                {charactersByHouse[selectedHouse].map((char) => (
                                    <CharacterCard key={char.id} character={char} isFavorite={isFavorite(char.id)} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedCharacter} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            )}

            {/* --- VUE 2 : VUE BANNIÈRES (KANBAN) --- */}
            {viewMode === 'kanban' && (
                <main className="kanban-layout">
                    {!selectedHouse ? (
                        <div className="houses-grid fade-in">
                            {houses.map((house) => (
                                <HouseVisualCard key={house} name={house} characters={charactersByHouse[house]} onClick={() => setSelectedHouse(house)} />
                            ))}
                        </div>
                    ) : (
                        <HouseDetailSplit
                            houseName={selectedHouse}
                            characters={charactersByHouse[selectedHouse]}
                            onClose={() => setSelectedHouse(null)}
                            onOpenDetails={setSelectedCharacter}
                            isFavorite={isFavorite}
                            onToggleFavorite={toggleFavorite}
                        />
                    )}
                </main>
            )}

            {/* --- VUE 3 : LE CONSEIL RESTREINT (FAVORIS) --- */}
            {viewMode === 'favorites' && (
                <main className="content fade-in" style={{ padding: '3rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                    <div className="content-header">
                        <h2>Le Conseil Restreint</h2>
                        <span className="count-badge">{favorites.length} Main(s) du Roi</span>
                    </div>

                    {favorites.length === 0 ? (
                        <div className="empty-state">
                            <h2>Le Roi n'a pas de conseillers.</h2>
                            <p>Explorez les Maisons ou utilisez la recherche pour nommer (📌) des Mains du Roi.</p>
                        </div>
                    ) : (
                        <div className="characters-grid">
                            {/* On filtre tous les personnages pour ne garder que ceux dont l'ID est dans les favoris */}
                            {allCharacters.filter(c => favorites.includes(c.id)).map(char => (
                                <CharacterCard
                                    key={char.id}
                                    character={char}
                                    isFavorite={true} // Forcément vrai ici
                                    onToggleFavorite={toggleFavorite}
                                    onOpenDetails={setSelectedCharacter}
                                />
                            ))}
                        </div>
                    )}
                </main>
            )}

            {/* POPUP PARCHEMIN */}
            {selectedCharacter && (
                <CharacterModal
                    character={selectedCharacter}
                    isFavorite={isFavorite(selectedCharacter.id)}
                    onToggleFavorite={toggleFavorite}
                    onClose={() => setSelectedCharacter(null)}
                />
            )}
        </div>
    );
};

export default GameOfThrones;