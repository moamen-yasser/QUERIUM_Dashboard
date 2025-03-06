import React, { useState } from "react";
import { Table } from "@mantine/core";
import Breadcrumb from "../../Components/Breadcrumb";
import SearchInput from "../../Components/SearchInput"; 

const header= ['#', 'Name', 'Email', 'File'];

// Sample data
const users = [
{ id: 1, name: "Nada", email: "Nada99@gmail.com", file: "http/:sjsjslaheucbdbwidbsjdid" },
{ id: 2, name: "Nada", email: "Nada99@gmail.com", file: "http/:sjsjslaheucbdbwidbsjdid" },
{ id: 3, name: "Nada", email: "Nada99@gmail.com", file: "http/:sjsjslaheucbdbwidbsjdid" },
{ id: 4, name: "Nada", email: "Nada99@gmail.com", file: "http/:sjsjslaheucbdbwidbsjdid" },
{ id: 5, name: "Nada", email: "Nada99@gmail.com", file: "http/:sjsjslaheucbdbwidbsjdid" },
{ id: 6, name: "Nada", email: "Nada99@gmail.com", file: "http/:sjsjslaheucbdbwidbsjdid" },
{ id: 7, name: "Nada", email: "Nada99@gmail.com", file: "http/:sjsjslaheucbdbwidbsjdid" },
{ id: 8, name: "Nada", email: "Nada99@gmail.com", file: "http/:sjsjslaheucbdbwidbsjdid" },
{ id: 9, name: "Nada", email: "Nada99@gmail.com", file: "http/:sjsjslaheucbdbwidbsjdid" },
{ id: 10, name: "Nada", email: "Nada99@gmail.com", file: "http/:sjsjslaheucbdbwidbsjdid" },
];

const TableHeader = () => (
    <thead>
        <tr>
            {header?.map((head) => (
                <th key={head} className="p-3 min-w-[80px] text-left text-textSecondColor font-bold text-lg">{head}</th>
            ))}
        </tr>
    </thead>
);

const TableRow = ({ user }) => (
    <tr key={user?.id} className=" text-left text-textSecondColor font-bold text-lg">
        <td className="p-3 min-w-[80px]">{user?.id}</td>
        <td className="p-3 min-w-[120px]">{user?.name}</td>
        <td className="p-3 min-w-[250px]">{user?.email}</td>
        <td className="p-3 min-w-[150px]">
        <a
            href={user?.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
        >
            http/:sjsjsllaheucbdbwidbsjdid
        </a>
        </td>
    </tr>
);

const EmptyState = ({ colSpan }) => (
<tr>
    <td colSpan={colSpan} className="p-4 text-center text-gray-500 font-medium">
        No users found.
    </td>
</tr>
);

// Breadcrumb items
const breadcrumbItems = [
{ label: "Home", link: "/dashboard/home" },
{ label: "Users", link: "/dashboard/users" },
];

const Users = () => {
const [inputValue, setInputValue] = useState("");

const handleInputChange = (e) => {
    const name = e.target.value;
    setInputValue(name);
};

const handleClearInput = () => {
    setInputValue("");
};

// Filter users based on search query
const filteredUsers = users.filter(
    (user) =>
    user.name.toLowerCase().includes(inputValue.toLowerCase()) ||
    user.email.toLowerCase().includes(inputValue.toLowerCase())
);

return (
    <>
    <Breadcrumb title={"All Users"} items={breadcrumbItems} />

    <section className="px-12">
        <div className="w-full px-6 py-3 bg-white mt-16 ">
        {/* Title */}
        <h1 className="text-2xl font-bold text-textSecondColor mb-6">
            List All Users
        </h1>

        {/* Search Bar */}
        <div className="w-full max-sm:w-full max-sm:mr-auto mb-4">
            <SearchInput
            placeholder="Search User By Name/Email..."
            value={inputValue}
            onChange={handleInputChange}
            onClear={handleClearInput}
            className="w-[70%]"
            />
        </div>

        {/* Table */}
        <Table>
            <TableHeader />
            <tbody>
            {filteredUsers?.length > 0 ? (
                filteredUsers?.map((user) => (
                <TableRow key={user?.id} user={user} />
                ))
            ) : (
                <EmptyState colSpan={4} />
            )}
            </tbody>
        </Table>
        </div>
    </section>
    </>
);
};

export default Users;