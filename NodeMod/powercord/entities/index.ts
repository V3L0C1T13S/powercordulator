import entities from "@vizality/entities";
import { createProxy } from "../../../createProxy";
import { Plugin } from "@vizality/entities";
import { modal } from "./modal";
import { http } from "./http";
import { settings } from "./settings";
import * as components from "./components";

export = createProxy(entities, {
    Plugin,
    modal,
    http,
    settings,
    components,
});
