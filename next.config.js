const { withFaust } = require("@faustjs/next");

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust();
module.exports = {
  images: {
    domains: ["next.jitensha-hoken.jp"],
  },
};
