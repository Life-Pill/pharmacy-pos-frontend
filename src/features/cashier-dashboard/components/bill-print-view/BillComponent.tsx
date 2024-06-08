import React from 'react';
import { PaymentDetails } from '../../interfaces/PaymentDetails';
import { OrderedMedicine } from '../../interfaces/OrderMedicine';

interface BillComponentProps {
  paymentDetails: PaymentDetails;
  orderedMedicine: OrderedMedicine[];
}

const BillComponent: React.FC<BillComponentProps> = ({
  paymentDetails,
  orderedMedicine,
}) => {
  return (
    <div className='bill-container'>
      <h2>Order Confirmation</h2>
      <p>Please confirm the order before payment</p>

      <div className='ordered-medicine'>
        <h3>Ordered Medicine</h3>
        <ul>
          {orderedMedicine.map((medicine, index) => (
            <li key={index}>
              {medicine.name} - Quantity: {medicine.amount} - Price:{' '}
              {medicine.unitPrice}
            </li>
          ))}
        </ul>
      </div>

      <div className='payment-details'>
        <h3>Payment Details</h3>
        <p>SubTotal: {paymentDetails.paymentAmount}</p>
        <p>Discount Applied: {paymentDetails.paymentDiscount}</p>
        <p>
          After Discount Reduced:{' '}
          {paymentDetails.paymentAmount -
            (paymentDetails.paymentDiscount * paymentDetails.paymentAmount) /
              100}
        </p>
        <p>Paid amount by customer: {paymentDetails.paidAmount}</p>
        <p>
          Balance:{' '}
          {paymentDetails.paidAmount -
            (paymentDetails.paymentAmount -
              (paymentDetails.paymentDiscount * paymentDetails.paymentAmount) /
                100)}
        </p>
        <p>Payment Method: {paymentDetails.paymentMethod}</p>
      </div>
    </div>
  );
};

export default BillComponent;
