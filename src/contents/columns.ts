import { ColumnDef} from "@tanstack/react-table"

interface Column { // Interface for your data type
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    date_of_birth: string; // Assuming it's a string for now
    age: number;
  }
export const COLUMNS: ColumnDef<Column, any>[] = [
    {
        header : "Id",
        footer : "Id",
        accessorKey :"id",
        enableColumnFilter : false
    },
    {
        header : "First Name",
        footer : "First Name",
        accessorKey : "first_name"
    },
    {
        header : "Last Name", 
        footer : "Last Name",  
        accessorKey : "last_name"
    },
    {
        header : "Email",
        footer : "Email",
        accessorKey : "email"
    },
    {
        header: "Gender",
        footer: "Gender",
        accessorKey : "gender"
    },
    {
        header : "Date of Birth",
        footer : "Date of Birth",
        accessorKey : "date_of_birth"
    },
    {
        header : "Age",
        footer : "Age",
        accessorKey : "age"
    }
];

export const GROUP_COLUMNS =[
    {
        header:"Id",
        accessorKey:"id"
    },
    {
        header:"Name",
        columns :[
            {
                header : "First Name",
                footer : "First Name",
                accessorKey : "first_name"
            },
            {
                header : "Last Name", 
                footer : "Last Name",  
                accessorKey : "last_name"
            },
        ]
    },
    {
        header:"Info",
        columns:[
            {
                header : "Email",
                footer : "Email",
                accessorKey : "email"
            },
            {
                header: "Gender",
                footer: "Gender",
                accessorKey : "gender"
            },
            {
                header : "Date of Birth",
                footer : "Date of Birth",
                accessorKey : "date_of_birth"
            },
            {
                header : "Age",
                footer : "Age",
                accessorKey : "age"
            },
        ]
    }
]