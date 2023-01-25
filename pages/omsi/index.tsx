import Link from "next/link";
import { useRouter } from "next/router";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import ImageCarousel from "components/ImageCarousel";
import Template from "components/Template";

export default function Omsi() {
  const router = useRouter();
  const currentPath = router.asPath;
  return (
    <Template activeItemIndex={1} path={currentPath} showBreadcrumb={false}>
      <Alert variant="warning">
        <Alert.Heading>Attention 注意</Alert.Heading>
        <p>
          In the past months, I have got multiple emails and messages asking for
          permission to use the scenery objects from HKWK map for their own OMSI
          map creations. I would like to re-state that approvals are not
          required when using the scenery objects (except for
          intersection/crossing objects) and splines made by me. Please feel
          free to use them on your own map, as long as the map is published with
          a name other than Hong Kong West Kowloon (or similar names).
        </p>
        <p>
          在過去這幾個月&#xFF0C;本人不斷收到網民詢問可否獲得批准使用西九龍地圖的物件以供製作其他OMSI地圖&#x9FD;
          本人再次重申&#xFF0C;除了路口及交界物件外&#xFF0C;其他建築物及道路物件均可以在毋須得到本人批准下使用在以其他名稱
          (非以Hong Kong West Kowloon作為名稱) 發佈的地圖上&#x9FD;
        </p>
      </Alert>
      <h3>About</h3>
      <p>
        <Link href="https://store.steampowered.com/app/252530/OMSI_2_Steam_Edition/">
          OMSI
        </Link>{" "}
        is a very popular bus driving simulator developed by MR-Software. Since
        its initial release in 2011, it has become popular in the Hong Kong bus
        driving simulation groups due to its extensibility and flexibility which
        allows content creators for developing various vehicle and map add-ons.
      </p>
      <p>
        This workshop, with me as the only amateur maker, aims to create
        real-life OMSI maps in Hong Kong where players can simulate the bus
        driving experience.
      </p>
      <p>
        Hong Kong West Kowloon is so far the only planned and ongoing project,
        this map covers the main streets in West Kowloon including Nathan Road,
        Cheung Sha Wan Road, etc. The development has started since 2012, and
        expansions are split into different phases. Expansion for East Tsim Sha
        Tsui was completed in August 2018.
      </p>
      <p>
        Further expansion has been paused, as{" "}
        <Link href="https://www.lotus-simulator.de/index.php?landingpage-en/">
          LOTUS
        </Link>{" "}
        could become the next generation of bus simulation within the next few
        years (just like what happend when OMSI was out back in 2011 that almost
        replaced MM2). In which case, this map could be migrated to LOTUS and
        continue its expansion, or a different map might be created.
      </p>
      <p>
        If you are still interested in seeing the original expansion plan of
        Hong Kong West Kowloon, please visit this{" "}
        <Link href="https://www.google.com/maps/d/u/0/edit?mid=1x5E60mp7bYjpAcWFcfsbIpHLdII&ll=22.31762025302199%2C114.1652401&z=14">
          Google My Maps page
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
                  <Link href={`${currentPath}/hkwk_3.00_manual_en.html`}>
                    Enter (.html)
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
