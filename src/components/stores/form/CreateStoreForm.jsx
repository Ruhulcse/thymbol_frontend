import Button from '@/components/ui/Button';
import Textinput from '@/components/ui/Textinput';
import DropZone from '@/pages/form/file-input/DropZone';
import {
    useGetCategoriesQuery,
    useLazyGetSubCategoryQuery,
} from '@/store/api/masterdata/masterdataApiSlice';
import { useCreateStoreMutation } from '@/store/api/stores/storesApiSlice';
import { swalSuccess } from '@/util/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import * as yup from 'yup';

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: '14px',
    }),
    control: (provided, state) => ({
        ...provided,
        padding: '5px 6px',
    }),
};

const schema = yup
    .object({
        store_name: yup.string().required('Store Name is required'),
        store_address: yup.string().required('Store Address is required'),
        website_link: yup.string().required('Website Link is required'),
        social_media_link: yup
            .string()
            .required('Social Media Link is required'),
        business_hours: yup.string().required('Business Hours is required'),
        postal_code: yup.string().required('Postal Code is required'),
        category: yup.object().required('Category is required').nullable(),
        sub_category: yup
            .object()
            .required('Sub-category is required')
            .nullable(),
        // country: yup.object().required('Country is required').nullable(),
        // city: yup.object().required('City is required').nullable(),
    })
    .required();

const CreateStoreForm = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    // redux
    const [createStore, { isLoading: isCreating, error: createError }] = useCreateStoreMutation();

    const {
        data: categories,
        error,
        isLoading: loadingCategory,
    } = useGetCategoriesQuery();

    const [
        triggerGetSubCategory,
        { data: subCategoryData, isLoading: loadingSubCategory },
    ] = useLazyGetSubCategoryQuery();

    useEffect(() => {
        if (selectedCategory) {
            setSubCategories([]);
            triggerGetSubCategory(selectedCategory.value);
        }
    }, [selectedCategory, triggerGetSubCategory]);

    useEffect(() => {
        if (subCategoryData) {
            setSubCategories(subCategoryData);
        }
    }, [subCategoryData]);

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            const jsonData = {
                store_name: data.store_name,
                category: data.category.value,
                sub_category: data.sub_category.value,
                address: {
                    street: data.store_address,
                    city: data?.city?.label || '',
                    country: data?.country?.label || '',
                    postal_code: data.postal_code,
                },
                website_link: data.website_link,
                social_media_link: data.social_media_link,
                business_hours: data.business_hours,
                location: {
                    type: 'Point',
                    coordinates: [105, 106],
                },
            };

            const strinfigyJson = JSON.stringify(jsonData);
            const parsedJson = JSON.stringify(strinfigyJson);
            formData.append('jsonData', parsedJson);

            // Append files
            if(data.logo.length) {
                formData.append('logo', data.logo[0] || null);
            } 
            if(data.document.length) {
                formData.append('documents', data.document[0] || null);
            }

            await createStore({ storeData: formData }).unwrap();

            swalSuccess(
                `Store ${data.store_name} successfully added!`,
                'Store Added!'
            );
            navigate('/stores');

            // console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-5">
            <h4>
                <strong>Add Store</strong>
            </h4>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full md:w-2/3">
                <Controller
                    name="logo"
                    control={control}
                    render={({ field }) => (
                        <DropZone
                            title="Add Logo"
                            onDrop={(files) => field.onChange(files)}
                            files={field.value || []}
                        />
                    )}
                />
                {errors.logo && (
                    <p className="text-red-500">{errors.logo.message}</p>
                )}
                <Controller
                    name="document"
                    control={control}
                    render={({ field }) => (
                        <DropZone
                            title="Upload pdf/jpeg"
                            onDrop={(files) => field.onChange(files)}
                            files={field.value || []}
                        />
                    )}
                />
                {errors.document && (
                    <p className="text-red-500">{errors.document.message}</p>
                )}
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full md:w-2/3">
                <Textinput
                    name="store_name"
                    label="Store Name"
                    type="text"
                    placeholder="Store Name"
                    register={register}
                    error={errors.store_name}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('store_name', e.target.value);
                    }}
                />

                <div>
                    <label htmlFor="category" className="form-label ">
                        Category
                    </label>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="react-select"
                                classNamePrefix="select"
                                options={categories?.data?.map((category) => ({
                                    value: category.value,
                                    label: category.label,
                                }))}
                                isLoading={loadingCategory}
                                styles={styles}
                                onChange={(option) => {
                                    field.onChange(option);
                                    setSelectedCategory(option);
                                    setSelectedSubCategory(null);
                                }}
                            />
                        )}
                    />
                    {errors.category && (
                        <p className="text-red-500 font-normal text-sm mt-1">
                            {errors.category.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="sub_category" className="form-label ">
                        Sub-category
                    </label>
                    <Controller
                        name="sub_category"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="react-select"
                                classNamePrefix="select"
                                options={subCategories?.data?.map(
                                    (subCategory) => ({
                                        value: subCategory.value,
                                        label: subCategory.label,
                                    })
                                )}
                                isLoading={loadingSubCategory}
                                styles={styles}
                                value={selectedSubCategory}
                                onChange={(option) => {
                                    field.onChange(option);
                                    setSelectedSubCategory(option);
                                }}
                            />
                        )}
                    />
                    {errors.sub_category && (
                        <p className="text-red-500 font-normal text-sm mt-1">
                            {errors.sub_category.message}
                        </p>
                    )}
                </div>

                <div>
                    <Textinput
                        name="store_address"
                        label="Store Address"
                        type="text"
                        placeholder="Store Address"
                        register={register}
                        error={errors.store_address}
                        className="h-[48px]"
                        onChange={(e) => {
                            setValue('store_address', e.target.value);
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="country" className="form-label ">
                        Country
                    </label>
                    <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="react-select"
                                classNamePrefix="select"
                                options={[
                                    { label: 'United States', value: 'US' },
                                ]}
                                styles={styles}
                                // onChange={(option) => {
                                //     field.onChange(option);
                                //     setSelectedCountry(option);
                                //     setSelectedCity(null); // Clear selected city
                                // }}
                            />
                        )}
                    />
                    {errors.country && (
                        <p className="text-red-500 font-normal text-sm mt-1">{errors.country.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="city" className="form-label ">
                        City
                    </label>
                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="react-select"
                                classNamePrefix="select"
                                options={[{ label: 'New York', value: 'NY' }]}
                                styles={styles}
                                // value={selectedCity}
                                // onChange={(option) => {
                                //     field.onChange(option);
                                //     setSelectedCity(option);
                                // }}
                            />
                        )}
                    />
                    {errors.city && (
                        <p className="text-red-500 font-normal text-sm mt-1">{errors.city.message}</p>
                    )}
                </div>

                <Textinput
                    name="website_link"
                    label="Website Link"
                    type="text"
                    placeholder="Add Website Link"
                    register={register}
                    error={errors.website_link}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('website_link', e.target.value);
                    }}
                />
                <Textinput
                    name="social_media_link"
                    label="Social Media Link"
                    type="text"
                    placeholder="Add Social Media Link"
                    register={register}
                    error={errors.social_media_link}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('social_media_link', e.target.value);
                    }}
                />
                <Textinput
                    name="business_hours"
                    label="Business Hours"
                    type="text"
                    placeholder="Add Business Hours"
                    register={register}
                    error={errors.business_hours}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('business_hours', e.target.value);
                    }}
                />
                <Textinput
                    name="postal_code"
                    label="Postal Code"
                    type="text"
                    placeholder="Postal Code"
                    register={register}
                    error={errors.postal_code}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('postal_code', e.target.value);
                    }}
                />

                <Button
                    type="submit"
                    text="Add Store"
                    className="btn btn-primary block mt-5 text-center font-normal"
                    isLoading={isCreating}
                    disabled={isCreating}
                />
            </div>
        </form>
    );
};

export default CreateStoreForm;
