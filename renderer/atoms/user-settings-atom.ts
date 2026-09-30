import { ImageFormat, VALID_IMAGE_FORMATS } from "@/lib/valid-formats";
import { ModelId } from "@common/models-list";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const customModelsPathAtom = atomWithStorage<string | null>(
  "customModelsPath",
  null,
);

export const selectedModelIdAtom = atomWithStorage<ModelId | string>(
  "selectedModelId",
  "upscayl-standard-4x",
);
export const doubleUpscaylAtom = atomWithStorage("doubleUpscayl", false);
export const gpuIdAtom = atomWithStorage("gpuId", "");
const isImageFormat = (value: unknown): value is ImageFormat =>
  (VALID_IMAGE_FORMATS as readonly unknown[]).includes(value);

/**
 * Versions <= 2.15.1 wrote the format to localStorage as a raw string
 * (e.g. `jpg`) instead of JSON (`"jpg"`). The default JSON storage fails to
 * parse that and silently falls back to "png", so the chosen format was lost
 * on every restart. Accept both forms and ignore anything that isn't a valid
 * format.
 */
const imageFormatStorage = {
  getItem: (key: string, initialValue: ImageFormat): ImageFormat => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return initialValue;
    let value: unknown = storedValue;
    try {
      value = JSON.parse(storedValue);
    } catch {
      // Legacy raw string value
    }
    return isImageFormat(value) ? value : initialValue;
  },
  setItem: (key: string, value: ImageFormat) =>
    localStorage.setItem(key, JSON.stringify(value)),
  removeItem: (key: string) => localStorage.removeItem(key),
};

export const saveImageAsAtom = atomWithStorage<ImageFormat>(
  "saveImageAs",
  "png",
  imageFormatStorage,
);

export const scaleAtom = atomWithStorage<string>("scale", "4");

export const batchModeAtom = atom<boolean>(false);

/**
 * The path to the last folder the user saved an image to.
 * Reset to "" if rememberOutputFolder is false.
 */
export const savedOutputPathAtom = atomWithStorage<string | null>(
  "savedOutputPath",
  null,
);

export const progressAtom = atom<string>("");

export const rememberOutputFolderAtom = atomWithStorage<boolean>(
  "rememberOutputFolder",
  false,
);

export const dontShowCloudModalAtom = atomWithStorage<boolean>(
  "dontShowCloudModal",
  false,
);

export const noImageProcessingAtom = atomWithStorage<boolean>(
  "noImageProcessing",
  false,
);

export const compressionAtom = atomWithStorage<number>("compression", 0);

export const overwriteAtom = atomWithStorage("overwrite", false);

export const turnOffNotificationsAtom = atomWithStorage(
  "turnOffNotifications",
  false,
);

export const ttaModeAtom = atomWithStorage("ttaMode", false);

export const viewTypeAtom = atomWithStorage<"slider" | "lens">(
  "viewType",
  "slider",
);

export const lensSizeAtom = atomWithStorage<number>("lensSize", 100);

export const customWidthAtom = atomWithStorage<number>("customWidth", 0);

export const useCustomWidthAtom = atomWithStorage<boolean>(
  "useCustomWidth",
  false,
);

export const tileSizeAtom = atomWithStorage<number | null>("tileSize", null);

// CLIENT SIDE ONLY
export const showSidebarAtom = atomWithStorage("showSidebar", true);

export const autoUpdateAtom = atomWithStorage("autoUpdate", true);

export const enableContributionAtom = atomWithStorage(
  "enableContribution",
  true,
);

export const userStatsAtom = atomWithStorage("userStats", {
  totalUpscayls: 0,
  doubleUpscayls: 0,
  batchUpscayls: 0,
  imageUpscayls: 0,
  averageUpscaylTime: 0,
  lastUpscaylDuration: 0,
  lastUsedAt: 0,
});

export const copyMetadataAtom = atomWithStorage<boolean>(
  "copyMetadata",
  false,
);
