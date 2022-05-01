import { getModule } from "@vizality/webpack";

export const goToOrJoinServer = (code) => {
    const inviteStore = getModule('acceptInviteAndTransitionToInviteChannel');
    const pop = getModule('popLayer');
    inviteStore.acceptInviteAndTransitionToInviteChannel(code);
    pop.popAllLayers();
};

export const formatTime = (time) => {
    time = Math.floor(time / 1000);
    const hours = Math.floor(time / 3600) % 24;
    const minutes = Math.floor(time / 60) % 60;
    const seconds = time % 60;
    return [hours, minutes, seconds]
        .map(v => v < 10 ? `0${v}` : v)
        .filter((v, i) => v !== '00' || i > 0)
        .join(':');
};

export * from "@vizality/util/React";
export * from "@vizality/util/DOM";
export { waitForElement as waitFor } from "@vizality/util/DOM";
export { sleep } from "@vizality/util/Time";
export { removeDirRecursive as rmdirRf } from "@vizality/util/File";
export { toCamelCase as camelCaseify } from "@vizality/util/String";
