interface Notification {
    id: string;
    competition: {
        name: string;
        emblem: string;
    };
    homeTeam: {
        name: string;
        crest: string;
    };
    awayTeam: {
        name: string;
        crest: string;
    };
    score: {
        fullTime: {
            home: number;
            away: number;
        };
    };
    utcDate: string;
}
