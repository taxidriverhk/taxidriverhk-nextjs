import { Typeahead } from "react-bootstrap-typeahead";

import { useMemo } from "react";

type TypeaheadOptionItems = {
  en_us: {
    [hashKey: string]: string;
  };
  zh_hk: {
    [hashKey: string]: string;
  };
};

export type TypeaheadOption = {
  key: string | null;
  en_us: string | null;
  zh_hk: string | null;
};

type PropType = {
  customLabelFunc?: (id: string, label: string) => string;
  id: string;
  isMultilingual?: boolean;
  onChange: (nextOption: TypeaheadOption) => void;
  options: TypeaheadOptionItems;
  selectedOption?: TypeaheadOption | null;
};

export default function InsertPhotoFormTypeahead({
  customLabelFunc,
  id,
  isMultilingual = false,
  onChange,
  options,
  selectedOption,
}: PropType) {
  const [optionsEn, optionsZh] = useMemo(
    () => convertToTypeaheadOptions(options, customLabelFunc),
    [options, customLabelFunc]
  );
  const selectedOptionEn = useMemo(
    () =>
      selectedOption?.en_us != null
        ? [
            {
              id: selectedOption.key,
              label: selectedOption.en_us,
            },
          ]
        : [],
    [selectedOption]
  );
  const selectedOptionZh = useMemo(
    () =>
      selectedOption?.zh_hk != null
        ? [
            {
              id: selectedOption.key,
              label: selectedOption.zh_hk,
            },
          ]
        : [],
    [selectedOption]
  );

  const handleChange =
    (language: "en_us" | "zh_hk") => (nextOption: Array<any>) => {
      let nextSelectedOptionEn: Array<any> = [];
      let nextSelectedOptionZh: Array<any> = [];

      const nextId: string | null =
        nextOption.length > 0 ? nextOption[0]["id"] : null;
      const nextLabel: string | null =
        nextOption.length > 0 ? nextOption[0]["label"] : null;

      // Synchronize options of both languages if multilingual
      if (isMultilingual) {
        nextSelectedOptionEn = optionsEn.filter(
          (option) => option.id === nextId
        );
        nextSelectedOptionZh = optionsZh.filter(
          (option) => option.id === nextId
        );
      } else {
        nextSelectedOptionEn = optionsEn.filter(
          (option) => option.id === nextId
        );
      }

      // New entries provided or not multilingual, just use the input value and do not synchronize
      if (
        (language === "en_us" && nextSelectedOptionEn.length === 0) ||
        (language === "zh_hk" && nextSelectedOptionZh.length === 0)
      ) {
        const existingEnLabel =
          selectedOptionEn.length > 0 ? selectedOptionEn[0]["label"] : null;
        const existingZhLabel =
          selectedOptionZh.length > 0 ? selectedOptionZh[0]["label"] : null;

        onChange({
          key: nextId,
          en_us: language === "en_us" ? nextLabel : existingEnLabel,
          zh_hk: language === "zh_hk" ? nextLabel : existingZhLabel,
        });
      } else {
        const enLabel: string = nextSelectedOptionEn[0]["label"];
        const zhLabel: string | null = isMultilingual
          ? nextSelectedOptionZh[0]["label"]
          : null;

        onChange({
          key: nextId,
          en_us: enLabel,
          zh_hk: zhLabel,
        });
      }
    };

  return (
    <>
      <Typeahead
        allowNew
        id={`${id}-en`}
        onChange={handleChange("en_us")}
        options={optionsEn}
        placeholder="English"
        selected={selectedOptionEn}
      />
      {isMultilingual && (
        <Typeahead
          allowNew
          id={`${id}-zh`}
          onChange={handleChange("zh_hk")}
          options={optionsZh}
          placeholder="中文"
          selected={selectedOptionZh}
        />
      )}
    </>
  );
}

function convertToTypeaheadOptions(
  items: TypeaheadOptionItems,
  customLabelFunc?: (id: string, label: string) => string
): Array<
  Array<{
    id: string;
    label: string;
  }>
> {
  const { en_us, zh_hk } = items;
  return [
    Object.entries(en_us).map(([id, label]) => ({
      id,
      label: (() => {
        if (customLabelFunc != null) {
          return customLabelFunc(id, label);
        }
        return label;
      })(),
    })),
    Object.entries(zh_hk).map(([id, label]) => ({ id, label })),
  ];
}
