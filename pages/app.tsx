import React from "react";
import Bowser from "bowser";

export default class extends React.Component {
  static async getInitialProps(ctx: any) {
    const userAgent = ctx.req.headers["user-agent"];
    const browser = Bowser.getParser(userAgent);
    const platform = browser.parsePlatform()
    if (ctx.res) {
      if (platform.type === "mobile") {
        setTimeout(function () {
          ctx.res.writeHead(302, {
            Location: "sevi://notifications?id=com.sevi.sevi"
          });
        }, 50);
        setTimeout(function () {
          ctx.res.writeHead(302, {
            Location: "market://details?id=com.sevi.sevi"
          });
        }, 50);
        ctx.res.writeHead(302, {
          Location:
            "https://play.google.com/store/apps/details?id=com.sevi.sevi"
        });
        ctx.res.end();

        return {}
      } else {
        ctx.res.writeHead(302, {
          Location:
            "https://play.google.com/store/apps/details?id=com.sevi.sevi"
        });
        ctx.res.end();
        // Router.push("market://details?id=com.sevi.sevi");
      }
    }

    return { useragent: browser };
  }

  render() {
    return {}
  }
}

//