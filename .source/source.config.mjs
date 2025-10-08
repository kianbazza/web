// source.config.ts
import { rehypeCode } from "fumadocs-core/mdx-plugins";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
var craft = defineDocs({
  dir: "content/craft"
});
var source_config_default = defineConfig({
  mdxOptions: {
    rehypePlugins: [
      [rehypeCode, { theme: "github-dark" }]
    ]
  }
});
export {
  craft,
  source_config_default as default
};
