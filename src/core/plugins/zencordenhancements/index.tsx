import { defineCorePlugin } from "..";

export default defineCorePlugin({
    manifest: {
        id: "zencord.enhancements",
        version: "0.1.0",
        type: "plugin",
        spec: 3,
        main: "",
        display: {
            name: "ZenCord Enhancements",
            description: "Fixes common discord bugs because discord wont",
            authors: [{ name: "ZenCord Team"}]
        }
    },
    start() {
    }
});