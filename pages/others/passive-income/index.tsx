import { useRouter } from "next/router";

import Template from "components/Template";
import { Website } from "shared/config/website-config";

import { useMemo, useReducer, useState } from "react";

import AddHoldingModal from "components/passive-income/AddHoldingModal";
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
import { AddHoldingInput } from "shared/types/passive-income-types";

type PropType = {
  initialApiKey: string | null;
  importFileCsvPath: string | null;
};

function PassiveIncomeBody({ initialApiKey }: PropType) {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [apiKey, setApiKey] = useState(initialApiKey || "");

  const handleAddHolding = async (holding: AddHoldingInput) => {
    try {
      const data = await fetchSecurityDataAsync(holding.symbol, apiKey);
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
      const batchDataPromises = holdingInputs.map((holdingInput) =>
        fetchSecurityDataAsync(holdingInput.symbol, apiKey)
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

  const handleExportPortfolio = () => {
    alert("Export functionality is not implemented yet.");
  };
  const isExportButtonDisabled = useMemo(
    () => state.holdings.length === 0,
    [state.holdings]
  );

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
        onAddHolding={() => setShowModal(true)}
        onApiKeyChange={setApiKey}
        onImportError={handleImportError}
        onImportHoldings={handleImportHoldings}
      />
      <PortfolioTable
        holdings={state.holdings}
        onRemove={handleRemoveHolding}
      />
      <PortfolioSummary holdings={state.holdings} />
      <PortfolioFooter
        isExportButtonDisabled={isExportButtonDisabled}
        onExportPortfolio={handleExportPortfolio}
      />

      <AddHoldingModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleAddHolding}
      />
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

  return {
    props: {
      initialApiKey,
      importFileCsvPath: null,
    },
  };
}
