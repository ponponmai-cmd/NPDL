# 花蓮高中 NPDL

國立花蓮高級中學的 [New Pedagogies for Deep Learning](https://deep-learning.global/) 資源站。深度學習在這裡是教育框架，不是人工智慧的 deep learning。

站上整理的是花中已經公開的材料：

- 六項素養的說明，以及花中資源板上的中英說法
- 墨爾本大學學生問卷的複製連結，和一份只留在瀏覽器裡的課堂快問
- 教案格式的下載入口（檔案本體在 [花中 NPDL 資源板](https://padlet.com/hualiangaozhong4/npdl-9z58bfhxc2zj038m)）
- 歷年課程檔案目錄
- 學校願景、學生圖像，以及和六項素養的備課對照
- 《參與世界，改變世界》的短介。簡報和讀書會分享尚未放入

設計工坊仍可用來寫自己的備課稿。稿子只存在這台瀏覽器的 localStorage。課程示例只放花中資源板上的教案，並標出已經對上的全球素養，以及下一步可以設計的素養。下一步是備課建議，不是課程發展委員會的決議。

本站不是全球夥伴或臺灣 EDL 學校聯盟的官方網站。正式學習進程與墨爾本大學問卷請用原檔。願景和學生圖像以[校長室頁面](https://www.hlhs.hlc.edu.tw/principal/content?a=T0RESU1qWXlOVEl5TkRjPTJRRE96QWpOeGNsVGludGVseQ%3D%3D)和學校課程計畫為準。

## 本地執行

需要 Node.js 20 以上。

```bash
npm install
npm run dev
```

開發伺服器預設在 [http://127.0.0.1:43123](http://127.0.0.1:43123)。

推上 `main` 之後，GitHub Actions 會把靜態網站發佈到 [https://ponponmai-cmd.github.io/NPDL/](https://ponponmai-cmd.github.io/NPDL/)。這個網址跟倉庫一起留著，不會過期。

```bash
npm run lint
npm run build
npm start
```
