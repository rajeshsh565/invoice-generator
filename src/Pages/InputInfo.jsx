import { useEffect, useState } from "react";
import FormRow from "../components/FormRow";
import Items from "../components/Items";
import {v4 as uuid} from "uuid";

const InputInfo = ({ handleFormSubmit }) => {
    const [itemsCount, setItemsCount] = useState(1); //count of order items
    const [items, setItems] = useState([]); //array to represent each item

    useEffect(()=>{
        for(let i=0; i<itemsCount; i++){
            if(items.length<=itemsCount)
            setItems([...items, uuid()]); //each item with random value for key
        }
    }, [itemsCount]);

    const deleteItem = (i) => {
        const newItems = items.filter((item, index)=>index!==i);
        setItems(newItems);
    }

  return (
    <div className="py-4 flex flex-col items-center justify-center">
      <form
        onSubmit={handleFormSubmit}
        className="max-w-[56rem] lg:w-2/5 bg-gray-300 px-6 py-2 rounded-md"
      >
        {/* ................................Seller Details................................. */}
        <h3 className="text-xl font-bold underline text-center mb-2">Seller Details: </h3>
        <FormRow name="sellerName" labelValue="Name" />
        <FormRow name="sellerStreetAddress" labelValue="Street Address" />
        <FormRow name="sellerCity" labelValue="City" />
        <FormRow name="sellerState" labelValue="State" />
        <FormRow name="sellerPincode" labelValue="Pincode" />
        <FormRow name="sellerPanNum" labelValue="Pan No." />
        <FormRow name="sellerGstRegNum" labelValue="GST Registration No." />

        {/* ................................Place of Supply................................. */}
        <FormRow name="placeOfSupply" labelValue="Place Of Supply" />

        {/* ................................Shipping Details................................. */}
        <h3 className="text-xl font-bold underline text-center mb-2">Shipping Details: </h3>
        <FormRow name="shipName" labelValue="Name" />
        <FormRow name="shipStreetAddress" labelValue="Street Address" />
        <FormRow name="shipCity" labelValue="City" />
        <FormRow name="shipState" labelValue="State" />
        <FormRow name="shipPincode" labelValue="Pincode" />
        <FormRow name="shipStateUTCode" labelValue="State/UT Code" />

        {/* ................................Place of Delivery................................. */}
        <FormRow name="placeOfDelivery" labelValue="Place Of Delivery" />

        {/* ................................Billing Details................................. */}
        <h3 className="text-xl font-bold underline text-center mb-2">Billing Details: </h3>
        <FormRow name="billName" labelValue="Name" />
        <FormRow name="billStreetAddress" labelValue="Street Address" />
        <FormRow name="billCity" labelValue="City" />
        <FormRow name="billState" labelValue="State" />
        <FormRow name="billPincode" labelValue="Pincode" />
        <FormRow name="billStateUTCode" labelValue="State/UT Code" />

        {/* ................................Order Details................................. */}
        <h3 className="text-xl font-bold underline text-center mb-2">Order Details: </h3>
        <FormRow name="orderNum" labelValue="Order No." value={uuid()} readOnly="readonly"/>
        <FormRow name="orderDate" labelValue="Order Date" type="date"/>

        {/* ................................Invoice Details................................. */}
        <h3 className="text-xl font-bold underline text-center mb-2">Invoice Details: </h3>
        <FormRow name="invoiceNum" labelValue="Invoice No." />
        <FormRow name="invoiceDate" labelValue="Invoice Date" type="date"/>
        <FormRow name="invoiceDetails" labelValue="Invoice Details" />

        {/* ................................Reverse Charge Checkbox................................. */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="font-bold">
            Reverse Charge
          </div>
            <div className="flex gap-8">
              <div className="flex items-center gap-1">
          <input
            type="radio"
            name="reverseCharge"
            id="reverseChargeY"
            value="Yes"
          />
          <label htmlFor="reverseChargeY" className="font-bold">
            Yes
          </label>
              </div>
              <div className="flex items-center gap-1">
          <input
            type="radio"
            name="reverseCharge"
            id="reverseChargeN"
            value="No"
            checked
          />
          <label htmlFor="reverseChargeN" className="font-bold">
            No
          </label>
              </div>
            </div>
        </div>

        {/* ................................ORDER ITEMS................................. */}
        <h3 className="text-xl font-bold underline text-center mb-2">Order Items: </h3>
        {
            items.map((item, i)=>{
                return <Items i={i} key={item} deleteItem={deleteItem}/>
            })
        }

        {/* ................................Add More Items................................. */}
        <div className="flex justify-end">
        <button type="button" className="block bg-white rounded-md px-2 py-1 hover:bg-gray-100 transition-all" onClick={()=>setItemsCount(itemsCount+1)}>+ Add More Items</button>
        </div>

        {/* ................................Hidden Input to Submit items Count................................. */}
        <input type="number" name="itemsCount" value={itemsCount} hidden onChange={()=>{}}/>

        {/* ................................SUBMIT................................. */}
        <div className="flex justify-center">
        <button type="submit" className="bg-white rounded-md px-2 py-1 hover:bg-gray-100 transition-all w-full h-12 mt-4 font-extrabold text-lg">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default InputInfo;
