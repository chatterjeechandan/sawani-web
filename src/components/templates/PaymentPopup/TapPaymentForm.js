import React, { useEffect, useState } from 'react';

const TapPaymentForm = () => {

  useEffect(() => {

    

    const tap = window.Tapjsli('pk_test_qDdOx6ufrkJiNc5lo9nHM0zT');

    const elements = tap.elements({});
    const style = {
      base: {
        color: '#535353',
        lineHeight: '18px',
        fontFamily: 'sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: 'rgba(0, 0, 0, 0.26)',
          fontSize: '15px',
        },
      },
      invalid: {
        color: 'red',
      },
    };

    const labels = {
      cardNumber: 'Card Number',
      expirationDate: 'MM/YY',
      cvv: 'CVV',
      cardHolder: 'Card Holder Name',
    };

    const paymentOptions = {
      currencyCode: ['KWD', 'USD', 'SAR'],
      labels: labels,
      TextDirection: 'ltr',
    };

    const card = elements.create('card', { style: style }, paymentOptions);
    card.mount('#element-container');

    card.addEventListener('change', function (event) {
      if (event.BIN) {
        console.log(event.BIN);
      }
      if (event.loaded) {
        console.log('UI loaded :' + event.loaded);
        console.log('current currency is :' + card.getCurrency());
      }
      var displayError = document.getElementById('error-handler');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    const form = document.getElementById('form-container');
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      tap.createToken(card).then(function (result) {
        console.log(result);
        if (result.error) {
          var errorElement = document.getElementById('error-handler');
          errorElement.textContent = result.error.message;
        } else {
          var errorElement = document.getElementById('success');
          errorElement.style.display = 'block';
          var tokenElement = document.getElementById('token');
          tokenElement.textContent = result.id;
          tapTokenHandler(result.id);
        }
      });
    });

    function tapTokenHandler(token) {
        // Insert the token ID into the form so it gets submitted to the server
        var form = document.getElementById('form-container');
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'tapToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);
      
        // Submit the form
        //form.submit();
      }

    
  }, []);

  return (
    <form id="form-container" method="post" action="/charge">
      {/* Tap element will be here */}
      <div id="element-container"></div>
      <div id="error-handler" role="alert"></div>
      <div id="success" style={{ display: 'none', position: 'relative', float: 'left' }}>
        Success! Your token is <span id="token"></span>
      </div>
      {/* Tap pay button */}
      <button id="tap-btn">Submit</button>
    </form>
  );
};

export default TapPaymentForm;
