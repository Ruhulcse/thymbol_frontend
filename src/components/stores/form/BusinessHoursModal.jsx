import Modal from '@/components/ui/Modal';
import Textinput from '@/components/ui/Textinput';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const BusinessHoursModal = ({
    activeModal,
    businessHoursData,
    setBusinessHoursData,
    onclose,
    setBusinessHoursForm,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'all',
    });

    const [businessHours, setBusinessHours] = useState({
        monday: { opening: '', closing: '' },
        tuesday: { opening: '', closing: '' },
        wednesday: { opening: '', closing: '' },
        thursday: { opening: '', closing: '' },
        friday: { opening: '', closing: '' },
        saturday: { opening: '', closing: '' },
        sunday: { opening: '', closing: '' },
    });
    const [applyAllTimes, setApplyAllTimes] = useState({
        opening: '',
        closing: '',
    });

    const handleInputChange = (e, day, type) => {
        const { value } = e.target;
        setBusinessHours({
            ...businessHours,
            [day]: {
                ...businessHours[day],
                [type]: value,
            },
        });
    };

    const handleApplyAll = () => {
        const { opening, closing } = applyAllTimes;
        Object.keys(businessHours).forEach((day) => {
            setValue(`${day}.opening`, opening);
            setValue(`${day}.closing`, closing);
            setBusinessHours((prevHours) => ({
                ...prevHours,
                [day]: { opening, closing },
            }));

            setBusinessHoursData((prevHours) => ({
                ...prevHours,
                [day]: { opening, closing },
            }));
        });
    };

    const onSubmit = (data) => {
        const payload = Object.fromEntries(
            Object.entries(data)
                .filter(([key]) => !key.startsWith('applyAll'))
                .filter(([key, value]) => value.opening || value.closing)
                .map(([key, value]) => [
                    key,
                    `${value.opening}am to ${value.closing}pm`,
                ])
                .filter(([, times]) => times.trim() !== 'to')
        );
    
        delete data.applyAllOpening;
        delete data.applyAllClosing
        

        setBusinessHoursData((prev) => ({ ...prev, ...data }));

        setBusinessHoursForm(payload);

        onclose();
        reset();
    };

    return (
        <Modal
            activeModal={activeModal}
            onClose={onclose}
            title="Add Business Hours"
            labelClass="btn-outline-dark"
            themeClass="bg-customBlue dark:bg-slate-800 dark:border-b dark:border-slate-700"
            centered
            className="max-w-2xl"
        >
            <form className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="text-sm font-medium capitalize">
                        Business Hours
                    </div>
                    <div className="flex items-center space-x-2">
                        <Textinput
                            type="text"
                            name="applyAllOpening"
                            register={register}
                            value={applyAllTimes.opening}
                            onChange={(e) =>
                                setApplyAllTimes({
                                    ...applyAllTimes,
                                    opening: e.target.value,
                                })
                            }
                            className="input"
                            placeholder="Opening time"
                        />

                        <span>to</span>
                        <Textinput
                            type="text"
                            name="applyAllClosing"
                            register={register}
                            value={applyAllTimes.closing}
                            onChange={(e) =>
                                setApplyAllTimes({
                                    ...applyAllTimes,
                                    closing: e.target.value,
                                })
                            }
                            className="input"
                            placeholder="Closing time"
                        />
                        <button
                            type="button"
                            className="btn btn-sm bg-customBlue text-white h-min w-max text-sm font-normal"
                            onClick={handleApplyAll}
                        >
                            Apply All
                        </button>
                    </div>
                </div>
                {Object.keys(businessHoursData).map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                        <label
                            className="text-sm font-medium capitalize w-20"
                            htmlFor={`${day}-opening`}
                        >
                            {day}
                        </label>
                        <Textinput
                            type="text"
                            id={`${day}-opening`}
                            name={`${day}.opening`}
                            defaultValue={businessHoursData[day].opening}
                            register={register}
                            className="input"
                            placeholder="Opening time"
                        />
                        <span className="text-sm font-medium capitalize ">
                            AM
                        </span>
                        <span className="text-sm font-medium capitalize ">
                            to
                        </span>
                        <Textinput
                            type="text"
                            id={`${day}-closing`}
                            name={`${day}.closing`}
                            defaultValue={businessHoursData[day].closing}
                            register={register}
                            className="input"
                            placeholder="Closing time"
                        />
                        <span>PM</span>
                    </div>
                ))}
                <div className="col-span-12 flex justify-end">
                    <button
                        // type="submit"
                        className="btn bg-customBlue text-white h-min w-max text-sm font-normal"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default BusinessHoursModal;
