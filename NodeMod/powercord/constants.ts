import {
  Channels,
  Directories, Guild, HTTP, Repositories,
} from '@vizality/constants';

export = Object.freeze({
  // Powercord
  WEBSITE: HTTP.WEBSITE,
  I18N_WEBSITE: 'https://FIXME',
  REPO_URL: Repositories.VIZALITY,

  // Runtime
  SETTINGS_FOLDER: Directories.SETTINGS,
  CACHE_FOLDER: Directories.CACHE,
  LOGS_FOLDER: Directories.LOGS,

  // Discord server
  DISCORD_INVITE: Guild.INVITE,
  GUILD_ID: Guild.ID,
  SpecialChannels: Object.freeze({
    KNOWN_ISSUES: '0',
    SUPPORT_INSTALLATION: Channels.INSTALLATION_SUPPORT,
    SUPPORT_PLUGINS: Channels.PLUGINS_SUPPORT,
    SUPPORT_MISC: Channels.MISC_SUPPORT,

    // Community content
    STORE_PLUGINS: [ Channels.PLUGINS ],
    STORE_THEMES: [ Channels.THEMES ],
    CSS_SNIPPETS: [ Channels.CSS_SNIPPETS ],
    JS_SNIPPETS: [ Channels.JS_SNIPPETS ],
  }),

  CORE_PLUGINS: [],
})
