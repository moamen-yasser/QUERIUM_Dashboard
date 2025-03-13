import React from "react";
import { Table, Button } from "@mantine/core";

// Table header
const header = ["Student Name", "Email", "College ID", "National ID", "Created At", "Status", "Actions"];

// Sample data
const mockStudentData = [
    {
        id: 1,
        studentName: "John Doe",
        email: "moamenyasser920@gmail.com",
        CollegeID: "19653",
        nationalID: "30309031600519",
        createdAt: "2023-10-01 14:30",
        status: "Pending",
    },
    {
        id: 2,
        studentName: "John Doe",
        email: "ahmedsaad122@gmail.com",
        CollegeID: "19653",
        nationalID: "30309011213980",
        createdAt: "2023-10-01 14:30",
        status: "Pending",
    },
];


// Table Header Component
const TableHeader = () => (
    <thead className="border-b border-gray-500">
        <tr>
            {header?.map((head) => (
                <th key={head} className="p-2 min-w-[80px] text-center text-textSecondColor font-bold text-lg">
                    {head}
                </th>
            ))}
        </tr>
    </thead>
);

// Table Row Component
const TableRow = ({ student, handleAction }) => (
    <tr key={student.id} className='border-b border-gray text-center'>
        <td className="px-2 py-2">{student.studentName}</td>
        <td className="px-2 py-2">{student.email}</td>
        <td className="px-2 py-2">{student.CollegeID}</td>
        <td className="px-2 py-2">{student.nationalID}</td>
        <td className="px-2 py-2">{student.createdAt}</td>
        <td
            className={
                `px-2 py-2 ${
                    student.status === "Approved"
                        ? "text-green-600"
                        : student.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                }`
            }
        >
        {student.status}
        </td>
        <td className="px-4 py-2">
            <div className="flex space-x-2">
                <Button
                    size="sm"
                    className="!bg-green-700 px-2 py-1 rounded-md text-white"
                    onClick={() => handleAction(student?.id, "approve")}
                    disabled={student.status !== "Pending"}
                >
                    Approve
                </Button>
                <Button
                    size="sm"
                    className="!bg-red-500 px-5 py-1 rounded-md text-white"
                    onClick={() => handleAction(student?.id, "reject")}
                    disabled={student.status !== "Pending"}
                >
                    Reject
                </Button>
            </div>
        </td>
    </tr>
);

// Empty State Component
const EmptyState = ({ colSpan }) => (
    <tr>
        <td colSpan={colSpan} className="p-4 text-center text-gray-500 font-medium">
            No Students Found.
        </td>
    </tr>
);

const StudentApprove = () => {
    const handleAction = (id, action) => {
        // Update the status of the PDF in the mock data (replace with API call in real app)
        const updatedData = mockPDFData?.map((pdf) =>
            pdf.id === id ? { ...pdf, status: action === "approve" ? "Approved" : "Rejected" } : pdf
        );
        console.log(updatedData); 
    };

    return (
        <>
            <section className="px-2">
                <div className="w-full px-2 py-3 bg-white mt-16">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-textSecondColor mb-6">
                        Approve Student
                    </h1>

                    {/* Table */}
                    <Table className="w-full text-left">
                        <TableHeader />
                        <tbody>
                            {mockStudentData?.length > 0 ? (
                                mockStudentData?.map((student) => (
                                    <TableRow key={student?.id} student={student} handleAction={handleAction} />
                                ))
                            ) : (
                                <EmptyState colSpan={5} />
                            )}
                        </tbody>
                    </Table>
                </div>
            </section>
        </>
    );
};

export default StudentApprove;