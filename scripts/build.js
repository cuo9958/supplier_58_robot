const packager = require("electron-packager");
const package = require("../package.json");
const path = require("path");

const configs = {
    name: "测试APP",
    // all: true,
    appBundleId: "com.guofangchao.supplier_58_robot",
    appCopyright: "supplier_58_robot",
    appVersion: package.version,
    arch: "x64", //ia32 x64 armv7l arm64 (Electron 1.8.0 and above)  mips64el
    dir: path.resolve(__dirname, "../src"),
    extraResource: path.resolve(__dirname, "../dist"),
    // icon: "",
    // ignore: "",
    out: path.resolve(__dirname, "../bundle"),
    overwrite: true,
    platform: "win32", //darwin (macOS) linux  mas (macOS, Store) win32
    // platform: "darwin", //darwin (macOS) linux  mas (macOS, Store) win32
};
async function bundleElectronApp() {
    const appPaths = await packager(configs);
    console.log(`Electron app bundles created:\n${appPaths.join("\n")}`);
}
bundleElectronApp();
