import * as yup from 'yup';

const ValidationSchema = yup.object().shape({
    fileImage: yup.string().required('Image is required'),
    pdfImage: yup.string().when('$subTabValue', {
        is: 'single', 
        then: (schema) => schema.required('File is required'),
        otherwise: (schema) => schema.notRequired(),
    }),
    fileTitle: yup.string().required('File Title is required'),
    fileDescription: yup.string().required('File Description is required'),
    chapters: yup.array().of(
        yup.object().shape({
            chapterTitle: yup.string().when('$subTabValue', {
                is: 'multi',
                then: (schema) => schema.required('Chapter Title is required'),
                otherwise: (schema) => schema.notRequired(),
            }),
            chapterDescription: yup.string().when('$subTabValue', {
                is: 'multi',
                then: (schema) => schema.required('Chapter Description is required'),
                otherwise: (schema) => schema.notRequired(),
            }),
            chapterFile: yup.string().when('$subTabValue', {
                is: 'multi',
                then: (schema) => schema.required('Chapter File is required'),
                otherwise: (schema) => schema.notRequired(),
            }),
        })
    ).when('$subTabValue', {
        is: 'multi',
        then: (schema) => schema.required('At least one chapter is required'),
        otherwise: (schema) => schema.notRequired(),
    }),
    lessons: yup.array().of(
        yup.object().shape({
            lessonTitle: yup.string().when('$subTabValue', {
                is: 'single',
                then: (schema) => schema.required('Lesson Title is required'),
                otherwise: (schema) => schema.notRequired(),
            }),
            lessonDescription: yup.string().when('$subTabValue', {
                is: 'single',
                then: (schema) => schema.required('Lesson Description is required'),
                otherwise: (schema) => schema.notRequired(),
            }),
        })
    ).when('$subTabValue', {
        is: 'single',
        then: (schema) => schema.required('At least one lesson is required'),
        otherwise: (schema) => schema.notRequired(),
    }),
});

export default ValidationSchema;