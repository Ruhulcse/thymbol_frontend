import React, { useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import Flatpickr from 'react-flatpickr';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import moment from 'moment';

const BusinessHours = ({ businessHours, setBusinessHours }) => {
    const { control, handleSubmit, register, watch, setValue } = useForm({
        defaultValues: {
            hours: [{ dayFrom: 'Monday', dayTo: 'Thursday', openAM: '', closePM: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'hours',
    });

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Watch all form fields for changes
    const watchFields = watch();

    // Function to calculate business hours and update state
    const updateBusinessHours = () => {
        const updatedBusinessHours = {};

        watchFields.hours.forEach(item => {
            const { dayFrom, dayTo, openAM, closePM } = item;
            const openTime = moment(openAM[0]).format('h:mm A'); // openAM is an array from Flatpickr, so use openAM[0]
            const closeTime = moment(closePM[0]).format('h:mm A'); // closePM is an array from Flatpickr, so use closePM[0]
            const timeRange = `${openTime} to ${closeTime}`;

            const fromIndex = daysOfWeek.indexOf(dayFrom);
            const toIndex = daysOfWeek.indexOf(dayTo);

            for (let i = fromIndex; i <= toIndex; i++) {
                updatedBusinessHours[daysOfWeek[i].toLowerCase()] = timeRange;
            }
        });

        // Update business hours state
        setBusinessHours(updatedBusinessHours);
    };

    // useEffect to update business hours on form data change
    useEffect(() => {
        updateBusinessHours();
    }, []);

    // Handle form submission (not using onSubmit directly to prevent infinite loops)
    const handleFormChange = () => {
        updateBusinessHours();
    };

    return (
        <div>
            <form onChange={handleFormChange}>
                {fields.map((item, index) => (
                    <div className="lg:grid-cols-5 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0" key={index}>
                        <div className="flex-1">
                            <label htmlFor={`dayFrom${index}`} className="block text-sm font-medium text-gray-700">Day From</label>
                            <select
                                id={`dayFrom${index}`}
                                {...register(`hours[${index}].dayFrom`)}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            >
                                {daysOfWeek.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label htmlFor={`dayTo${index}`} className="block text-sm font-medium text-gray-700">Day To</label>
                            <select
                                id={`dayTo${index}`}
                                {...register(`hours[${index}].dayTo`)}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            >
                                {daysOfWeek.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label htmlFor={`openAM${index}`} className="block text-sm font-medium text-gray-700">Open AM</label>
                            <Controller
                                name={`hours[${index}].openAM`}
                                control={control}
                                render={({ field }) => (
                                    <Flatpickr
                                        {...field}
                                        options={{ enableTime: true, noCalendar: true, dateFormat: "h:i K" }}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    />
                                )}
                            />
                        </div>

                        <div className="flex-1">
                            <label htmlFor={`closePM${index}`} className="block text-sm font-medium text-gray-700">Close PM</label>
                            <Controller
                                name={`hours[${index}].closePM`}
                                control={control}
                                render={({ field }) => (
                                    <Flatpickr
                                        {...field}
                                        options={{ enableTime: true, noCalendar: true, dateFormat: "h:i K" }}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    />
                                )}
                            />
                        </div>

                        <div className="flex-none relative self-end">
                            <button
                                onClick={() => append({ dayFrom: 'Monday', dayTo: 'Monday', openAM: '', closePM: '' })}
                                type="button"
                                className="inline-flex items-center justify-center h-10 w-10 bg-primary-500 text-lg border rounded border-primary-500 text-white"
                            >
                                <Icon icon="heroicons-outline:plus" />
                            </button>
                        </div>
                    </div>
                ))}
            </form>
        </div>
    );
};

export default BusinessHours;
