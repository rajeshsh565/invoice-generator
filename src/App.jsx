import InputInfo from "./Pages/InputInfo"
import Invoice from "./Pages/Invoice"
import { useState } from "react"

const App = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    //Pincode Validation
    if((data.sellerPincode.length!=6) || (data.shipPincode.length!=6) || (data.billPincode.length!=6)){
      return alert("Invalid Pincode!");
    }
    //
    setIsSubmitted(true);
    setFormData(data);
  }
  if(isSubmitted){
    return (
      <Invoice formData={formData}/>
    )
  }
  return (
    <InputInfo handleFormSubmit={handleFormSubmit}/>
  )
}
export default App