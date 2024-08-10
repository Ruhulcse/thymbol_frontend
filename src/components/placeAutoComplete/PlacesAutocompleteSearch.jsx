import { setSearchTerm } from '@/store/api/storeSearch/storeSearchSlice';
import { useDispatch } from 'react-redux';
import usePlacesAutocomplete from 'use-places-autocomplete';

const PlacesAutocompleteSearch = () => {
    const {
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete();
    const dispatch = useDispatch();

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }) =>
        () => {
            setValue(description, false);
            dispatch(setSearchTerm(description));
            clearSuggestions();
        };

    const renderSuggestions = () =>
        data.map((suggestion) => (
            <li
                className="min-h-10 w-full border-b-[1px] border-solid border-l-gray-300 py-2 cursor-pointer"
                key={suggestion.place_id}
                onClick={handleSelect(suggestion)}
            >
                {suggestion.description}
            </li>
        ));

    return (
        <div className="relative w-full">
            <input
                value={value}
                onChange={handleInput}
                placeholder="Search places..."
                className="w-full sm:h-16 h-12 shadow-lg px-4 rounded-lg z-[50]  focus:outline-none"
            />
            {status === 'OK' && (
                <ul className="bg-white border-[1px] rounded-lg shadow-lg p-4 absolute max-h-[200px] overflow-y-auto z-50">
                    {renderSuggestions()}
                </ul>
            )}
        </div>
    );
};

export default PlacesAutocompleteSearch;
