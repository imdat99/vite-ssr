import express, { Express, Request, Response } from "express";
import * as path from 'node:path';
import fs from "fs";


const resolve = (_path: string) => path.resolve(path.resolve(), _path);
async function configProd(app: Express) {
  app.use(
    (await import("serve-static")).default("./dist/client", {
      index: false, // don't send index.html as there's none
    })
  );

  // @ts-ignore
  const render = (await import("../server/entry-server.js")).render;
  // replace bootstrap script with compiled scripts
  const files =  fs.readdirSync("./dist/client/assets")
  const scriptLink = "/assets/" + files.filter((fn: string) => fn.includes("main") && fn.endsWith(".js"))[0];
  const styleLink = "/assets/" + files.filter((fn: string) => fn.includes("main") && fn.endsWith(".css"))[0];

  app.use((await import("compression")).default());
  app.use(
    (await import("serve-static")).default(resolve("./client"), {
      index: false,
    })
  );
  app.use("*", (req, res) => render(req, res, scriptLink, styleLink));
  return app;
}

async function configDev(app: Express) {
  const cwd = process.cwd();
  // dev mode, configure vite as middleware
  const vite = await (
    await import("vite")
  ).createServer({
    root: cwd,
    server: {
      middlewareMode: true,
      hmr: true,
    },
    appType: "custom",
  });
  app.use(vite.middlewares);

  const renderer = async (req: Request, res: Response) => {
    // in dev mode, we will try to load the render function for every request,
    // so that editing the entry-server file take effect without restart server.
    try {
      const render = (await vite.ssrLoadModule("./entry-server.tsx")).render;
      render(req, res, `/src/main.tsx`);
    } catch (err) {
      const e = err as Error;
      vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  };
  app.use("*", renderer);
  return app;
}

const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || (isProd ? 4173 : 5173);
const app = express();

const config = isProd ? configProd : configDev;

config(app)
  .then((app) => {
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
  })
  .catch(console.error);
