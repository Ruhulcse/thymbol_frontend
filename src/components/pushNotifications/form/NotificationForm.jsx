import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Textarea from '@/components/ui/Textarea';
import Textinput from '@/components/ui/Textinput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
    .object({
        title: yup.string().required('Title is required'),
        description: yup.string().required('Description is required'),
    })
    .required();

const NotificationForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'all',
    });

    const onSubmit = (data) => {
        console.log(data);
        // Perform your form submission logic here
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" mt-5">
            <h4>
                <strong>Create New Push Notification</strong>
            </h4>
            <div className="flex justify-center items-center mt-16 md:mt-44">
                <Card className="w-2/5 px-5">
                    <h6 className="my-5 font-semibold">
                        New Push Notification
                    </h6>
                    <div className="grid grid-cols-1 gap-5 w-full">
                        <Textinput
                            name="title"
                            label="Title"
                            type="text"
                            placeholder="Write Title of Notification"
                            register={register}
                            error={errors.title}
                            className="h-[48px]"
                            onChange={(e) => {
                                setValue('title', e.target.value);
                            }}
                        />

                        <Textarea
                            label="description"
                            id="pn4"
                            name={'description'}
                            placeholder="Write title or message of notification"
                            register={register}
                            error={errors.description}
                            onChange={(e) => {
                                setValue('description', e.target.value);
                            }}
                        />

                        <Button
                            type="submit"
                            text="Create Notification"
                            className="btn btn-primary block mt-5 text-center "
                            // isLoading={isLoading}
                            // disabled={isLoading}
                        />
                    </div>
                </Card>
            </div>
        </form>
    );
};

export default NotificationForm;
