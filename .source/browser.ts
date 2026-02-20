// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  craft: create.doc("craft", {"cursor-origin.mdx": () => import("../content/craft/cursor-origin.mdx?collection=craft"), "signature.mdx": () => import("../content/craft/signature.mdx?collection=craft"), "video-player.mdx": () => import("../content/craft/video-player.mdx?collection=craft"), }),
};
export default browserCollections;