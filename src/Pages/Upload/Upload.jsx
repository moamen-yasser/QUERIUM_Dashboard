import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb'
import FormsTabs from './FormsTabs';

// Breadcrumb items
const breadcrumbItems = [
    { label: "Home", link: "/dashboard/home" },
    { label: "Upload", link: "/dashboard/upload?subTabValue=single" },
    ];

const Upload = () => {
    return (
        <>
            <Breadcrumb title={"Upload Content"} items={breadcrumbItems} />
            <FormsTabs />
        </>
    )
}

export default Upload
