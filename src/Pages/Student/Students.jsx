import React from 'react'
import FormsTabs from './FormsTabs';
import Breadcrumb from '../../Components/Breadcrumb';

// Breadcrumb items
const breadcrumbItems = [
    { label: "Home", link: "/dashboard/home" },
    { label: "Students", link: "/dashboard/student?subTabValue=all" },
];

const Students = () => {
    return (
        <>
            <Breadcrumb title={"Students"} items={breadcrumbItems} />
            <FormsTabs />
        </>
    )
}

export default Students