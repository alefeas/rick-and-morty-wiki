import Select, { StylesConfig } from 'react-select';

const styles: StylesConfig = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { isDisabled }) => {
    return {
        ...styles,
        backgroundColor: isDisabled,
        fontWeight:'bold',
        cursor:'pointer',
        ':hover': {
            ...styles[':hover'],
            color: 'black',
            backgroundColor:'#f5f5f5'
        },
        ':active': {
            ...styles[':active'],
            backgroundColor:'transparent'
        }
    };
    },
};


export const SelectCategory = ({options, setCurrentPage, setCategory, category}) => {
    const filter = (selectValue) => {
        setCurrentPage(1)
        setCategory(selectValue)
    }
    return (
        <>
            {
            category !== '' ?
            <div className='selectedOptionContainer'>
                <span>{category}</span>
                <svg className='closeButton' onClick={() => {
                    setCategory('')
                    setCurrentPage(1)
                }} xmlns="http://www.w3.org/2000/svg" stroke="#f5f5f5" viewBox="0 0 32 32" id="X"><path stroke-width="4" d="m2 2 28 28M2 30 30 2" fill="#f5f5f5" class="color000000 svgShape"></path></svg>
            </div>
            :
            <Select styles={styles} className='select' onChange={(e) => filter(e.value)} isClearable options={options} /> 
            }
        </>
    )
}
