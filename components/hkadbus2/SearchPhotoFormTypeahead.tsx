import { useMemo } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { TypeaheadOptionType } from "shared/types/hkadbus2-types";

type PropType = {
  customOnChangePreprocessor?: (nextOption: string) => string;
  customValueFunc?: (option: string) => string;
  entityType: TypeaheadOptionType;
  onChange: (nextOption: string | null) => void;
  options: Array<string>;
  selectedOption?: string | null;
  uppercase?: boolean;
};

export default function SearchPhotoFormTypeahead({
  customValueFunc = (option: string) => option,
  customOnChangePreprocessor,
  entityType,
  onChange,
  options,
  selectedOption,
  uppercase,
}: PropType) {
  const convertedOptions = useMemo(
    () =>
      options.sort().map((option) => ({
        id: option,
        label: customValueFunc(option),
      })),
    [customValueFunc, options]
  );
  const convertedSelectedOption = useMemo(
    () =>
      selectedOption != null
        ? [
            {
              id: selectedOption,
              label: customValueFunc(
                uppercase === true
                  ? selectedOption.toUpperCase()
                  : selectedOption
              ),
            },
          ]
        : [],
    [customValueFunc, selectedOption, uppercase]
  );

  const handleChange = (typedOption: Array<any>) => {
    const nextValue: string | null =
      typedOption.length > 0 ? typedOption[0]["id"] : null;
    const selectedOption = options.filter((option) => option === nextValue);
    const nextOption = selectedOption.length > 0 ? selectedOption[0] : null;
    if (nextOption != null && customOnChangePreprocessor != null) {
      onChange(customOnChangePreprocessor(nextOption));
    } else {
      onChange(nextOption);
    }
  };

  return (
    <Typeahead
      id={entityType}
      onChange={handleChange}
      options={convertedOptions}
      selected={convertedSelectedOption}
    />
  );
}
