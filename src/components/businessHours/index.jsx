import React from 'react';
import Icon from '@/components/ui/Icon';
import Flatpickr from 'react-flatpickr';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import moment from 'moment';

const BusinessHours = ({ businessHours, setBusinessHours }) => {
    const { control, register, setValue, getValues } = useForm({
        defaultValues: {
            hours: [{ dayFrom: 'Monday', dayTo: 'Thursday', openAM: null, closePM: null }],
        },
    });

    const { fields, append } = useFieldArray({
        control,
        name: 'hours',
    });

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const updateBusinessHours = () => {
        const watchFields = getValues('hours');
        const updatedBusinessHours = {};

        watchFields.forEach(item => {
            const { dayFrom, dayTo, openAM, closePM } = item;

            if (openAM && closePM) {
                const openTime = moment(openAM[0]).format('h:mm A');
                const closeTime = moment(closePM[0]).format('h:mm A');
                const timeRange = `${openTime} to ${closeTime}`;

                const fromIndex = daysOfWeek.indexOf(dayFrom);
                const toIndex = daysOfWeek.indexOf(dayTo);

                for (let i = fromIndex; i <= toIndex; i++) {
                    updatedBusinessHours[daysOfWeek[i].toLowerCase()] = timeRange;
                }
            }
        });

        console.log(updatedBusinessHours);

        setBusinessHours(updatedBusinessHours);
    };

    const handleAppend = () => {
        append({ dayFrom: 'Monday', dayTo: 'Monday', openAM: null, closePM: null });
    };

    return (
        <div>
            <form>
                {fields.map((item, index) => (
                    <div className="lg:grid-cols-5 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0" key={item.id}>
                        <div className="flex-1">
                            <label htmlFor={`dayFrom${index}`} className="block text-sm font-medium text-gray-700">From</label>
                            <select
                                id={`dayFrom${index}`}
                                {...register(`hours[${index}].dayFrom`)}
                                onChange={(e) => {
                                    setValue(`hours[${index}].dayFrom`, e.target.value);
                                    updateBusinessHours();
                                }}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            >
                                {daysOfWeek.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label htmlFor={`dayTo${index}`} className="block text-sm font-medium text-gray-700">To</label>
                            <select
                                id={`dayTo${index}`}
                                {...register(`hours[${index}].dayTo`)}
                                onChange={(e) => {
                                    setValue(`hours[${index}].dayTo`, e.target.value);
                                    updateBusinessHours();
                                }}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            >
                                {daysOfWeek.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label htmlFor={`openAM${index}`} className="block text-sm font-medium text-gray-700">From</label>
                            <Controller
                                name={`hours[${index}].openAM`}
                                control={control}
                                render={({ field }) => (
                                    <Flatpickr
                                        {...field}
                                        options={{ enableTime: true, noCalendar: true, dateFormat: "h:i K" }}
                                        onChange={(date) => {
                                            field.onChange(date);
                                            updateBusinessHours();
                                        }}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    />
                                )}
                            />
                        </div>

                        <div className="flex-1">
                            <label htmlFor={`closePM${index}`} className="block text-sm font-medium text-gray-700">To</label>
                            <Controller
                                name={`hours[${index}].closePM`}
                                control={control}
                                render={({ field }) => (
                                    <Flatpickr
                                        {...field}
                                        options={{ enableTime: true, noCalendar: true, dateFormat: "h:i K" }}
                                        onChange={(date) => {
                                            field.onChange(date);
                                            updateBusinessHours();
                                        }}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    />
                                )}
                            />
                        </div>

                        <div className="flex-none relative self-end">
                            <button
                                onClick={handleAppend}
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
