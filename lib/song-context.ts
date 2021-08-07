import React, { createContext, Dispatch, SetStateAction } from "react";
import { Album } from "../types/album";
import { Song } from "../types/song";

type songContextType = {
    playingSong: Song,
    setSong: Dispatch<SetStateAction<Song>> | null
}

const songContextDefaultValue: songContextType = {
    playingSong: {
        name: "Moon",
        author: "Kanye West",
        album: "Donda"
    },
    setSong: null
}

export const SongContext = createContext<songContextType>(songContextDefaultValue)