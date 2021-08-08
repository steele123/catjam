import { useState } from "react";
import { SongContext } from "../lib/song-context";
import { Song } from "../types/song";
import MusicPlayer from "./MusicPlayer";
import NavBar from "./NavBar";

interface Props {
  children: React.ReactElement[];
}

export default function Layout({ children }: Props) {
  const [song, setSong] = useState<Song>({
    name: "Moon",
    author: "Kanye West",
    album: "Donda",
  });
  const [albumSongs, setAlbumSongs] = useState<Song[]>([
    {
      name: "South Carolina",
    },
    {
      name: "Moon",
    },
    {
      name: "Praise God",
    },
    {
      name: "Im Not Okay",
    },
    {
      name: "Junya",
    },
    {
      name: "Shoulder to Lean On",
    },
    {
      name: "Heaven Hell",
    },
    {
      name: "Off the Grid",
    },
    {
      name: "Remote",
    },
    {
      name: "Donda Donda Donda",
    },
    {
      name: "New Again",
    },
    {
      name: "Pure Souls",
    },
    {
      name: "Keep My Spirit Alive",
    },
    {
      name: "Never Abandon Your Family",
    },
    {
      name: "Jesus Lord",
    },
    {
      name: "I Know God Breathed On This",
    },
    {
      name: "Jail",
    },
    {
      name: "Lord I Need You",
    },
    {
      name: "Hurricane",
    },
    {
      name: "24",
    },
    {
      name: "No Child Left Behind",
    },
  ]);

  return (
    <SongContext.Provider
      value={{
        playingSong: song,
        setSong: setSong,
        albumSongs: albumSongs,
        setAlbumSongs: setAlbumSongs,
      }}
    >
      <NavBar />
      <main>{children}</main>
      <MusicPlayer />
    </SongContext.Provider>
  );
}
