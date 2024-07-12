import Icon from '@/components/ui/Icon';
import { daysOfWeek } from '@/constant/data';
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

const BusinessHours = ({ businessHours, setBusinessHours }) => {
    const { control, register, setValue, getValues } = useForm({
        defaultValues: {
            hours: [
                {
                    dayFrom: 'Monday',
                    dayTo: 'Thursday',
                    openAM: null,
                    closePM: null,
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'hours',
    });

    const updateBusinessHours = () => {
        const watchFields = getValues('hours');
        const updatedBusinessHoursArray = watchFields.map((item) => {
            const updatedBusinessHours = {};
            const { dayFrom, dayTo, openAM, closePM } = item;

            if (openAM && closePM) {
                const openTime = moment(openAM[0]).format('h:mm A');
                const closeTime = moment(closePM[0]).format('h:mm A');
                const timeRange = `${openTime} to ${closeTime}`;

                const fromIndex = daysOfWeek.indexOf(dayFrom);
                const toIndex = daysOfWeek.indexOf(dayTo);

                if (fromIndex <= toIndex) {
                    for (let i = fromIndex; i <= toIndex; i++) {
                        updatedBusinessHours[daysOfWeek[i].toLowerCase()] =
                            timeRange;
                    }
                } else {
                    for (let i = fromIndex; i < daysOfWeek.length; i++) {
                        updatedBusinessHours[daysOfWeek[i].toLowerCase()] =
                            timeRange;
                    }
                    for (let i = 0; i <= toIndex; i++) {
                        updatedBusinessHours[daysOfWeek[i].toLowerCase()] =
                            timeRange;
                    }
                }
            }
            return updatedBusinessHours;
        });

        setBusinessHours(updatedBusinessHoursArray);
    };

    const handleAppend = () => {
        append({
            dayFrom: 'Monday',
            dayTo: 'Thursday',
            openAM: null,
            closePM: null,
        });
        setTimeout(updateBusinessHours, 0);
    };

    return (
        <div>
            <form>
                {fields.map((item, index) => (
                    <div
                        className="lg:grid-cols-5 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                        key={item.id}
                    >
                        <div className="flex-1">
                            <label
                                htmlFor={`dayFrom${index}`}
                                className="block text-sm font-medium text-gray-700"
                            >
                                From
                            </label>
                            <select
                                id={`dayFrom${index}`}
                                {...register(`hours[${index}].dayFrom`)}
                                onChange={(e) => {
                                    setValue(
                                        `hours[${index}].dayFrom`,
                                        e.target.value
                                    );
                                    setTimeout(updateBusinessHours, 0);
                                }}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            >
                                {daysOfWeek.map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label
                                htmlFor={`dayTo${index}`}
                                className="block text-sm font-medium text-gray-700"
                            >
                                To
                            </label>
                            <select
                                id={`dayTo${index}`}
                                {...register(`hours[${index}].dayTo`)}
                                onChange={(e) => {
                                    setValue(
                                        `hours[${index}].dayTo`,
                                        e.target.value
                                    );
                                    setTimeout(updateBusinessHours, 0);
                                }}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            >
                                {daysOfWeek.map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label
                                htmlFor={`openAM${index}`}
                                className="block text-sm font-medium text-gray-700"
                            >
                                From
                            </label>
                            <Controller
                                name={`hours[${index}].openAM`}
                                control={control}
                                render={({ field }) => (
                                    <Flatpickr
                                        {...field}
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: 'h:i K',
                                        }}
                                        onChange={(date) => {
                                            field.onChange(date);
                                            setTimeout(updateBusinessHours, 0);
                                        }}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    />
                                )}
                            />
                        </div>

                        <div className="flex-1">
                            <label
                                htmlFor={`closePM${index}`}
                                className="block text-sm font-medium text-gray-700"
                            >
                                To
                            </label>
                            <Controller
                                name={`hours[${index}].closePM`}
                                control={control}
                                render={({ field }) => (
                                    <Flatpickr
                                        {...field}
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: 'h:i K',
                                        }}
                                        onChange={(date) => {
                                            field.onChange(date);
                                            setTimeout(updateBusinessHours, 0);
                                        }}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    />
                                )}
                            />
                        </div>

                        <div className="flex-none relative self-end flex space-x-2">
                            {index > 0 && (
                                <button
                                    onClick={() => {
                                        remove(index);
                                        setTimeout(updateBusinessHours, 0);
                                    }}
                                    type="button"
                                    className="inline-flex items-center justify-center h-10 w-10 bg-red-500 text-lg border rounded border-red-500 text-white"
                                >
                                    <Icon icon="heroicons-outline:minus" />
                                </button>
                            )}
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
