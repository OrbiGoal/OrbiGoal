interface Team {
    team_id: number;
    Country: string;
    Logo: string;
    Squad: string;
    full_name: string;
    season: string;
    isFavorite: boolean;
}

interface FavoriteTeam {
    apiLeague: string | null;
}