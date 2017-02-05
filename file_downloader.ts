import * as fs from 'fs';
import * as path from 'path';
import * as request from 'request';

// ダウンロードしたファイルを保存するディレクトリ
const download_dir = path.join(process.cwd(), 'images');
// ディレクトリを作成する
fs.mkdirSync(download_dir);

// URLからファイル名を取得する
const get_filename_from_url = (url: string): string => {
    const filename = path.basename(url);
    const query_index = filename.indexOf('?');
    return query_index == -1
        ? filename 
        : filename.substr(0, query_index);
}

// URLを受け取り、該当するファイルをダウンロードして保存する
const download = (url: string, filename: string) => {
    request(
        {method: 'GET', url: url, encoding: null},
        (error, response, body) => {
            if(!error && response.statusCode === 200){
                console.log('OK:' + filename);
                fs.writeFileSync(filename, body, 'binary');
            } else {
                console.log('error:' + url);
            }
        }
    );
}

// 1行1URLのテキストファイルを読み込み、1行ずつdownload()を実行する
fs.readFile(process.argv[2], 
    {encoding: 'utf-8'}, 
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

