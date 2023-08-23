import { SelectCategory } from "../SelectCategory.jsx"

export const Status = ({setCurrentPage, setStatus, status}) => {
    const statusArray = [
        {
            label: 'Alive',
            value: 'Alive'
        }, 
        {
            label: 'Dead',
            value: 'Dead'
        }, 
        {
            label: 'Unknown',
            value: 'Unknown'
        }
    ]

    return (
        <SelectCategory category={status} setCategory={setStatus} setCurrentPage={setCurrentPage} options={statusArray}/>
    )
}