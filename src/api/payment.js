import axios from 'axios';

const API_KEY = 'sk_test_zM4aPjZ1kIeRGNXwUtHQfx75';

export async function makePayment(paymentData) {
    try {
        const response = await axios.post(
            'https://api.tap.company/v2/charges',
            paymentData,
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        throw new Error('Payment failed. Please try again later.');
    }
};
