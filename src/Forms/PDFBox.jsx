import React, { useEffect, useState } from 'react'
import { Button, FileInput } from "@mantine/core";
import { Controller } from "react-hook-form";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegFile } from "react-icons/fa";

const PDFBox = ({ control, name, error, label, setValue, resetTrigger }) => {
    const [pdfPreview, setPdfPreview] = useState(null);

    const handlePdfChange = (file) => {
        if (file) {
            setPdfPreview(URL.createObjectURL(file));
            setValue(name, file);
        }
    };

    const handlePdfRemove = () => {
        setPdfPreview(null);
        setValue(name, null);
    };

    useEffect(() => {
        setPdfPreview(null);
        setValue(name, null);
    }, [resetTrigger, setValue, name]);

return (
    <div>
        <label className="block text-lg font-bold text-main ml-4 mb-1">{label}</label>
        <Controller
            name={name}
            defaultValue={null}
            control={control}
            render={({ field }) => (
                <>
                    {!pdfPreview ? (
                        <FileInput
                            type="file"
                            {...field}
                            onChange={(file) => {
                                field.onChange(file);
                                handlePdfChange(file);
                            }}
                            placeholder={<FaRegFile size={160} color={error ? '#ef4444' : '#9ca3af'} />}
                            accept=".pdf"
                            value={pdfPreview}
                            error={error}
                            className={`w-48 h-48 flex flex-col justify-center items-start`}
                            classNames={{
                                input: `!py-3 !rounded-xl !w-full !h-full bg-transparent outline-none border ${error ? "border-red-500" : "border-gray"}`,
                                error: "text-red-500 text-xs ml-1",
                            }}
                        />
                    ) : (
                        <div className="relative w-48 h-48 border rounded-xl">
                            <iframe
                                src={pdfPreview}
                                title="PDF Preview"
                                className="w-full h-full object-cover rounded-xl"
                            ></iframe>
                            <Button
                                className="absolute top-2 right-2"
                                onClick={() => {
                                    field.onChange(null);
                                    handlePdfRemove();
                                }}
                                variant="subtle"
                                size="xs"
                            >
                                <TiDeleteOutline color="red" size={18} />
                            </Button>
                        </div>
                    )}
                </>
            )}
        />
    </div>
)
}

export default PDFBox
