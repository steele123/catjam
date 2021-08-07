import Head from "next/head";
import MusicPlayer from "../component/MusicPlayer";
import SEO from "../component/SEO";
import { Album } from "../types/album";
import AlbumCard from "../component/AlbumCard";
import { fetchAlbums } from "../lib/album-reader";

interface Props {
  albums: Album[];
}

export default function Home({ albums }: Props) {
  return (
    <div>
      <SEO title="Amazing unreleased music for free" />
      <main>
        <div className="flex justify-center items-center pt-16">
          {albums.map((album) => 
            <AlbumCard key={album.name} album={album} />
          )}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      albums: fetchAlbums(),
    },
  };
}
