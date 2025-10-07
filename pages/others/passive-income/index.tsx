import { useRouter } from "next/router";

import Template from "components/Template";
import { Website } from "shared/config/website-config";

import { useEffect, useReducer, useState } from "react";

import AddHoldingModal from "components/passive-income/AddHoldingModal";
import BatchAddHoldingsModal from "components/passive-income/BatchAddHoldingsModal";
import EstimatedDividendSchedule from "components/passive-income/EstimatedDividendSchedule";
import PortfolioBreakdown from "components/passive-income/PortfolioBreakdown";
import PortfolioFooter from "components/passive-income/PortfolioFooter";
import PortfolioHeader from "components/passive-income/PortfolioHeader";
import PortfolioSummary from "components/passive-income/PortfolioSummary";
import PortfolioTable from "components/passive-income/PortfolioTable";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next/types";
import { Alert } from "react-bootstrap";
import { fetchSecurityDataAsync } from "shared/fetch/passive-income";
import portfolioReducer, {
  ActionTypes,
  initialState,
} from "shared/reducers/passive-income-reducers";
import {
  AddHoldingInput,
  DividendFrequency,
  SecurityDataProvider,
} from "shared/types/passive-income-types";
import { decompressHoldings } from "shared/util/passive-income-utils";

type PropType = {
  initialApiKey: string | null;
  initialProvider: SecurityDataProvider | null;
  initialHoldingInputs: Array<AddHoldingInput> | null;
};

function PassiveIncomeBody({
  initialApiKey,
  initialProvider,
  initialHoldingInputs,
}: PropType) {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [showInitialInputPreviewModal, setShowInitialInputPreviewModal] =
    useState(false);
  const [apiKey, setApiKey] = useState(initialApiKey || "");
  const [provider, setProvider] = useState<SecurityDataProvider>(
    initialProvider || SecurityDataProvider.ALPHA_VANTAGE
  );

  useEffect(() => {
    if (initialHoldingInputs != null && initialHoldingInputs.length > 0) {
      setShowInitialInputPreviewModal(true);
    }
  }, [initialHoldingInputs]);

  const handleAddHolding = async (holding: AddHoldingInput) => {
    try {
      dispatch({ type: ActionTypes.FETCHING_HOLDINGS_DATA });
      const data = await fetchSecurityDataAsync(holding, provider, apiKey);
      const newHolding = {
        ...holding,
        ...data,
      };

      dispatch({ type: ActionTypes.ADD_HOLDING, payload: newHolding });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
      } else {
        dispatch({
          type: ActionTypes.API_ERROR,
          payload: "An unknown error occurred.",
        });
      }
    }
  };
  const handleRemoveHolding = (symbol: string) => {
    dispatch({ type: ActionTypes.REMOVE_HOLDING, payload: symbol });
  };

  const handleImportError = (error: string) => {
    dispatch({ type: ActionTypes.API_ERROR, payload: error });
  };
  const handleImportHoldings = async (
    holdingInputs: Array<AddHoldingInput>
  ) => {
    try {
      dispatch({ type: ActionTypes.FETCHING_HOLDINGS_DATA });
      const batchDataPromises = holdingInputs.map((holdingInput) =>
        fetchSecurityDataAsync(holdingInput, provider, apiKey)
      );
      const batchData = await Promise.all(batchDataPromises);
      const newHoldings = holdingInputs.map((holdingInput, index) => ({
        ...holdingInput,
        ...batchData[index],
      }));
      dispatch({ type: ActionTypes.BATCH_ADD_HOLDINGS, payload: newHoldings });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
      } else {
        dispatch({
          type: ActionTypes.API_ERROR,
          payload: "An unknown error occurred.",
        });
      }
    }
  };

  return (
    <>
      {state.error && (
        <Alert
          variant="danger"
          onClose={() =>
            dispatch({ type: ActionTypes.API_ERROR, payload: null })
          }
          dismissible
        >
          {state.error}
        </Alert>
      )}

      <PortfolioHeader
        apiKey={apiKey}
        provider={provider}
        disabled={state.loading}
        onAddHolding={() => setShowModal(true)}
        onApiKeyChange={setApiKey}
        onImportError={handleImportError}
        onImportHoldings={handleImportHoldings}
        onProviderChange={setProvider}
      />
      <hr />
      <PortfolioTable
        holdings={state.holdings}
        loading={state.loading}
        onRemove={handleRemoveHolding}
      />
      <hr />
      <PortfolioBreakdown holdings={state.holdings} loading={state.loading} />
      <hr />
      <EstimatedDividendSchedule
        holdings={state.holdings}
        loading={state.loading}
      />
      <hr />
      <PortfolioSummary holdings={state.holdings} loading={state.loading} />
      <hr />
      <PortfolioFooter
        apiKey={apiKey}
        provider={provider}
        holdings={state.holdings}
      />

      <AddHoldingModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleAddHolding}
      />
      {initialHoldingInputs != null && (
        <BatchAddHoldingsModal
          holdings={initialHoldingInputs}
          onConfirm={() => {
            setShowInitialInputPreviewModal(false);
            handleImportHoldings(initialHoldingInputs);
          }}
          onClose={() => setShowInitialInputPreviewModal(false)}
          show={showInitialInputPreviewModal}
        />
      )}
    </>
  );
}

export default function PassiveIncome(props: PropType) {
  const router = useRouter();
  const { asPath: currentPath } = router;
  return (
    <Template activeWebsite={Website.PERSONAL} path={currentPath}>
      <PassiveIncomeBody {...props} />
    </Template>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PropType>> {
  const { query } = context;
  let initialApiKey = query.key ?? null;
  initialApiKey = Array.isArray(initialApiKey)
    ? initialApiKey[0]
    : initialApiKey;

  let initialProvider = query.provider ?? null;
  initialProvider = Array.isArray(initialProvider)
    ? initialProvider[0]
    : initialProvider;

  const encodedHoldingDataQuery = query.holdings ?? null;
  const encodedHoldingData = Array.isArray(encodedHoldingDataQuery)
    ? encodedHoldingDataQuery[0]
    : encodedHoldingDataQuery;
  const initialHoldings = decompressHoldings(encodedHoldingData);
  const initialHoldingInputs: Array<AddHoldingInput> | null =
    initialHoldings?.map(
      ({
        category,
        costBasis,
        price,
        shares,
        symbol,
        dividendPerShareTTM,
        dividendFrequency,
        nextCouponDate,
      }) => ({
        isDataFetchingNeeded: price !== 1.0,
        category,
        costBasis,
        shares,
        symbol,
        dividendYield: dividendPerShareTTM / price,
        dividendFrequency: dividendFrequency as DividendFrequency,
        nextCouponDate,
      })
    ) ?? null;

  return {
    props: {
      initialApiKey,
      initialProvider: initialProvider as SecurityDataProvider,
      initialHoldingInputs,
    },
  };
}
