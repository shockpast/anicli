import { select } from "@inquirer/prompts"

import type { SearchResponse } from "@/types"

export default async (args: string[]) => {
  const response = await fetch("https://api.anilibria.tv/v3/title/search?search=" + encodeURIComponent(args.slice(1).join("")))
  const json: SearchResponse = await response.json()

  const selectedTitle = await select({
    message: "search/title",
    choices: json.list.map((title) => { return { name: title.names.ru, value: title } }),
    loop: false
  })

  console.log(`anicli @ ${selectedTitle.names.ru} [${selectedTitle.type.full_string} / ${selectedTitle.status.string}]`)
  console.log(`anicli @ ${selectedTitle.description}`)

  const videoHost = selectedTitle.player.host
  const episodes = Object.values(selectedTitle.player.list).map((ep) => {
    return { src: ep.hls.fhd || ep.hls.hd, num: ep.episode, name: ep.name, thumb: ep.preview }
  })

  const selectedOption = await select({
    message: "title/options",
    choices: [
      { name: `Скачать всё (${episodes.length} эп.)`, value: "all" },
      { name: `Скачать опред. эпизод.`, value: "specific" }
    ]
  })

  const dirName = selectedTitle.names.ru
    .replaceAll(":", "").replaceAll(" ", "_").replaceAll(",", "")

  switch (selectedOption) {
    case "all": {
      for (const episode of episodes) {
        const video = await fetch(`https://${videoHost}${episode.src}`)
        await Bun.write(`anime/${dirName}/${episode.num}.m3u8`, video)

        console.log(`✔ ${selectedTitle.names.ru} #${episode.num} был успешно скачан.`)
      }

      return
    }

    case "specific": {
      const selectedEpisode = await select({
        message: "title/episode",
        choices: episodes.map((ep) => { return { name: ep.name != null ? `#${ep.num}. ${ep.name}` : `Эпизод #${ep.num}`, value: ep } }),
        loop: false
      })

      const video = await fetch(`https://${videoHost}${selectedEpisode.src}`)
      return await Bun.write(`anime/${dirName}/${selectedEpisode.num}.m3u8`, video)
    }
  }
}