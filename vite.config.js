import { resolve } from "path";
import { defineConfig } from "vite";
import vitePluginPug from "./plugins/pug/vite-plugin-pug";

// HTMLの複数出力を自動化する
//./src配下のファイル一式を取得
import fs from "fs";
const fileNameList = fs.readdirSync(resolve(__dirname, "./src/"));

//htmlファイルのみ抽出
const htmlFileList = fileNameList.filter((file) => /.pug$/.test(file));

//build.rollupOptions.inputに渡すオブジェクトを生成
const inputFiles = {};
for (let i = 0; i < htmlFileList.length; i++) {
  const file = htmlFileList[i];
  inputFiles[file.slice(0, -5)] = resolve(__dirname, "./src/" + file);
  /*
    この形を自動的に作る
    input:{
      index: resolve(__dirname, './src/index.html'),
      list: resolve(__dirname, './src/list.html')
    }
  */
}

export default defineConfig({
  root: "src",
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      // input: {
      //   main: resolve(__dirname, "src", "index.pug"),
      //   /*
      //     複数HTMLページを出力したい時にここへ追記していく
      //     xxx: resolve(__dirname, './src/xxx.html'),
      //   */
      // },
      input: inputFiles,
    },
  },
  plugins: [vitePluginPug()],
});
