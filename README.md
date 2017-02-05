# FileDownloader.js

## ## Description

Webからファイルをダウンロードします。

Download the file from the web.

## Requirement

* TypeScript

## Install

   npm install
   tsc file_downloader.ts

## Usage

ダウンロードするファイルのURLをテキストファイルに記述します。

Write the URL of the file to be downloaded in a text file.

example: url.txt

    http://www.example.com/image/bunner.png
    http://www.example.com/logo/logo.gif
    ...

次のコマンドを実行します。

Execute the following command.

    node file_downloader.js url.txt

imagesディレクトリにダウンロードしたファイルが保存されます。

The downloaded file is saved in the images directory.

