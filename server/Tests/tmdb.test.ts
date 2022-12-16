import 'jest';
import {getMovieInfo, getShowInfo, search, getMovieDetails} from '../src/tmdb';

describe("Get movie deatails", () => {
    test("getMovieDetails", () => {
        expect(getMovieDetails(550)).resolves.toEqual({
            tmdb_id: 550,
            title: "Fight Club",
            backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
            year: "1999",
            providers: [],
            trakt_id: 0, //TODO: Change this to the correct id after fixing fn
            overview:  "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
            runtime: 139,
            poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
    })
})})