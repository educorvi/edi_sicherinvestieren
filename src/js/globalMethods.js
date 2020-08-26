import config from "@/config.json";

export function isEnabled(name) {
    return !config.disabledFeatures.includes(name)
}
