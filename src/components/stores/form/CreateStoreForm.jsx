import BusinessHours from '@/components/businessHours';
import PlaceAutoComplete from '@/components/placeAutoComplete';
import Button from '@/components/ui/Button';
import Textinput from '@/components/ui/Textinput';
import DropZone from '@/pages/form/file-input/DropZone';
import {
    useGetCategoriesQuery,
    useLazyGetSubCategoryQuery,
} from '@/store/api/masterdata/masterdataApiSlice';
import { useCreateStoreMutation } from '@/store/api/stores/storesApiSlice';
import { swalError, swalSuccess } from '@/util/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
        website_link: yup
            .string()
            .url('Website Link must be a valid URL. https://example.com'),
        social_media_link: yup
            .string()
            .url('Website Link must be a valid URL. https://example.com'),

        postal_code: yup.string().required('Postal Code is required'),
        category: yup.object().required('Category is required').nullable(),
        country: yup.string().required('Country is required'),
        city: yup.string().required('City is required'),
        sub_category: yup
            .object()
            .required('Sub-category is required')
            .nullable(),
    })
    .required();

const CreateStoreForm = () => {
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [activeModal, setActiveModal] = useState(false);
    const [businessHours, setBusinessHours] = useState([]);

    const onClose = () => {
        setActiveModal(false);
    };

    // redux
    const [createStore, { isLoading: isCreating, error: createError }] =
        useCreateStoreMutation();

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
        mode: 'all',
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
                    city: data?.city || '',
                    country: data?.country || '',
                    postal_code: data.postal_code,
                },
                website_link: data.website_link,
                social_media_link: data.social_media_link,
                business_hours: businessHours,
                location: {
                    type: 'Point',
                    coordinates: [data.longitude, data.latitude],
                },
            };

            const strinfigyJson = JSON.stringify(jsonData);
            const parsedJson = JSON.stringify(strinfigyJson);
            formData.append('jsonData', parsedJson);

            // Append files
            if (data.logo.length) {
                formData.append('logo', data.logo[0] || null);
            }
            if (data?.document?.length) {
                formData.append('documents', data.document[0] || null);
            }

            await createStore({ storeData: formData }).unwrap();

            swalSuccess(
                `Store ${data.store_name} successfully added!`,
                'Store Added!'
            );
            navigate('/stores');
        } catch (error) {
            console.log('🚀  ~ error:', error);
            swalError(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-5">
            <h4>
                <strong>{t('Add Store')}</strong>
            </h4>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full md:w-2/3">
                <Controller
                    name="logo"
                    control={control}
                    render={({ field }) => (
                        <DropZone
                            title={t('Add Logo')}
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
                            title={'Showcase your store image / menu'}
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
                    label={t('Store Name')}
                    type="text"
                    placeholder={t('Store Name')}
                    register={register}
                    error={errors.store_name}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('store_name', e.target.value);
                    }}
                />

                <div>
                    <label htmlFor="category" className="form-label ">
                        {t('Category')}
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
                                placeholder={t('Select...')}
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
                        {t('Sub-Category')}
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
                                placeholder={t('Select...')}
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
                    <PlaceAutoComplete
                        setFormValue={setValue}
                        register={register}
                        errors={errors}
                    />
                </div>

                <div>
                    <Textinput
                        name="city"
                        label={t('City')}
                        type="text"
                        placeholder={t('City')}
                        register={register}
                        error={errors.city}
                        className="h-[48px]"
                        disabled={true}
                    />
                </div>

                <div>
                    <Textinput
                        name="country"
                        label={t('Country')}
                        type="text"
                        placeholder={t('Country')}
                        register={register}
                        error={errors.country}
                        className="h-[48px]"
                        disabled={true}
                    />
                </div>

                <Textinput
                    name="website_link"
                    label={t('Website Link')}
                    type="text"
                    placeholder={t('Add Website Link')}
                    register={register}
                    error={errors.website_link}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('website_link', e.target.value);
                    }}
                />
                <Textinput
                    name="social_media_link"
                    label={t('Social Media Link')}
                    type="text"
                    placeholder={t('Add Social Media Link')}
                    register={register}
                    error={errors.social_media_link}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('social_media_link', e.target.value);
                    }}
                />

                <Textinput
                    name="postal_code"
                    label={t('Postal Code')}
                    type="text"
                    placeholder={t('Postal Code')}
                    register={register}
                    error={errors.postal_code}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('postal_code', e.target.value);
                    }}
                />
            </div>
            <div className="grid grid-cols-1 gap-5 w-full md:w-2/3">
                <label htmlFor="business_hours" className="form-label">
                    {t('Add Business Hours')}
                </label>
                <BusinessHours
                    businessHours={businessHours}
                    setBusinessHours={setBusinessHours}
                />
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full md:w-2/3">
                <Button
                    type="submit"
                    text={t('Add Store')}
                    className="btn btn-primary block mt-5 text-center font-normal"
                    isLoading={isCreating}
                    disabled={isCreating}
                />
            </div>
        </form>
    );
};

export default CreateStoreForm;
