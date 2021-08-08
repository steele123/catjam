import SEO from "../../component/SEO";
import { fetchAlbums } from "../../lib/album-reader";
import { toSlug } from "../../lib/slugger";
import { Album } from "../../types/album";
import Image from "next/image";
import { ClockIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import { SongContext } from "../../lib/song-context";
import { Song } from "../../types/song";

interface Props {
  album: Album;
}

export default function AlbumPage({ album }: Props) {
  const { setSong, playingSong, setAlbumSongs } = useContext(SongContext)

  const onSongClick = (song: Song, author: string, songs: Song[]) => {
    let newSongs: Song[] = []
    songs.forEach(newSong => {
      if (newSong.album == null) {
        newSong.album = song.album
      }
      newSongs.push(newSong)
    });

    if (setSong != null) {
      setSong({ author: author, ...song })
    }

    if (setAlbumSongs != null) {
      setAlbumSongs(newSongs)
    }
  }

  return (
    <div className="flex flex-col justify-center mx-auto pb-36">
      <SEO title={album.name} />

      <div className="flex flex-col justify-center items-center pt-10">
        <div className="flex items-center pb-5">
          <Image
            quality={100}
            width={150}
            height={150}
            src={`/imgs/${toSlug(album.name)}.png`}
          />
          <div className="flex-col pl-5">
            <div className="text-sm">ALBUM</div>
            <div className="text-3xl font-black">{album.name}</div>
            <div>
              {album.author} - {album.songs.length} songs
            </div>
          </div>
        </div>
        <table className="w-1/2 flex-col">
          <tr className="border-gray-100 border-b w-full">
            <th className="font-normal">#</th>
            <th className="font-normal pb-2">TITLE</th>
          </tr>
          <div className="pb-3"></div>
          {album.songs.map((song, index) => (
            <tr onClick={() => onSongClick({album: album.name, ...song}, song.author ? song.author : album.author, album.songs)} className="hover:bg-gray-200 dark:hover:bg-gray-300 hover:text-white rounded-full cursor-default select-none" key={song.name}>
              <th className={`font-normal ${song.name == playingSong.name ? "text-green-600 animate-pulse" : ""}`}>{index + 1}</th>
              <th>
                <div className={song.name == playingSong.name ? "text-green-600 animate-pulse" : ""}>{song.name}</div>
                <div className="text-gray-400 font-normal text-sm">
                  {song.author ? song.author : album.author}
                </div>
              </th>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

interface Params {
  params: {
    slug: string;
  };
}

export async function getStaticProps({ params }: Params) {
  const album = fetchAlbums().find(
    (album) => toSlug(album.name) == params.slug
  );

  return {
    props: {
      album: album,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: fetchAlbums().map((album) => {
      return {
        params: {
          slug: toSlug(album.name),
        },
      };
    }),
    fallback: false,
  };
}
