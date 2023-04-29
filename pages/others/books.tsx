import { useRouter } from "next/router";

import Template from "components/Template";
import { Website } from "shared/config/website-config";

export default function OthersBooks() {
  const router = useRouter();
  const { asPath: currentPath } = router;
  return (
    <Template activeWebsite={Website.PERSONAL} path={currentPath}>
      <p>
        This page shares the books that I have read, am reading or wish to read.
        Most of the books are in Chinese, so the content below are mostly in
        Chinese only.
      </p>
      <ul>
        <li>Computer Technology</li>
        <ul>
          <li>
            <a href="https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321">
              Designing Data-Intensive Applications
            </a>
          </li>
          <ul>
            <li>
              Definitely recommend this book if you are preparing for system
              design interviews.
            </li>
          </ul>
        </ul>
        <li>History/Politics</li>
        <ul>
          <li>徐中約 - 中國近代史 (下冊)</li>
          <li>徐賁 - 暴政史: 二十世紀的權力與民眾</li>
        </ul>
        <li>Fiction</li>
        <ul>
          <li>衛斯理 - 大廈 (舊封面)</li>
          <li>衛斯理 - 鑽石花 (舊封面)</li>
          <li>金庸 - 射雕英雄傳</li>
          <li>金庸 - 倚天屠龍記</li>
          <li>George Orwell - 1984</li>
          <li>George Orwell 著 / 劉紹銘 譯 - 一九八四</li>
        </ul>
        <li>Language</li>
        <ul>
          <li>
            <a href="https://www.amazon.com/Integrated-Approach-Intermediate-Japanese-Revised/dp/4789013073/">
              中級の日本語 An Integrated Approach to Intermediate Japanese
            </a>
          </li>
          <ul>
            <li>
              I used this book to prepare for part of my JLPT N3 test in
              December 2019, but I probably need to re-read the book as I start
              to forget many of the vocabuary and grammar.
            </li>
          </ul>
        </ul>
      </ul>
    </Template>
  );
}
