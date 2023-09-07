import React, { useState } from "react";
import { getConfig } from "../../../config/site.config";
import { GoSellElements } from "@tap-payments/gosell";
import Loader from "../../../components/common/Loader/Loader";

const GoSellElement = ({ config, onTransactionComplete }) => {
  const SITE_CONFIG = getConfig();

  function callbackFunc(response) {
    onTransactionComplete(response);
  }

  const [isLoading, setIsLoading] = useState(false);

  const handelSubmitPayment = (e) => {
    e.preventDefault();
    setIsLoading(true);
    GoSellElements.submit();
  };

  return (
    <div className="App">
      {isLoading ? (
        <Loader showOverlay={true} size={30} color="#fff" isLoading={false} />
      ) : (
        ""
      )}
      <GoSellElements
        gateway={{
          publicKey: `${SITE_CONFIG.tapPubKey_dev}`,
          merchantId: `${SITE_CONFIG.tapMerchantId}`,
          language: "en",
          supportedCurrencies: ["SAR"],
          supportedPaymentMethods: ["AMERICAN_EXPRESS", "VISA", "MASTERCARD"],
          callback: callbackFunc,
        }}
        order={config.order}
        transaction={config.transaction}
      />

      <button
        onClick={(e) => handelSubmitPayment(e)}
        className="tap-payment-btn"
      >
        Submit
      </button>
    </div>
  );
};

export default GoSellElement;
