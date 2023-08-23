import { SelectCategory } from '../SelectCategory.jsx';
export const Gender = ({setCurrentPage, setGender, gender}) => {
    const genders = [
        {
            label:'Male',
            value:'Male'
        }, 
        {
            label:'Female',
            value:'Female'
        }, 
        {
            label:'Genderless',
            value: 'Genderless'
        }, 
        {
            label:'Unknown',
            value: 'Unknown'
        }
    ]

    return (
        <SelectCategory category={gender} setCategory={setGender} setCurrentPage={setCurrentPage} options={genders}/>
    )
}