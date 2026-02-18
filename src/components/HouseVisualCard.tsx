import type {Character} from '../types';

interface HouseVisualCardProps {
    name: string;
    characters: Character[];
    onClick: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const getHouseLogo = (houseName: string) => {
    const logos: Record<string, string> = {
        'Maison Stark': 'https://static.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/8/80/Maison_Stark.png/revision/latest?cb=20160713113258&path-prefix=fr',
        'Maison Lannister': 'https://static.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/f/f3/Maison_Lannister.png/revision/latest?cb=20221114104831&path-prefix=fr',
        'Maison Targaryen': 'https://static.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/4/4c/Maison_Targaryen.png/revision/latest?cb=20221114030939&path-prefix=fr',
        'Maison Baratheon': 'https://static.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/e/ec/Maison_Baratheon.png/revision/latest?cb=20160713115141&path-prefix=fr',
        'Maison Greyjoy': 'https://static.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/b/ba/Maison_Greyjoy.png/revision/latest/thumbnail/width/360/height/360?cb=20160713115347&path-prefix=fr',
        'Maison Tyrell': 'https://static.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/9/9b/Maison_Tyrell.png/revision/latest?cb=20160713120050&path-prefix=fr',
        'Maison Baelish': 'https://static.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/5/55/Maison_Baelish.png/revision/latest?cb=20221120165309&path-prefix=fr',
        'Maison Bolton': 'https://static.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/a/a1/Maison_Bolton.png/revision/latest?cb=20170102140109&path-prefix=fr',
        'Maison Bronn': 'https://static.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/4/43/Maison_de_Bronn.png/revision/latest?cb=20221113150041&path-prefix=fr',
        'Maison Mormont': 'https://static.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/f/f5/Maison_Mormont.png/revision/latest?cb=20161216132059&path-prefix=fr',
        'Maison Clegane': 'https://static.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/5/5f/Maison_Clegane.png/revision/latest?cb=20161111085150&path-prefix=fr',
        'Maison Free Folk': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/89bfc46d-94b0-4f20-95e4-50efec333145/df2ww23-8304568b-0742-45d5-af4d-faaf9c15f362.png/v1/fill/w_852,h_937/coat_of_arms_of_the_free_folk_by_thehive1948_df2ww23-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiIvZi84OWJmYzQ2ZC05NGIwLTRmMjAtOTVlNC01MGVmZWMzMzMxNDUvZGYyd3cyMy04MzA0NTY4Yi0wNzQyLTQ1ZDUtYWY0ZC1mYWFmOWMxNWYzNjIucG5nIiwid2lkdGgiOiI8PTk4MiJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LlAV_8QS-RmVV_jte4pJxXioCJBXo7HNURfM0CVdj5A',
        'Maison Lorath': 'https://static.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/5/52/Maison_Martell.png/revision/latest/smart/width/386/height/259?cb=20160626192232&path-prefix=fr',
        'Maison Seaworth': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAok5IKZFUjzrZ2FlwxpCE4GfjybXGjZFrJQ&s',
        'Maison Tarly': 'https://static.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/1/17/Maison_Tarly.png/revision/latest/thumbnail/width/360/height/360?cb=20160713123041&path-prefix=fr',
        'Maison Tarth': 'https://static.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/d/d3/Maison_Torth.png/revision/latest?cb=20190522031103&path-prefix=fr',
        'Maison Viper': 'https://www.lagardedenuit.com/wiki/images/7/73/Blason-piper-2014-v01-256px.png',
    };
    return logos[houseName] || 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Game_of_Thrones_2011_logo.svg';
};

export const HouseVisualCard = ({ name, characters, onClick }: HouseVisualCardProps) => {
    const previewChars = characters.slice(0, 3);

    const logoUrl = getHouseLogo(name);
    const isGeneric = logoUrl.includes('Game_of_Thrones_2011_logo');

    return (
        <div className="house-banner" onClick={onClick}>
            <div className="banner-rod"></div>

            <h3 className="house-name-tiny">{name}</h3>

            <div className="banner-content">

                {/* LE LOGO */}
                <div className={`house-emblem ${isGeneric ? 'generic-logo' : ''}`}>
                    <img src={logoUrl} alt={`Emblème ${name}`} />
                </div>

                {/* L'APERÇU */}
                <div className="house-preview">
                    <div className="preview-avatars">
                        {previewChars.map(char => (
                            <img key={char.id} src={char.imageUrl} alt={char.firstName} title={char.fullName} />
                        ))}
                        {characters.length > 3 && <div className="more-avatar">+{characters.length - 3}</div>}
                    </div>
                </div>

            </div>
        </div>
    );
};