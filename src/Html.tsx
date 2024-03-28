import { PropsWithChildren, ReactNode } from "react";
import refreshScript from "./refresh-hack.js?raw";


const Html: React.FC<PropsWithChildren> = ({ children }) => {
  // inject vite refresh script to avoid "React refresh preamble was not loaded"
  let viteScripts = <></>;
  if (import.meta.env.DEV) {
    viteScripts = (
      <>
        <script type="module" src="/@vite/client" />
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: refreshScript }}
        />
      </>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        {viteScripts}
        <link rel="shortcut icon" href="/feld.svg" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FELD</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

export default Html;
