import { Album } from "../types/album";
import Image from "next/image";
import { toSlug } from "../lib/slugger";
import { PlayIcon } from "@heroicons/react/solid";
import Link from "next/link";

interface Props {
  album: Album;
}

export default function AlbumCard({ album }: Props) {
  return (
    <Link href={`/albums/${toSlug(album.name)}`}>
      <a className="bg-gray-200 transition ease-in-out duration-150 hover:bg-gray-100 flex flex-col w-48">
        <div className="mx-auto pt-2">
          <Image
            quality={100}
            width={150}
            height={150}
            src={`/imgs/${toSlug(album.name)}.png`}
          />
        </div>
        <div className="pl-5">
          <div className="font-bold text-lg">{album.name}</div>
          <div className="text-xs text-gray-500 pb-5">{album.author}</div>
        </div>
      </a>
    </Link>
  );
}
