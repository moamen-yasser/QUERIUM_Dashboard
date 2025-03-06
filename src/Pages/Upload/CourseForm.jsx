import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Switch, Group } from '@mantine/core';
import ValidationSchema from '../../Forms/ValidationSchema';
import TextInputField from '../../Forms/TextInputField';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { RiChatDeleteFill } from 'react-icons/ri';
import FileUploadInput from '../../Forms/FileUploadInput';
import ImageBox from '../../Forms/ImageBox';
import PDFBox from '../../Forms/PDFBox';

const CourseForm = ({ subTabValue }) => {
    const [resetTrigger, setResetTrigger] = useState(false);
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(ValidationSchema),
        context: { subTabValue },
        defaultValues: {
            fileImage: null,
            pdfImage: null,
            fileTitle: '',
            fileDescription: '',
            chapters: [{ chapterTitle: '', chapterDescription: '', chapterFile: null }],
            lessons: [{ lessonTitle: '', lessonDescription: '', }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'chapters',
    });

    const onSubmit = (data) => {
        if (subTabValue === 'single') {
            const { chapters, ...rest } = data; 
            console.log('Form Data (Single):', rest);
        } else {
            console.log('Form Data (Multi):', data);
        }
        resetForm();
        setValue('fileImage', null);
        setValue('pdfImage', null);
    };

    const resetForm = () => {
        reset(); 
        setResetTrigger(prev => !prev); 
    };

    return (
        <div className="px-10 pt-9">
            <h1 className="text-3xl font-bold mb-6 text-title">New File</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-8">
                    {/* Left side: Inputs (3/4 width) */}
                    <div className="flex-1 w-3/4 space-y-4">
                        <TextInputField
                            control={control}
                            name="fileTitle"
                            placeholder="Add File Title"
                            error={errors.fileTitle?.message}
                            label="Title"
                        />

                        <TextInputField
                            control={control}
                            name="fileDescription"
                            placeholder="Add File Description"
                            error={errors.fileDescription?.message}
                            label="Description"
                        />

                        {/* Single Lesson */}
                        {subTabValue === 'single' && (
                            <>
                                <TextInputField
                                    control={control}
                                    name="lessons.0.lessonTitle"
                                    placeholder="Add Lesson Title"
                                    error={errors.lessons?.[0]?.lessonTitle?.message}
                                    label="Lesson Title"
                                />
                                <TextInputField
                                    control={control}
                                    name="lessons.0.lessonDescription"
                                    placeholder="Add Lesson Description"
                                    error={errors.lessons?.[0]?.lessonDescription?.message}
                                    label="Lesson Description"
                                />
                            </>
                        )}

                        {/* Multi-Lesson */}
                        {subTabValue === 'multi' && (
                            <div>
                                {fields?.map((lesson, index) => (
                                    <div key={lesson?.id}>
                                        <label className="block text-lg font-bold text-main ml-1 mb-1">
                                            Chapter {index + 1}
                                        </label>

                                        <div className="mb-4 p-4 border rounded-lg relative">
                                            {fields?.length > 1 && (
                                                <Button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="absolute top-2 right-2 p-1"
                                                >
                                                    <RiChatDeleteFill color="red" size={20} />
                                                </Button>
                                            )}

                                            <TextInputField
                                                control={control}
                                                name={`chapters.${index}.chapterTitle`}
                                                placeholder="Add Chapter Title"
                                                error={errors.chapters?.[index]?.chapterTitle?.message}
                                                label="Chapter Title"
                                            />

                                            <TextInputField
                                                control={control}
                                                name={`chapters.${index}.chapterDescription`}
                                                placeholder="Add Chapter Description"
                                                error={errors.chapters?.[index]?.chapterDescription?.message}
                                                label="Chapter Description"
                                            />

                                            <FileUploadInput
                                                control={control}
                                                name={`chapters.${index}.chapterFile`}
                                                placeholder="Upload File"
                                                error={errors.chapters?.[index]?.chapterFile?.message}
                                                label="File"
                                            />
                                        </div>
                                    </div>
                                ))}

                                <div
                                    onClick={() =>
                                        append({ chapterTitle: '', chapterDescription: '', chapterFile: null })
                                    }
                                    className={`mt-4 px-12 text-main text-xl font-paragarphFont font-semibold flex justify-center items-center gap-1 w-full
                                        sm:text-base sm:w-auto before:h-0 before:m-2 before:border before:border-main before:flex-1 after:h-0 after:m-2 
                                        after:border after:border-main after:flex-1 
                                        transition ease-in-out duration-300 cursor-pointer hover:text-hoverColor`}
                                >
                                    <IoIosAddCircleOutline /> Add a New Chapter
                                </div>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex justify-end space-x-8 !mt-8">
                            <Button
                                type="button"
                                variant="outline"
                                className="text-gray-800 border border-gray !rounded-2xl px-12 py-2"
                                onClick={() => resetForm()}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-main text-white hover:bg-hoverColor !rounded-2xl px-12 py-2"
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>

                    {/* Right side: ImageBox (1/4 width) */}
                    <div className={`w-1/4 flex 
                        ${subTabValue === 'single' ? "flex-col justify-center items-center space-y-2" : "flex-row justify-center items-start"}`}>
                        <ImageBox
                            control={control}
                            name="fileImage"
                            error={errors.fileImage?.message}
                            label="File Image"
                            setValue={setValue}
                            resetTrigger={resetTrigger}
                        />

                        {subTabValue === 'single' && (
                            <PDFBox
                                control={control}
                                name="pdfImage"
                                error={errors.pdfImage?.message}
                                label="Upload File"
                                setValue={setValue}
                                resetTrigger={resetTrigger}
                            />
                        )}
                    </div>
                </div>

            </form>
        </div>
    );
};

export default CourseForm;