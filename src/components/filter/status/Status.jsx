export const Status = ({setCurrentPage, setStatus}) => {
    const filter = (selectValue) => {
        setCurrentPage(1)
        setStatus(selectValue)
    }

    return (
        <select placeholder='status' onChange={(e) => filter(e.target.value)} name="status" id="">
            <option value="alive">alive</option>
            <option value="dead">dead</option>
            <option value="unknown">unknown</option>
        </select>
    )
}
