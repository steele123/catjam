import React, { createContext, Dispatch, SetStateAction } from "react";
import { Album } from "../types/album";
import { Song } from "../types/song";

type songContextType = {
    playingSong: Song,
    albumName: string,
    setSong: Dispatch<SetStateAction<Song>> | null
}

const songContextDefaultValue: songContextType = {
    playingSong: {
        name: "Moon",
        author: "Kanye West"
    },
    albumName: "Donda",
    setSong: null
}

export const SongContext = createContext<songContextType>(songContextDefaultValue)