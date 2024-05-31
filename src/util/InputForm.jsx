
function InputForm({title='',placeholder='',type='',handleChange,value}) {
  return (
    <div className="flex flex-col">
        <label htmlFor="" className='text-lg font-medium'>{title}</label>
    <input type={type} onChange={handleChange} value={value} className='p-1 w-64' placeholder={placeholder} /></div>
  )
}

export default InputForm