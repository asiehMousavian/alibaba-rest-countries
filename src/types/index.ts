export interface CountryDto {
    alpha2Code?: string;
    alpha3Code?: string;
    altSpellings?: string[];
    area?: number;
    borders?: string[];
    callingCodes?: string[];
    capital?: string;
    cioc?: string;
    currencies?: [
        {
            name?: string
        }
    ];
    demonym?: string;
    flag?: string;
    flags?: {
        png: string,
        svg: string
    };
    independent?: boolean;
    languages?: Languages[];
    latlng?: number[];
    name?: string;
    nativeName?: string;
    numericCode?: string;
    population: number;
    populationSlash?: string; //for display
    region?: string;
    regionalBlocs?: [];
    subregion?: string
    timezones?: string[];
    topLevelDomain?: string[];
    // translations;
}

export interface Currencies {
    code: string;
    name: string;
    symbol: string;
}
export interface Languages {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
}

// for theme page
export interface Theme {
    name: string;
    properties: any;
}

export const light: Theme = {
    name: 'light',
    properties: {
        '--background-body': 'hsl(0, 0%, 98%)',
        '--text-color': 'hsl(200, 15%, 8%)',
        '--elements-background': '#fff',
        '--search-background': '#fff',
    }
};

export const dark: Theme = {
    name: 'dark',
    properties: {
        '--background-body': 'hsl(207, 26%, 17%)',
        '--text-color': 'hsl(0, 0%, 100%)',
        '--elements-background': 'hsl(209, 23%, 22%)',
        '--search-background': 'hsl(209, 23%, 22%)',
    }
};
