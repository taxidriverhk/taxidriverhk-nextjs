import Link from "next/link";
import { useRouter } from "next/router";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import ImageCarousel from "components/ImageCarousel";
import Template from "components/Template";
import { Website } from "shared/config/website-config";

export default function Omsi() {
  const router = useRouter();
  const currentPath = router.asPath;
  return (
    <Template
      activeWebsite={Website.OMSI}
      path={currentPath}
      showBreadcrumb={false}
    >
      <Alert variant="warning">
        <Alert.Heading>Notice 通知</Alert.Heading>
        <p className="mb-1">
          <strong>2025-06-27</strong>
        </p>
        <p>
          Many links in the installation manual are dead. Use the{" "}
          <Alert.Link href="https://docs.google.com/spreadsheets/d/1KLUPRLBWknGHFoHeebCyolNIxAMyWZFl6deW3x5ZawY/edit?usp=sharing">
            Google Spreadsheet
          </Alert.Link>{" "}
          below for community-maintained download links instead.
          安裝手冊內不少連結已失效，請改用下方{" "}
          <Alert.Link href="https://docs.google.com/spreadsheets/d/1KLUPRLBWknGHFoHeebCyolNIxAMyWZFl6deW3x5ZawY/edit?usp=sharing">
            Google 試算表
          </Alert.Link>
          ，內有社群整理的下載連結。
        </p>
        <hr />
        <p className="mb-1">
          <strong>2023-04-28</strong>
        </p>
        <p>
          You may freely use the scenery objects and splines in your own maps,
          or fork this map for your own development, as long as a credit is
          given to the original author.
          各位毋須得到本人同意即可使用本地圖物件或繼續開發，惟請註明原作者。
        </p>
      </Alert>
      <h3>About</h3>
      <p>
        <Link href="https://store.steampowered.com/app/252530/OMSI_2_Steam_Edition/">
          OMSI
        </Link>{" "}
        is a bus driving simulator by MR-Software that has been popular in Hong
        Kong bus enthusiast communities since its 2011 release, thanks to its
        flexibility for creating custom vehicles and maps.
      </p>
      <p>
        This is a personal hobby workshop focused on recreating real Hong Kong
        routes in OMSI. The only project to date is{" "}
        <strong>Hong Kong West Kowloon</strong>, a map covering key streets such
        as Nathan Road and Cheung Sha Wan Road. Development began in 2012 and
        the latest expansion, covering East Tsim Sha Tsui, was released in
        August 2018.
      </p>
      <p>
        Further development has been on hold since 2018, pending whether{" "}
        <Link href="https://www.lotus-simulator.de/index.php?landingpage-en/">
          LOTUS
        </Link>{" "}
        establishes itself as the next-generation simulator. The map may be
        migrated to LOTUS or a new map started if that happens. The original
        planned roadmap is available on{" "}
        <Link href="https://www.google.com/maps/d/u/0/edit?mid=1x5E60mp7bYjpAcWFcfsbIpHLdII&ll=22.31762025302199%2C114.1652401&z=14">
          Google My Maps
        </Link>
        .
      </p>
      <h3>Gallery</h3>
      <ImageCarousel
        images={[
          {
            caption: "Cross Harbour Tunnel",
            url: "https://live.staticflickr.com/65535/49397881351_c8b5334b17_b.jpg",
          },
          {
            caption: "Hung Hom Station",
            url: "https://live.staticflickr.com/65535/49397881036_b0d1e729f4_o_d.jpg",
          },
          {
            caption: "Tsim Sha Tsui Star Ferry",
            url: "https://live.staticflickr.com/65535/49398093302_ef3aca179e_o_d.jpg",
          },
          {
            caption: "Hung Hom Road",
            url: "https://live.staticflickr.com/65535/49397881006_c86b25e58f_o_d.jpg",
          },
          {
            caption: "Whampoa Garden",
            url: "https://live.staticflickr.com/65535/49398093577_ac884a528c_o_d.jpg",
          },
          {
            caption: "Chatham Road North",
            url: "https://live.staticflickr.com/65535/49397405248_80b6f8f816_o_d.jpg",
          },
          {
            caption: "Chatham Road South",
            url: "https://live.staticflickr.com/65535/49398093562_5d27e560dc_o_d.jpg",
          },
          {
            caption: "Hung Hom Bypass",
            url: "https://live.staticflickr.com/65535/49397405243_7998416718_o_d.jpg",
          },
          {
            caption: "To Kwa Wan Road",
            url: "https://live.staticflickr.com/65535/49397429568_bbcd893a0e_o_d.jpg",
          },
          {
            caption: "Shing Tak Street Bus Terminus",
            url: "https://live.staticflickr.com/65535/49398093352_351eb60dcc_o_d.jpg",
          },
          {
            caption: "Ma Tau Chung Road",
            url: "https://live.staticflickr.com/65535/49398093567_1799f1dc1a_o_d.jpg",
          },
          {
            caption: "Fu Cheong Estate",
            url: "https://live.staticflickr.com/65535/49398118337_b1bbcf5a85_o_d.jpg",
          },
          {
            caption: "Lai Chi Kok Road",
            url: "https://live.staticflickr.com/65535/49397906286_4af70c260c_o_d.jpg",
          },
        ]}
      />
      <h3>Downloads</h3>
      <Card>
        <Card.Body>
          <Card.Title>Hong Kong West Kowloon</Card.Title>
          <Card.Subtitle>
            This map is compatible with OMSI version 2.2.032 or above only.
          </Card.Subtitle>
          <Table responsive>
            <tbody>
              <tr>
                <td>Addon Type</td>
                <td>Map</td>
              </tr>
              <tr>
                <td>Version</td>
                <td>3.00</td>
              </tr>
              <tr>
                <td>Date Released</td>
                <td>2018-08-01</td>
              </tr>
              <tr>
                <td>Bus Routes</td>
                <td>KMB Route Numbers 2, 5A, 6C, 6F, 8A and 8P</td>
              </tr>
              <tr>
                <td>Download Links and Installation Instructions</td>
                <td>
                  <Link href="https://docs.google.com/spreadsheets/d/1KLUPRLBWknGHFoHeebCyolNIxAMyWZFl6deW3x5ZawY/edit?usp=sharing">
                    Enter (.xlsx) - Google Drive
                  </Link>
                  <br />
                  <Link href={`${currentPath}/hkwk_3.00_manual_en.html`}>
                    Enter (.html) - some of the links are dead
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Template>
  );
}
