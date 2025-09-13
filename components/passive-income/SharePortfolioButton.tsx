import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import {
  Holding,
  SecurityDataProvider,
} from "shared/types/passive-income-types";
import { compressHoldings } from "shared/util/passive-income-utils";

type PropType = {
  apiKey: string;
  provider: SecurityDataProvider;
  holdings: Array<Holding>;
};

export default function SharePortfolioButton({
  apiKey,
  provider,
  holdings,
}: PropType) {
  const urlTextInputRef = useRef<HTMLInputElement | null>(null);
  const [show, setShow] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const handleShare = () => {
    const encoded = compressHoldings(holdings);
    const baseUrl = `${location.protocol}//${location.hostname}${location.pathname}`;
    const queries = new URLSearchParams({
      key: apiKey,
      holdings: encoded,
      provider,
    });
    const url = `${baseUrl}?${queries.toString()}`;

    setShareUrl(url);
    setShow(true);
  };

  const handleCopy = async () => {
    try {
      urlTextInputRef?.current?.select();
      await navigator.clipboard.writeText(shareUrl);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <Button
        disabled={holdings.length === 0}
        variant="outline-primary"
        onClick={handleShare}
      >
        <FontAwesomeIcon
          icon={faLink}
          style={{
            marginRight: "4px",
          }}
        />
        Share
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Shareable Link to Portfolio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <FormControl
              type="input"
              onFocus={() => urlTextInputRef?.current?.select()}
              ref={urlTextInputRef}
              value={shareUrl}
              readOnly
            />
            <Button variant="secondary" onClick={handleCopy}>
              Copy
            </Button>
          </InputGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}
