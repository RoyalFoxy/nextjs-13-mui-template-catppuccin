import {
  readFileSync,
  statSync,
  readdirSync,
  writeFileSync,
  rmSync,
  mkdirSync,
  cpSync,
} from "fs";
import { join, basename } from "path";
import hljs from "highlight.js";
import sharp from "sharp";
import { createHash } from "crypto";
import "dotenv/config";

import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

ffmpeg.setFfmpegPath(ffmpegPath || "");

const { highlight } = hljs;

const ValveKey = process.env.VALVE_KEY;
const SteamID = process.env.STEAM_ID;

const env = process.env.NODE_ENV || "development";

console.log(JSON.stringify(process.env, null, 2));

main();

async function main() {
  await videoStep();
  await imageStep();
  await gameStep();
  await componentStep();
  cpSync("assets/fonts", "public/assets/fonts", { recursive: true });
}

async function videoStep() {
  console.log("Processing videos");
  await Promise.all(
    readdirSync("assets/videos")
      .filter((file) => file !== ".gitignore")
      .map(async (file) => {
        const filename = file.split(".").slice(0, -1).join(".");
        const fileExtension = file.split(".").pop();
        cpSync(
          `assets/videos/${file}`,
          `public/videos/${hash(filename)}.${fileExtension}`
        );

        await buildVideoImage(
          `assets/videos/${file}`,
          `assets/images/video.preview.${filename}.png`
        );
      })
  );
}

async function imageStep() {
  console.log("Processing images");
  await buildImages();
}

async function gameStep() {
  if (env === "development") return console.log("No game step execution");

  console.log("Getting steam data");
  const ownedGamesData = await getOwnedGames();
  writeFileSync("src/data/games/games.json", stringify(ownedGamesData));
}

async function componentStep() {
  console.log("Getting components data");
  const components = allComponents().map((fullPath) => {
    const count = getOccurrences(fullPath);
    return { count, fullPath, source: getComponent(fullPath) };
  });
  writeFileSync("src/data/components/all.json", stringify(components));
}

function stringify(object) {
  if (env === "production") return JSON.stringify(object);
  return JSON.stringify(object, null, 2);
}

async function buildVideoImage(filePath, outputPath) {
  await new Promise((resolve, reject) =>
    ffmpeg(filePath)
      .outputOptions(["-vframes 1"])
      .output(outputPath)
      .on("end", resolve)
      .on("error", reject)
      .run()
  );
}

async function buildImages() {
  rmSync("public/images", {
    force: true,
    recursive: true,
  });
  mkdirSync("public/images");

  const basePath = "assets/images";
  const images = readdirSync(basePath).filter((file) => file !== ".gitignore");

  await Promise.all(
    images.map(async (imageFilename) => {
      const imageName = basename(imageFilename, ".png");

      const outputName = hash(imageName);
      cpSync(
        `assets/images/${imageName}.png`,
        `public/images/${outputName}.png`
      );
      const imageSource = readFileSync(`assets/images/${imageName}.png`);
      await optimizeImage(imageName, imageSource);
      await blurImage(imageName, imageSource);
    })
  );
}

async function optimizeImage(name, source) {
  const image = sharp(source);
  const imageBuffer = await image.webp().toBuffer();

  const outputName = hash(name);

  writeFileSync(`public/images/${outputName}.webp`, imageBuffer);
}

async function blurImage(name, source) {
  const image = sharp(source);
  const imageBuffer = await image.blur(50).webp().toBuffer();

  const outputName = hash(`${name}.blur`);

  writeFileSync(`public/images/${outputName}.webp`, imageBuffer);
}

async function getOwnedGames() {
  const response = await fetch(
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${ValveKey}&steamid=${SteamID}&include_appinfo=1&include_played_free_games=1&format=json`
  );
  if (!response.ok)
    throw new Error(`Couldn't fetch data from Steam\n${await response.text()}`);

  const text = await response.text();

  const gameData = await Promise.all(
    JSON.parse(text).response.games.map(
      async ({ appid, playtime_forever, rtime_last_played, img_icon_url }) => {
        const additionalResponse = await await fetch(
          `https://store.steampowered.com/api/appdetails?appids=${appid}`,
          {
            headers: { "Accept-Language": "en" },
          }
        );

        const text = await additionalResponse.text();

        if (!additionalResponse.ok) return null;
        const responseJson = Object.values(JSON.parse(text))[0];

        if (!responseJson.success) return null;

        const {
          data: {
            header_image,
            capsule_image,
            platforms,
            categories,
            genres,
            screenshots,
            release_date,
            background,
            background_raw,
            achievements,
            movies,
            name,
          },
        } = responseJson;

        return {
          playtime: playtime_forever,
          lastPlayed: rtime_last_played,
          iconUrl: img_icon_url,
          appid,
          header: header_image,
          capsule: capsule_image,
          platforms,
          categories,
          genres,
          screenshots,
          release_date,
          background,
          background_raw,
          achievements,
          movies,
          name,
        };
      }
    )
  );

  return gameData;
}

function allComponents() {
  const normalizedPath = join("src/components");
  return walkDirectory(normalizedPath);
}

function getComponent(filePath) {
  const fullPath = join("src/components", filePath);
  return highlight(readFileSync(fullPath).toString(), {
    language: "javascript",
  }).value;
}

function getOccurrences(filePath) {
  const componentName = basename(filePath, ".tsx");

  const normalizedPaths = [join("src/components"), join("src/app")];

  const allFilePaths = normalizedPaths
    .map((normalizedPath) =>
      walkDirectory(normalizedPath).map((path) => `${normalizedPath}/${path}`)
    )
    .flat();

  const count = allFilePaths
    .map((filePath) => countOccurrences(filePath, componentName))
    .reduce((acc, count) => acc + count, 0);

  return count;
}

function countOccurrences(filePath, componentName) {
  const source = readFileSync(filePath).toString();

  return (source.match(new RegExp(`<${componentName}(>|.*?>)`, "gms")) || [])
    .length;
}

function walkDirectory(dirPath) {
  const allPaths = [];
  const queue = [dirPath];

  while (queue.length > 0) {
    const currentPath = queue.shift();
    let stat;

    try {
      stat = statSync(currentPath);
    } catch (e) {
      console.error(`Error reading ${currentPath}: ${e.message}`);
      continue;
    }

    if (stat.isDirectory()) {
      const files = readdirSync(currentPath);

      files.map((file) => queue.push(join(currentPath, file)));
    } else allPaths.push(currentPath.replace(`${dirPath}/`, ""));
  }

  return allPaths;
}

function hash(toHash) {
  return createHash("md5").update(toHash).digest("hex");
}
