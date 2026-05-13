const Filter = ({filterInput,setFilterInput}) => {
    return(
              <>filter shown with <input value={filterInput} onChange={(e) => setFilterInput(e.target.value)}/></>

    )
}

export default Filter