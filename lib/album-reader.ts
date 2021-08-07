import { Album } from "../types/album";
import fs from "fs";

export function fetchAlbums() {
  const fileContents = fs.readFileSync("./data/songs.json", "utf-8");
  const albums: Album[] = JSON.parse(fileContents);
  return albums;
}
