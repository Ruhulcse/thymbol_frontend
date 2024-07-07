import { weekdays } from '@/constant/data';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import { useEffect } from 'react';

const BusinessHours = ({ businessHours, setBusinessHours }) => {
    const { control, handleSubmit, formState: { errors }, watch } = useForm();
    const { fields, append, update } = useFieldArray({
        control,
        name: 'businessHours',
    });

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            const newFields = [...fields];
            const index = parseInt(name.match(/\d+/)[0]);
            const key = name.split('.').pop();
            newFields[index] = { ...newFields[index], [key]: value.businessHours[index][key] };
            updateBusinessHours(newFields);
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const updateBusinessHours = (updatedFields) => {
        const newPayload = updatedFields.reduce((acc, field) => {
            if (field.weekdayFrom && field.weekdayTo && field.timeFrom && field.timeTo) {
                const days = getDaysInRange(field.weekdayFrom.value, field.weekdayTo.value);
                days.forEach(day => {
                    acc[day] = `${field.timeFrom} to ${field.timeTo}`;
                });
            }
            return acc;
        }, {});
        setBusinessHours(newPayload);
    };

    const addBusinessHour = () => {
        append({ weekdayFrom: '', weekdayTo: '', timeFrom: '', timeTo: '' });
    };

    const getDaysInRange = (start, end) => {
        const startIndex = weekdays.findIndex(day => day.value === start);
        const endIndex = weekdays.findIndex(day => day.value === end);
        if (startIndex <= endIndex) {
            return weekdays.slice(startIndex, endIndex + 1).map(day => day.value);
        } else {
            return [
                ...weekdays.slice(startIndex).map(day => day.value),
                ...weekdays.slice(0, endIndex + 1).map(day => day.value),
            ];
        }
    };

    return (
        <form>
            <label htmlFor="business-hours" className="form-label">
                Business Hours
            </label>
            {fields.map((item, index) => (
                <div key={item.id} className="flex flex-wrap space-y-2 lg:space-y-0 lg:space-x-4 mb-2">
                    <Controller
                        name={`businessHours[${index}].weekdayFrom`}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                value={field.value || null}
                                className="react-select w-full lg:w-1/2"
                                classNamePrefix="select"
                                options={weekdays}
                                placeholder="From"
                                menuPlacement="top"
                                onChange={(option) => field.onChange(option)}
                            />
                        )}
                    />
                    <Controller
                        name={`businessHours[${index}].weekdayTo`}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                value={field.value || null}
                                className="react-select w-full lg:w-1/2"
                                classNamePrefix="select"
                                options={weekdays}
                                placeholder="To"
                                menuPlacement="top"
                                onChange={(option) => field.onChange(option)}
                            />
                        )}
                    />
                    <Controller
                        name={`businessHours[${index}].timeFrom`}
                        control={control}
                        render={({ field }) => (
                            <Flatpickr
                                {...field}
                                value={field.value}
                                options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: 'h:i K', // 12-hour format
                                    time_24hr: false,
                                }}
                                className="w-full lg:w-1/4 form-control py-2"
                                onChange={(date) => {
                                    if (date && date[0]) {
                                        field.onChange(date[0].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
                                    }
                                }}
                            />
                        )}
                    />
                    <Controller
                        name={`businessHours[${index}].timeTo`}
                        control={control}
                        render={({ field }) => (
                            <Flatpickr
                                {...field}
                                value={field.value}
                                options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: 'h:i K', // 12-hour format
                                    time_24hr: false,
                                }}
                                className="w-full lg:w-1/4 form-control py-2"
                                onChange={(date) => {
                                    if (date && date[0]) {
                                        field.onChange(date[0].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
                                    }
                                }}
                            />
                        )}
                    />
                </div>
            ))}
            {errors.businessHours?.length > 0 && (
                <p className="text-red-500 font-normal text-sm mt-1">
                    Please fill in all fields correctly.
                </p>
            )}
            <button
                type="button"
                onClick={addBusinessHour}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Add Business Hour
            </button>
        </form>
    );
};

export default BusinessHours;
