type Poster = { url: string, raw_base64_file: string | null }

export type SearchResponse = {
  list: {
    id: number
    code: string
    names: {
      ru: string
      en: string
      alternative: string | null
    }
    franchises: {
      franchise: {
        id: string // UUIDv4
        name: string
      }
      releases: {
        id: number
        code: string
        ordinal: number
        names: {
          ru: string
          en: string
          alternative: string | null
        }
      }[]
    }[]
    announce: string | null
    status: {
      string: string
      code: number
    }
    posters: {
      small: Poster
      medium: Poster
      original: Poster
    }
    /**
     * unix epoch
     */
    updated: number
    /**
     * unix epoch
     */
    last_change: number
    type: {
      /**
       * <ТИП> (<КОЛ-ВО> эп.), <ДЛИТ.> мин.
       */
      full_string: string
      code: number
      string: string
      episodes: number
      length: number
    }
    genres: string[]
    team: {
      voice: string[]
      translator: string[]
      editing: string[]
      decor: string[]
      timing: string[]
    }
    season: {
      string: string
      code: number
      year: number
      week_day: number
    }
    description: string
    in_favorites: number
    blocked: {
      copyrights: boolean
      geoip: boolean
      geoip_list: string[]
    }
    player: {
      alternative_player: string
      host: string
      is_rutube: boolean
      episodes: {
        first: number
        last: number
        string: string
      }
      list: {
        [episode: string]: {
          episode: number
          name: string | null
          uuid: string
          created_timestamp: number
          preview: string
          skips: {
            opening: number[]
            ending: number[]
          }
          hls: {
            fhd: string
            hd: string
            sd: string
          }
        }
      }
    }
    torrents: {
      episodes: {
        first: number
        last: number
        string: string
      }
      list: {
        torrent_id: number
        episodes: {
          first: number
          last: number
          string: string
        }
        quality: {
          string: string
          type: string
          resolution: string
          encoder: string
          lq_audio: string | null
        }
        leechers: number
        seeders: number
        downloads: number
        total_size: number
        size_string: string
        url: string
        magnet: string
        uploaded_timestamp: number
        hash: string
        metadata: string | null
        raw_base64_file: string | null
      }[]
    }
  }[]
  pagination: {
    pages: number
    current_page: number
    items_per_page: number
    total_items: number
  }
}