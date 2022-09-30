import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, getFilter } from 'redux/contactsSlice';
import { FilterLabel, FilterText } from './Filter.styled';

const Filter = () => {
    const filter = useSelector(getFilter);
    const dispatch = useDispatch();

    return (
        <FilterLabel>Find contacts by name
            <FilterText
                type="text"
                value={filter}
                onChange={e => dispatch(changeFilter(e.target.value))} />
        </FilterLabel>
    );
};

export default Filter;