interface Match {
    id: string;
    competition: {
        name: string;
        emblem: string;
    };
    homeTeam: APITeam;
    awayTeam: APITeam;
    utcDate: string;
}

interface APITeam {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
}
