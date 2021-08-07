import { useState } from "react";
import { SongContext } from "../lib/song-context";
import { Song } from "../types/song";
import MusicPlayer from "./MusicPlayer";
import NavBar from "./NavBar";

interface Props {
  children: React.ReactElement[];
}

export default function Layout({ children }: Props) {
    const [song, setSong] = useState<Song>({ name: "Moon", author: "Kanye West", album: "Donda" })

  return (
    <SongContext.Provider value={{ playingSong: song, setSong: setSong }}>
      <NavBar />
      <main>{children}</main>
      <MusicPlayer song={song} />
    </SongContext.Provider>
  );
}
