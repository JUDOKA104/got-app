interface HouseTileProps {
    name: string;
    count: number;
    isSelected: boolean;
    onClick: () => void;
}

export const HouseTile = ({ name, count, isSelected, onClick }: HouseTileProps) => {
    return (
        <button
            className={`house-tile ${isSelected ? 'active' : ''}`}
            onClick={onClick}
        >
            <span className="house-name">{name}</span>
            <span className="house-badge">{count}</span>
        </button>
    );
};