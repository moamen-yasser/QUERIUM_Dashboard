import { Tabs } from '@mantine/core'
import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import StudentsTable from './StudentsTable';
import StudentApprove from './StudentApprove';

const FormsTabs = () => {
    const { tabValue } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const subTabValue = searchParams.get("subTabValue");

    const tabData = [
        {
            value: "all",
            label: " All Students",
            component: <StudentsTable/>,
        },
        {
            value: "approve",
            label: " Approve Student",
            component: <StudentApprove />,
        },
    ];

    const tabClasses = (value) =>
        `${
            subTabValue === value
            ? "bg-hoverColor text-white"
            : "bg-main text-white"
        } !px-10 !py-2 !rounded-2xl !border-0 !text-basd font-paragarphFont font-semibold w-[220px]`;

    return (
        <Tabs
            orientation="horizontal"
            keepMounted={false}
            value={subTabValue}
            onChange={(value) => navigate(`/dashboard/${tabValue}?subTabValue=${value}`)}            
            className="py-8 w-full px-12"
        >
            <Tabs.List className="before:!border-transparent flex justify-start items-center gap-10">
                {tabData?.map((tab) => (
                    <Tabs.Tab
                        key={tab.value}
                        value={tab.value}
                        className={tabClasses(tab.value)}
                    >
                    {tab.label}
                    </Tabs.Tab>
                ))}
            </Tabs.List>

            {tabData?.map(
                (tab) =>
                    subTabValue === tab.value && (
                    <Tabs.Panel key={tab.value} value={tab.value}>
                        {tab.component}
                    </Tabs.Panel>
                )
            )}
        </Tabs>
    )
}

export default FormsTabs
