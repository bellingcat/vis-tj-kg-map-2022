var UrlUtils = {
  getDomain: function (url) {
    return (new URL(url))?.hostname;
  },
  isValidYoutube: function (url) {
    return this.youtubeEmbed(url) != null;
  },
  youtubeEmbed: function (url) {
    const videoIdMatch = url.match(/youtube.com\/watch\?v=([\w-]{11})(&t=(\d+))?/) || url.match(/youtu.be\/([\w-]{11})(\?t=(\d+))?/);
    if (videoIdMatch) {
      const videoId = videoIdMatch[1];
      const startTime = videoIdMatch[3];
      let embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
      if (startTime) {
        embedUrl += `?start=${startTime}`;
      }
      return embedUrl;
    } else {
      return null;
    }
  },
  isValidTelegram: function (url) {
    return this.telegramEmbed(url) != null;
  },
  telegramEmbed: function (url) {
    const videoIdMatch = url.match(/t\.me\/(.+)\/(\d+)/);
    if (videoIdMatch) {
      const channelId = videoIdMatch[1];
      const postId = videoIdMatch[2];
      let embedUrl = `https://t.me/${channelId}/${postId}?embed=1`;
      return embedUrl;
    } else {
      return null;
    }
  },
  isImage: function (url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url.toLowerCase());
  }
}

export default UrlUtils;
