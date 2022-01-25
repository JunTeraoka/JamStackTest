const { withFaust } = require("@faustjs/next");

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust();
module.exports = {
  images: {
    domains: ["jitensha-hoken.jp", "asset.jitensha-hoken.jp"],
  },
};
