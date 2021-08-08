import React, { createContext, Dispatch, SetStateAction } from "react";
import { Album } from "../types/album";
import { Song } from "../types/song";

type songContextType = {
    playingSong: Song,
    setSong: Dispatch<SetStateAction<Song>> | null,
    albumSongs: Song[],
    setAlbumSongs: Dispatch<SetStateAction<Song[]>> | null
}

const songContextDefaultValue: songContextType = {
    playingSong: {
        name: "Moon",
        author: "Kanye West",
        album: "Donda"
    },
    setSong: null,
    albumSongs: [],
    setAlbumSongs: null
}

export const SongContext = createContext<songContextType>(songContextDefaultValue)