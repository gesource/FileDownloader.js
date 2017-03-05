import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";

// ダウンロードしたファイルを保存するディレクトリ
const download_dir = path.join(process.cwd(), "images");
// ディレクトリを作成する
if (!fs.existsSync(download_dir)) {
    fs.mkdirSync(download_dir);
}

// URLからファイル名を取得する
const get_filename_from_url = (url: string): string => {
    const filename = path.basename(url);
    const query_index = filename.indexOf("?");
    return query_index === -1
        ? filename
        : filename.substr(0, query_index);
};

// URLを受け取り、該当するファイルをダウンロードして保存する
const download = (url: string, filename: string) => {
    fetch(url, { method: "GET" }).then((response) => {
        console.log(`OK: ${filename}`);
        response.body.pipe(fs.createWriteStream(filename));
    }).catch((error) => console.log(`error:${url} ${error}`));
};

// 1行1URLのテキストファイルを読み込み、1行ずつdownload()を実行する
fs.readFile(process.argv[2],
    {encoding: "utf-8"},
    function(err, text) {
        text.trim().split(/\r\n|\r|\n/).forEach(
            (line: string) => {
                const filename = path.join(
                    download_dir,
                    get_filename_from_url(line));
                download(line, filename);
            }
        );
    }
);

