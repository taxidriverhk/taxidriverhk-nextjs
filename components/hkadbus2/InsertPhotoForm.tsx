import capitalize from "lodash/capitalize";
import { Typeahead } from "react-bootstrap-typeahead";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import { useState } from "react";
import { Option } from "react-bootstrap-typeahead/types/types";
import {
  PutPhotoRequest,
  TypeaheadOptionType,
} from "shared/types/hkadbus2-types";

import type { TypeaheadOption } from "components/hkadbus2/InsertPhotoFormTypeahead";
import InsertPhotoFormTypeahead from "components/hkadbus2/InsertPhotoFormTypeahead";

export type TypeaheadOptionItems = {
  en_us: {
    [hashKey: string]: string;
  };
  zh_hk: {
    [hashKey: string]: string;
  };
};

type PropType = {
  apiKey: string;
  typeaheadOptions: {
    [entityType: string]: TypeaheadOptionItems;
  };
  onSubmit: (payload: PutPhotoRequest) => void;
};

export default function InsertPhotoForm({
  apiKey,
  typeaheadOptions,
  onSubmit,
}: PropType) {
  const [busBrandHashKey, setBusBrandHashKey] = useState<string>("");
  const [busRouteNumber, setBusRouteNumber] = useState<string>("");
  const [fleetPrefix, setFleetPrefix] = useState<string>("");
  const [fleetNumber, setFleetNumber] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [licensePlateNumber, setLicensePlateNumber] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [advertisement, setAdvertisement] = useState<TypeaheadOption | null>(
    null
  );
  const [busCompany, setBusCompany] = useState<Array<Option>>([]);
  const [busModel, setBusModel] = useState<TypeaheadOption | null>(null);
  const [busRoute, setBusRoute] = useState<TypeaheadOption | null>(null);
  const [category, setCategory] = useState<TypeaheadOption | null>(null);

  const handleOnChange =
    (setter: (nextValue: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.currentTarget.value);
    };
  const handleOnSubmit = () => {
    // const payload: PutPhotoRequest = {
    //   advertisementId: advertisementHashKey,
    //   advertisementNames: {
    //     en_us: advertisementEn.toString(),
    //     zh_hk: advertisementZh.toString(),
    //   },
    //   busBrandId: busBrandHashKey
    //   busBrandNames: PutPhotoRequestString;
    //   busModelId: string;
    //   busModelNames: PutPhotoRequestString;
    //   busCompany: BusCompany;
    //   routeNumber: string;
    //   busRouteId: string;
    //   busRouteStartLocationNames: PutPhotoRequestString;
    //   busRouteEndLocationNames: PutPhotoRequestString;
    //   categoryId: string;
    //   categoryNames: PutPhotoRequestString;
    //   fleetPrefix: string;
    //   fleetNumber: string;
    //   image: string;
    //   licensePlateNumber: string;
    //   thumbnail: string;
    //   username: string;
    // };
    // onSubmit(payload);
  };

  return (
    <Card bg="light">
      <Card.Header>Photo Insertion Form</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>API Key</Form.Label>
            <Form.Control disabled type="text" value={apiKey} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            {imageUrl != null ? (
              <Image alt="photo" src={imageUrl} fluid />
            ) : null}
            <Form.Control
              onChange={handleOnChange((nextValue) => setImageUrl(nextValue))}
              type="text"
              value={imageUrl}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <InsertPhotoFormTypeahead
              id={TypeaheadOptionType.CATEGORY}
              isMultilingual
              onChange={setCategory}
              options={typeaheadOptions[TypeaheadOptionType.CATEGORY]}
              selectedOption={category}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Advertisement</Form.Label>
            <InsertPhotoFormTypeahead
              id={TypeaheadOptionType.ADVERTISEMENT}
              isMultilingual
              onChange={setAdvertisement}
              options={typeaheadOptions[TypeaheadOptionType.ADVERTISEMENT]}
              selectedOption={advertisement}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bus Brand Hash Key</Form.Label>
            <Form.Control
              onChange={handleOnChange((nextValue) =>
                setBusBrandHashKey(nextValue)
              )}
              type="text"
              value={busBrandHashKey}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bus Model</Form.Label>
            <InsertPhotoFormTypeahead
              customLabelFunc={(id: string, label: string) =>
                `${capitalize(
                  getBusBrandHashKeyByBusModelHashKey(id)
                )} ${label}`
              }
              id={TypeaheadOptionType.BUS_MODEL}
              isMultilingual
              onChange={(nextOption: TypeaheadOption) => {
                setBusModel(nextOption);
                setBusBrandHashKey(
                  getBusBrandHashKeyByBusModelHashKey(nextOption.key)
                );
              }}
              options={typeaheadOptions[TypeaheadOptionType.BUS_MODEL]}
              selectedOption={busModel}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>License Plate Number</Form.Label>
            <Form.Control
              onChange={handleOnChange((nextValue) =>
                setLicensePlateNumber(nextValue)
              )}
              type="text"
              value={licensePlateNumber}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fleet Number</Form.Label>
            <InputGroup>
              <Form.Control
                onChange={handleOnChange((nextValue) =>
                  setFleetPrefix(nextValue)
                )}
                placeholder="Prefix"
                type="text"
                value={fleetPrefix}
              />
              <Form.Control
                onChange={handleOnChange((nextValue) =>
                  setFleetNumber(nextValue)
                )}
                placeholder="Number"
                type="text"
                value={fleetNumber}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Bus Company</Form.Label>
            <Typeahead
              id={`bus-company`}
              onChange={setBusCompany}
              options={[
                {
                  id: "kmb",
                  label: "KMB",
                },
                {
                  id: "ctb",
                  label: "CTB",
                },
                {
                  id: "nwfb",
                  label: "NWFB",
                },
                {
                  id: "cmb",
                  label: "CMB",
                },
              ]}
              selected={busCompany}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bus Route Hash Key</Form.Label>
            <InsertPhotoFormTypeahead
              customLabelFunc={(id: string, _: string) => id}
              id={TypeaheadOptionType.ROUTE}
              onChange={(nextOption: TypeaheadOption) => {
                setBusRoute(nextOption);
                setBusRouteNumber(
                  getBusRouteNumberByBusRouteHashKey(nextOption.key)
                );
              }}
              options={typeaheadOptions[TypeaheadOptionType.ROUTE]}
              selectedOption={busRoute}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bus Route Number</Form.Label>
            <Form.Control
              onChange={handleOnChange((nextValue) =>
                setBusRouteNumber(nextValue)
              )}
              placeholder="49X"
              type="text"
              value={busRouteNumber}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username (must already exist in database)</Form.Label>
            <Form.Control
              onChange={handleOnChange((nextValue) => setUsername(nextValue))}
              type="text"
              value={username}
            />
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Row className="justify-content-md-end">
          <Button onClick={handleOnSubmit}>Submit</Button>
        </Row>
      </Card.Footer>
    </Card>
  );
}

function getBusBrandHashKeyByBusModelHashKey(
  busModelHashKey: string | null
): string {
  const busBrand = busModelHashKey?.split("-")[0];
  // Special case for MCW
  if (busBrand === "metrobus") {
    return "mcw";
  } else if (busBrand != null) {
    return busBrand;
  }
  return "";
}

function getBusRouteNumberByBusRouteHashKey(
  busRouteHashKey: string | null
): string {
  const busRouteTokens = busRouteHashKey?.split("-");
  const lastToken =
    busRouteTokens != null ? busRouteTokens[busRouteTokens.length - 1] : "";
  if (lastToken != null) {
    return lastToken.toUpperCase();
  }
  return "";
}
