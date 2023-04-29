import { useRouter } from "next/router";

import Template from "components/Template";
import { Website } from "shared/config/website-config";

export default function OthersPagesAppleDaily() {
  const router = useRouter();
  const { asPath: currentPath } = router;
  return (
    <Template activeWebsite={Website.PERSONAL} path={currentPath}>
      <ul>
        <li>
          本頁主要收集香港蘋果日報閉館前的影片，以留作紀錄，所有影片都有在本地硬碟及雲端空間上備份。
          絕大多數均在2019年尾至2021年之間製作的片段。
          由於影片數目眾多，故難以作出太詳細的分類，網主會不定時分類及上傳，敬請見諒。
        </li>
        <ul>
          <li>
            動新聞 (為了安全著想，此類別影片暫不上傳，但檔案已在本地硬碟中備份)
          </li>
          <li>
            <a href="https://drive.google.com/drive/folders/1bM_vhcqU1Q1mEbWhLSrj3ePYbRyS_Siq?usp=sharing">
              果籽
            </a>
          </li>
          <li>
            <a href="https://drive.google.com/drive/folders/1lMZtoXOeXNQkl1cgvm72-bszW4AXcoOS?usp=sharing">
              飲食男女
            </a>
          </li>
          <li>
            <a href="https://drive.google.com/drive/folders/1foOmva3KUZBibP9yv1DzeJr2i4jQoOQ3?usp=sharing">
              全球樓行
            </a>
          </li>
          <li>
            <a href="https://drive.google.com/drive/folders/1AQzXw8Q4fg_MwyMwR9dG-nD6l_3Kpzje?usp=sharing">
              Invest Man
            </a>
          </li>
          <li>
            <a href="https://drive.google.com/drive/folders/1-96lq-ka132dMRNoEXkLh1UmAKElCnYq?usp=sharing">
              特別專輯
            </a>
          </li>
        </ul>
        <li>
          同一時間，亦請支持以下由蘋果日報原有班底組成的網上影片平台或頻道。
        </li>
        <ul>
          <li>
            <a href="https://www.youtube.com/@ricezi2hk">
              米紙 (部份前果籽成員組成)
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@flatout852">
              地板油 (部份前果籽成員組成，主要上載汽車相關影片)
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@hungrytvhk">
              餓底TV (部份前飲食男女成員組成)
            </a>
          </li>
        </ul>
      </ul>
    </Template>
  );
}
