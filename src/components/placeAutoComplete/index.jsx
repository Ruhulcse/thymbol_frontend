import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
    getZipCode,
} from 'use-places-autocomplete';
import Textinput from '../ui/Textinput';

const PlaceAutoComplete = ({ register, errors, setFormValue }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        callbackName: 'localhost',
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };
    const handleSelect =
        ({ description }) =>
        () => {
            setValue(description, false);
            setFormValue('store_address', description);
            const country = description.split(',').slice(-1)[0];
            const city = description.split(',').slice(-3)[0];
            console.log(country);
            console.log(city);
            setFormValue('country', country);
            setFormValue('city', city);
            clearSuggestions();

            getGeocode({ address: description }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);
                const zipCode = getZipCode(results[0], false);
                setFormValue('postal_code', zipCode);
                setFormValue('latitude', lat);
                setFormValue('longitude', lng);
            });
        };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li
                    className="min-h-10 w-full border-b-[1px] border-solid border-l-gray-300 py-2 cursor-pointer"
                    key={place_id}
                    onClick={handleSelect(suggestion)}
                >
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    return (
        <>
            <Textinput
                name="store_address"
                label="Store Address"
                type="text"
                placeholder="Store Address"
                register={register}
                error={errors.store_address}
                className="h-[48px]"
                value={value}
                onChange={handleInput}
                disabled={!ready}
            />
            {status === 'OK' && (
                <ul className="bg-white border-[1px] rounded-lg shadow-lg p-4 absolute max-h-[200px] overflow-y-auto z-50">
                    {renderSuggestions()}
                </ul>
            )}
        </>
    );
};

export default PlaceAutoComplete;
