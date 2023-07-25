import capitalize from "lodash/capitalize";
import { Typeahead } from "react-bootstrap-typeahead";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import { useState } from "react";
import { Option } from "react-bootstrap-typeahead/types/types";
import {
  BusCompany,
  PutPhotoRequest,
  PutPhotoRequestString,
  TypeaheadOptionType,
} from "shared/types/hkadbus2-types";

import type { TypeaheadOption } from "components/hkadbus2/InsertPhotoFormTypeahead";
import InsertPhotoFormTypeahead from "components/hkadbus2/InsertPhotoFormTypeahead";

const BRAND_NAME_MAPPING: Map<string, PutPhotoRequestString> = new Map<
  string,
  PutPhotoRequestString
>([
  ["dennis", { en_us: "Dennis", zh_hk: "丹尼士" }],
  ["daimler", { en_us: "Daimler", zh_hk: "丹拿" }],
  ["guy", { en_us: "Guy", zh_hk: "佳牌" }],
  ["leyland", { en_us: "Leyland", zh_hk: "利蘭" }],
  ["man", { en_us: "MAN", zh_hk: "猛獅" }],
  ["mitsubishi", { en_us: "Mitsubishi", zh_hk: "三菱" }],
  ["mcw", { en_us: "MCW", zh_hk: "都城嘉慕" }],
  ["mercedes-benz", { en_us: "Mercedes Benz", zh_hk: "梅斯特斯平治" }],
  ["volvo", { en_us: "Volvo", zh_hk: "富豪" }],
]);

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
  error: Error | null;
  photoId: number | null;
  typeaheadOptions: {
    [entityType: string]: TypeaheadOptionItems;
  };
  onSubmit: (payload: PutPhotoRequest) => void;
};

export default function InsertPhotoForm({
  apiKey,
  error,
  photoId,
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
  const [endLocation, setEndLocation] = useState<TypeaheadOption | null>(null);
  const [startLocation, setStartLocation] = useState<TypeaheadOption | null>(
    null
  );

  const handleOnChange =
    (setter: (nextValue: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.currentTarget.value);
    };
  const handleOnSubmit = () => {
    const busCompanyLabel: keyof typeof BusCompany = (
      busCompany as Array<any>
    )[0]["label"];
    const busCompanyEnum: BusCompany = BusCompany[busCompanyLabel];
    const busModelNameEn = removeBrandNameFromModelEnglishName(
      busModel!.en_us!
    );

    const payload: PutPhotoRequest = {
      advertisementId: buildHashKeyFromEnglishName(advertisement!)!,
      advertisementNames: {
        en_us: advertisement!.en_us!,
        zh_hk: advertisement!.zh_hk!,
      },
      busBrandId: busBrandHashKey,
      busBrandNames: BRAND_NAME_MAPPING.get(busBrandHashKey)!,
      busModelId: buildHashKeyFromEnglishName(busModel!)!,
      busModelNames: {
        en_us: busModelNameEn,
        zh_hk: busModel!.zh_hk!,
      },
      busCompany: busCompanyEnum,
      routeNumber: busRouteNumber,
      busRouteId: busRoute!.en_us!,
      busRouteStartLocationNames: {
        en_us: startLocation!.en_us!,
        zh_hk: startLocation!.zh_hk!,
      },
      busRouteEndLocationNames: {
        en_us: endLocation!.en_us!,
        zh_hk: endLocation!.zh_hk!,
      },
      categoryId: buildHashKeyFromEnglishName(category!)!,
      categoryNames: {
        en_us: category!.en_us!,
        zh_hk: category!.zh_hk!,
      },
      fleetPrefix,
      fleetNumber,
      image: imageUrl,
      licensePlateNumber,
      thumbnail: imageUrl,
      username,
    };
    onSubmit(payload);
  };

  return (
    <Card bg="light">
      <Card.Header>Photo Insertion Form</Card.Header>
      <Card.Body>
        {photoId != null && (
          <Alert variant="success">
            Inserted photo successfully with ID {photoId}
          </Alert>
        )}
        <Form>
          <Form.Group>
            <Form.Label>API Key</Form.Label>
            <Form.Control disabled type="text" value={apiKey} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Card bg="dark" text="white">
              {imageUrl != null && imageUrl.length > 0 ? (
                <Card.Img alt="photo" src={imageUrl} variant="top" />
              ) : (
                <Card.Body>Image to be Shown Here</Card.Body>
              )}
            </Card>
            <Form.Control
              onChange={handleOnChange((nextValue) => setImageUrl(nextValue))}
              placeholder="Image URL"
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
              synchronizeOptions
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
              synchronizeOptions
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
              synchronizeOptions
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
                  id: "cmb",
                  label: "CMB",
                },
                {
                  id: "ctb",
                  label: "CTB",
                },
                {
                  id: "lwb",
                  label: "LWB",
                },
                {
                  id: "nwfb",
                  label: "NWFB",
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
            <Form.Label>Bus Route Destinations</Form.Label>
            <Card>
              <Card.Body>
                <Form.Label>Start Location</Form.Label>
                <InsertPhotoFormTypeahead
                  id={TypeaheadOptionType.LOCATION}
                  isMultilingual
                  onChange={setStartLocation}
                  options={typeaheadOptions[TypeaheadOptionType.LOCATION]}
                  selectedOption={startLocation}
                  synchronizeOptions
                />
                <Form.Label>End Location</Form.Label>
                <InsertPhotoFormTypeahead
                  id={TypeaheadOptionType.LOCATION}
                  isMultilingual
                  onChange={setEndLocation}
                  options={typeaheadOptions[TypeaheadOptionType.LOCATION]}
                  selectedOption={endLocation}
                  synchronizeOptions
                />
              </Card.Body>
            </Card>
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
        {error != null && (
          <Alert variant="danger">
            Error occurred when inserting photos {error.message}. Please try
            again
          </Alert>
        )}
      </Card.Footer>
    </Card>
  );
}

function buildHashKeyFromEnglishName(option: TypeaheadOption): string | null {
  // Use the existing key if not a new one
  if (option?.key != null && !option.key?.includes("new-id-")) {
    return option.key;
  }
  // First remove non-alphanumeric characters (except for space), then replace the spaces with a hyphen
  return option.en_us != null
    ? option.en_us
        ?.toLowerCase()
        .replace(/[^a-zA-Z0-9\.\s]/gi, "")
        .replace(/\s/g, "-")
    : null;
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

function removeBrandNameFromModelEnglishName(name: string): string {
  return name.split(" ").slice(1).join(" ");
}
