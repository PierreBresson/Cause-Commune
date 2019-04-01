import axios from "axios";
import config from "../../config";

import cleanWPjson from "../staticServices/cleanWPjson";

export default (getPodcasts = (page, category_id) => {
  let url =
    config.urls.api.base_url +
    config.urls.api.page +
    page +
    config.urls.api.per_page +
    config.articlesPerPage;

  if (category_id) {
    url =
      config.urls.api.base_url +
      config.urls.api.page +
      page +
      config.urls.api.series +
      category_id +
      config.urls.api.per_page +
      config.articlesPerPage;
  }

  let promiseGetPodcasts = new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
      timeout: 3000
    })
      .then(res => {
        resolve(cleanWPjson(res.data));
      })
      .catch(err => {
        reject(err);
      });
  });
  return promiseGetPodcasts;
});
