import logoPlaceholder from "../assets/logo_placeholder.png";
import signaturePlaceholder from "../assets/signature_placeholder.png";
import { ToWords } from "to-words";
// to-words config
const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: 'Rupee',
      plural: 'Rupees',
      symbol: '₹',
      fractionalUnit: {
        name: 'Paisa',
        plural: 'Paise',
        symbol: '',
      },
    },
  },
});

const Invoice = ({ formData }) => {
  //total rows, 1 row for each item
  const { itemsCount } = formData;
  //to check if igst is applied
  const isIgst = formData.placeOfDelivery !== formData.placeOfSupply;
  const itemsArr = [];
  // Items Array formation from formData
  for (let i = 0; i < itemsCount; i++) {
    itemsArr.push({
      description: formData[`description${i}`],
      unitPrice: formData[`unitPrice${i}`],
      quantity: formData[`quantity${i}`],
      discount: formData[`discount${i}`],
      netAmount: formData[`netAmount${i}`],
      taxRate: formData[`taxRate${i}`],
    });
  }
  
  //Tax Amount/Type and Total Amount Calculation for each item
  itemsArr.forEach((item) => {
    if (!isIgst) {
      item["taxRate1"] = item.taxRate / 2;
      item["taxRate2"] = item.taxRate / 2;
      item.taxType1 = "CGST";
      item.taxType2 = "SGST";
      item.taxAmount1 = ((item.taxRate1 * item.netAmount) / 100).toFixed(2);
      item.taxAmount2 = ((item.taxRate2 * item.netAmount) / 100).toFixed(2);
      item.totalAmount =
        Number(item.taxAmount1) +
        Number(item.taxAmount2) +
        Number(item.netAmount);
    } else {
      item.taxType = "IGST";
      item.taxAmount = ((item.taxRate * item.netAmount) / 100).toFixed(2);
      item.totalAmount = Number(item.taxAmount) + Number(item.netAmount);
    }
  });

  const calcTaxTotal = () => {
    let sum = 0;
    itemsArr.map((item) => {
      if (isIgst) {
        sum = sum + Number(item.taxAmount);
      } else {
        sum = sum + Number(item.taxAmount1) + Number(item.taxAmount2);
      }
    });
    return sum;
  };
  const calcTotal = () => {
    let sum = 0;
    itemsArr.map((item) => {
      sum = sum + item.totalAmount;
    });
    return sum;
  };
  const numToWords = (num) => {
    const words = toWords.convert(num);
    return words;
  }

  return (
    <div className="flex flex-col gap-2 px-8 py-8 w-[56rem] invoice-container mx-auto">
      {/* Buyer/Seller/Order Info */}
      <div className="grid grid-cols-2 gap-x-4">
        <div className="mb-16 w-64">
          <img src={logoPlaceholder} alt="platform logo"/>
        </div>
        <div className="text-xl text-end">
          <h1>Tax Invoice/Bill of Supply/Cash Memo</h1>
          <p>(Original for Recepient)</p>
        </div>

        {/* Seller Section */}

        {/* Seller Address */}
        <div className="flex flex-col">
          <div>
            <h3>Sold By:</h3>
            <p>{formData.sellerName}</p>
            <p>{formData.sellerStreetAddress}</p>
            <p>{`${formData.sellerCity}, ${formData.sellerState}, ${formData.sellerPincode}`}</p>
            <p>IN</p>
          </div>
          {/* Pan & GST No */}
          <div className="mt-6">
            <div className="flex gap-2">
              <h3>PAN No:</h3>
              <p>{formData.sellerPanNum}</p>
            </div>
            <div className="flex gap-2">
              <h3>GST Registration No:</h3>
              <p>{formData.sellerGstRegNum}</p>
            </div>
          </div>
        </div>

        {/* Buyer Section */}

        {/* Billing Address */}
        <div className="flex flex-col text-end">
          <div className="">
            <h3>Billing Address:</h3>
            <p>{formData.billName}</p>
            <p>{formData.billStreetAddress}</p>
            <p>{`${formData.billCity}, ${formData.billState}, ${formData.billPincode}`}</p>
            <p>IN</p>
            <div className="flex gap-2 justify-end text-end">
              <h3>State/UT Code: </h3>
              <p>{formData.billStateUTCode}</p>
            </div>
          </div>
          {/* Shipping Address */}
          <div className="mt-6">
            <h3>Shipping Address:</h3>
            <p>{formData.shipName}</p>
            <p>{formData.shipStreetAddress}</p>
            <p>{`${formData.shipCity}, ${formData.shipState}, ${formData.shipPincode}`}</p>
            <p>IN</p>
            <div className="flex gap-2 justify-end text-end">
              <h3>State/UT Code: </h3>
              <p>{formData.billStateUTCode}</p>
            </div>
          </div>
          {/* Places of Supply & Delivery */}
          <div className="flex gap-2 justify-end text-end">
            <h3>Place of Supply: </h3>
            <p>{formData.placeOfSupply}</p>
          </div>
          <div className="flex gap-2 justify-end text-end">
            <h3>Place of Delivery: </h3>
            <p>{formData.placeOfDelivery}</p>
          </div>
        </div>

        {/* Order Info */}
        <div>
          <div className="flex gap-2">
            <h3>Order No:</h3>
            <p>{formData.orderNum}</p>
          </div>
          <div className="flex gap-2">
            <h3>Order Date:</h3>
            <p>{formData.orderDate}</p>
          </div>
        </div>

        {/* Invoice Info */}
        <div>
          <div className="flex gap-2 justify-end text-end">
            <h3>Invoice No:</h3>
            <p>{formData.invoiceNum}</p>
          </div>
          <div className="flex gap-2 justify-end text-end">
            <h3>Invoice Details:</h3>
            <p>{formData.invoiceDetails}</p>
          </div>
          <div className="flex gap-2 justify-end text-end">
            <h3>Invoice Date:</h3>
            <p>{formData.invoiceDate}</p>
          </div>
        </div>
      </div>

      {/* Items List and Total Amount */}
      <div>
        {/* Header */}
        <div className="grid grid-cols-[0.5fr,5.5fr,1fr,0.5fr,1fr,1fr,1fr,1fr,2fr] border-2 border-black text-center items-table-header">
          <div className="font-bold w-10 border-r-2 border-black">Sl No.</div>
          <div className="font-bold w-72 border-r-2 border-black">
            <p>
            Description
            </p>
          </div>
          <div className="font-bold w-16">Unit Price</div>
          <div className="font-bold w-10 border-r-2 border-black">Qty</div>
          <div className="font-bold w-20 border-r-2 border-black">
            <p>
            Net Amount
            </p>
          </div>
          <div className="font-bold w-16 border-r-2 border-black">Tax Rate</div>
          <div className="font-bold w-16 border-r-2 border-black">Tax Type</div>
          <div className="font-bold w-20 border-r-2 border-black">
            <p>
            Tax Amount
            </p>
          </div>
          <div className="font-bold w-24">
            <p>
            Total Amount
            </p>
          </div>
        </div>

        {/* Items */}
        {itemsArr.map((item, index) => {
          return (
            <div className="grid grid-cols-[0.5fr,5.5fr,1fr,0.5fr,1fr,1fr,1fr,1fr,2fr] border-2 border-t-0 border-black text-center break-words items-table" key={index}>
              <div className="w-10 border-r-2 border-black">
                <p>{index + 1}</p>
              </div>
              <div className="w-72 border-r-2 border-black text-start px-2">
                <p className="w-full">{item.description}</p>
              </div>
              <div className="w-16 border-r-2 border-black">
                <p>&#8377;{item.unitPrice}</p>
              </div>
              <div className="w-10 border-r-2 border-black">
                <p>{item.quantity}</p>
              </div>
              <div className="w-20 border-r-2 border-black">
                <p>&#8377;{item.netAmount}</p>
              </div>
              <div className="w-16 border-r-2 border-black">
                {isIgst ? (
                  <p>{`${item.taxRate}%`}</p>
                ) : (
                  <div className="flex flex-col">
                    <p>{item.taxRate1}%</p>
                    <p>{item.taxRate2}%</p>
                  </div>
                )}
              </div>
              <div className="w-16 border-r-2 border-black">
                {isIgst ? (
                  <p>{item.taxType}</p>
                ) : (
                  <div className="flex flex-col">
                    <p>{item.taxType1}</p>
                    <p>{item.taxType2}</p>
                  </div>
                )}
              </div>
              <div className="w-20 border-r-2 border-black">
                {isIgst ? (
                  <p>&#8377;{`${item.taxAmount}`}</p>
                ) : (
                  <div className="flex flex-col">
                    <p>&#8377;{item.taxAmount1}</p>
                    <p>&#8377;{item.taxAmount2}</p>
                  </div>
                )}
              </div>
              <div className="w-24">
                <p>&#8377;{item.totalAmount}</p>
              </div>
            </div>
          );
        })}

        {/* Items Total */}
        <div className="grid grid-cols-[10.5fr,1fr,1fr] border-2 border-t-0 border-black">
          <div className="font-bold">Total:</div>
          <div className="text-center w-20">&#8377;{calcTaxTotal()}</div>
          <div className="text-center w-28">&#8377;{calcTotal()}</div>
        </div>
        {/* Amount in words */}
        <div className="grid grid-cols-1 border-2 border-t-0 border-black">
          <div className="font-bold px-2">
            <h3>Amount in Words:</h3>
            <h3>{numToWords(calcTotal())}</h3>
          </div>
        </div>
        {/* Seller Signoff */}
        <div className="grid grid-cols-1 border-2 border-t-0 border-black">
          <div className="flex flex-col font-bold text-end px-2 items-end">
            <h3>For {formData.sellerName}:</h3>
            <div className="w-32">
              <img src={signaturePlaceholder} alt="seller signature"/>
            </div>
            <h3>Authorized Signatory</h3>
          </div>
        </div>
        <p>Whether Tax is Payable under Reverse Charge - {formData.reverseCharge==='on' ? 'Yes':'No'}</p>
      </div>

      {/* Foot Notes */}
      <div className="text-center w-[42rem] mx-auto mt-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        perspiciatis culpa quibusdam. Hic ea placeat at saepe eos veniam commodi
        et, dolor labore ipsum, dolores iste minima mollitia nesciunt corrupti
        tenetur maxime minus, sapiente voluptatibus temporibus adipisci esse
        vel. Cum reprehenderit maiores quas consectetur similique sit vero
        architecto, dolorem eaque!
      </div>

      {/* Print/Generate PDF */}
      <div className="flex justify-center">
        <button className="bg-purple-500 text-white rounded-md px-2 py-1" onClick={()=>print()}>Print</button>
      </div>
    </div>
  );
};
export default Invoice;
