// @ts-nocheck
import * as __fd_glob_1 from "../content/craft/video-player.mdx?collection=craft"
import * as __fd_glob_0 from "../content/craft/cursor-origin.mdx?collection=craft"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const craft = await create.docs("craft", "content/craft", {}, {"cursor-origin.mdx": __fd_glob_0, "video-player.mdx": __fd_glob_1, });