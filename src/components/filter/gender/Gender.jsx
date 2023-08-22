export const Gender = ({setCurrentPage, setGender, gender}) => {
    const filter = (selectValue) => {
        if (selectValue === gender) {

        }
        setCurrentPage(1)
        setGender(selectValue)
    }

    return (
        <select placeholder='gender' onChange={(e) => filter(e.target.value)} name="gender" id="">
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="genderless">genderless</option>
            <option value="unknown">unknown</option>
        </select>
    )
}
