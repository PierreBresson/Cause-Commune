var he = require("he");

export default (cleanWPjson = json => {
  let cleanJSON = [];
  json.map(json_item => {
    let item = {
      id: json_item.id,
      categories: json_item.series,
      title: he.unescape(json_item.title.rendered),
      body: he.unescape(
        json_item.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")
      ),
      audio_link: json_item.meta.audio_file
    };
    cleanJSON.push(item);
  });
  return cleanJSON;
});
