module.exports = {
  "ie8": {
    "isShim": true,
    "path": "ie8/popcorn.ie8.js"
  },
  "applyclass": {
    "path": "effects/applyclass/popcorn.applyclass.js"
  },
  "locale": {
    "path": "modules/locale/popcorn.locale.js"
  },
  "parser": {
    "path": "modules/parser/popcorn.parser.js"
  },
  "player": {
    "path": "modules/player/popcorn.player.js"
  },
  "timeline-sources": {
    "path": "modules/timeline-sources/popcorn.timeline-sources.js"
  },
  "parserJSON": {
    "depends": "parser",
    "path": "parsers/parserJSON/popcorn.parserJSON.js"
  },
  "parserSBV": {
    "depends": "parser",
    "path": "parsers/parserSBV/popcorn.parserSBV.js"
  },
  "parserSRT": {
    "depends": "parser",
    "path": "parsers/parserSRT/popcorn.parserSRT.js"
  },
  "parserSSA": {
    "depends": "parser",
    "path": "parsers/parserSSA/popcorn.parserSSA.js"
  },
  "parserTTML": {
    "depends": "parser",
    "path": "parsers/parserTTML/popcorn.parserTTML.js"
  },
  "parserTTXT": {
    "depends": "parser",
    "path": "parsers/parserTTXT/popcorn.parserTTXT.js"
  },
  "parserVTT": {
    "depends": "parser",
    "path": "parsers/parserVTT/popcorn.parserVTT.js"
  },
  "parserXML": {
    "depends": "parser",
    "path": "parsers/parserXML/popcorn.parserXML.js"
  },
  "soundcloud": {
    "depends": "player",
    "path": "players/soundcloud/popcorn.soundcloud.js"
  },
  "vimeo": {
    "depends": "player",
    "path": "players/vimeo/popcorn.vimeo.js"
  },
  "youtube": {
    "depends": "player",
    "path": "players/youtube/popcorn.youtube.js"
  },
  "code": {
    "path": "plugins/code/popcorn.code.js"
  },
  "documentcloud": {
    "path": "plugins/documentcloud/popcorn.documentcloud.js"
  },
  "flickr": {
    "path": "plugins/flickr/popcorn.flickr.js"
  },
  "footnote": {
    "path": "plugins/footnote/popcorn.footnote.js"
  },
  "googlefeed": {
    "path": "plugins/googlefeed/popcorn.googlefeed.js"
  },
  "googlemap": {
    "path": "plugins/googlemap/popcorn.googlemap.js"
  },
  "image": {
    "path": "plugins/image/popcorn.image.js"
  },
  "mediaspawner": {
    "path": "plugins/mediaspawner/popcorn.mediaspawner.js"
  },
  "mustache": {
    "path": "plugins/mustache/popcorn.mustache.js"
  },
  "openmap": {
    "path": "plugins/openmap/popcorn.openmap.js"
  },
  "pause": {
    "path": "plugins/pause/popcorn.pause.js"
  },
  "subtitle": {
    "path": "plugins/subtitle/popcorn.subtitle.js"
  },
  "text": {
    "path": "plugins/text/popcorn.text.js"
  },
  "timeline": {
    "path": "plugins/timeline/popcorn.timeline.js"
  },
  "webpage": {
    "path": "plugins/webpage/popcorn.webpage.js"
  },
  "wikipedia": {
    "path": "plugins/wikipedia/popcorn.wikipedia.js"
  },
  "wordriver": {
    "path": "plugins/wordriver/popcorn.wordriver.js"
  },
  "MediaElementProto": {
    "path": "wrappers/common/popcorn._MediaElementProto.js"
  },
  "HTMLMediaElement": {
    "depends": "MediaElementProto",
    "path": "wrappers/html5/popcorn.HTMLMediaElement.js"
  },
  "HTMLNullVideoElement": {
    "depends": "MediaElementProto",
    "path": "wrappers/null/popcorn.HTMLNullVideoElement.js"
  },
  "HTMLSoundCloudAudioElement": {
    "depends": "MediaElementProto",
    "path": "wrappers/soundcloud/popcorn.HTMLSoundCloudAudioElement.js"
  },
  "HTMLVimeoVideoElement": {
    "depends": "MediaElementProto",
    "path": "wrappers/vimeo/popcorn.HTMLVimeoVideoElement.js"
  },
  "HTMLYouTubeVideoElement": {
    "depends": "MediaElementProto",
    "path": "wrappers/youtube/popcorn.HTMLYouTubeVideoElement.js"
  }
};
