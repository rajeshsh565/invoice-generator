import { useState } from "react";
import FormRow from "./FormRow";
const Items = ({ i, deleteItem }) => {
  const [unitPrice, setUnitPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [discount, setDiscount] = useState();
  const handleUnitPriceChange = (e) => {
    setUnitPrice(e.target.value);
  };
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleDisountChange = (e) => {
    setDiscount(e.target.value);
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-bold text-lg underline">Item-{i + 1}</h3>
        <button onClick={() => deleteItem(i)} className="bg-white rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <FormRow name={`description${i}`} labelValue="Description" />
      <FormRow
        name={`unitPrice${i}`}
        labelValue="Unit Price"
        value={unitPrice}
        handleChange={handleUnitPriceChange}
        type="number"
      />
      <FormRow
        name={`quantity${i}`}
        labelValue="Quantity"
        value={quantity}
        handleChange={handleQuantityChange}
        type="number"
      />
      <FormRow
        name={`discount${i}`}
        labelValue="Discount"
        value={discount}
        handleChange={handleDisountChange}
        type="number"
        req={false}
      />
      <FormRow
        name={`netAmount${i}`}
        labelValue="Net Amount"
        value={(unitPrice * quantity - discount) || (unitPrice * quantity)} //net amount with or without discount
        readOnly="readonly"
        type="number"
      />
      <FormRow name={`taxRate${i}`} labelValue="Tax Rate" type="number"/>
    </div>
  );
};
export default Items;
