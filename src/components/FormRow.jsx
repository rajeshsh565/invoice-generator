const FormRow = ({type, name, labelValue, value, handleChange, readOnly, req=true}) => {
    const noChange = () => {

    }
  return (
    <div className="flex justify-between items-center mb-2 gap-2">
        <label htmlFor={name} className="font-bold break-words">{labelValue||name}</label>
        <input type={type || "text"} name={name} id={name} className="rounded-lg w-56 h-10 px-3 text-center" defaultValue={value||""} onChange={handleChange || noChange} readOnly={readOnly} required={req}/>
    </div>
  )
}
export default FormRow;