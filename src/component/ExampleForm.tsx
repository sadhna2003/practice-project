import React from "react";
import zod from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = zod.object({
    firstname: zod.string().min(1, { message: "First name is required" }).default("John"),
    lastname: zod.string().min(1, { message: "Last name is required" }).default("Doe"),
    email: zod.string().email({ message: "Invalid email address" }).default("asd@example.com"),
    phNumber: zod.array(zod.object({
        number: zod.coerce.number().min(1000000000, { message: "Invalid phone number must have 10 digits" }).max(9999999999, { message: "Invalid phone number must have 10 digits" }).default(1234567890),
    })).default([{ number: 1234567890 }]),
})

type FormValue = zod.infer<typeof schema>;
const defaultValues: FormValue = schema.parse({});
export const ExampleForm = () => {
    const form = useForm<FormValue>({
        resolver: zodResolver(schema),
        defaultValues,
        // defaultValues: {
        //     firstname: "",
        //     lastname: "",
        //     email: "",
        //     phNumber: [{ number: "" }],
        // },
        
        
        // mode: "onBlur",
    });

    const { fields,append,remove } = useFieldArray({
        name: "phNumber",
        control: form.control,
        rules: {
            required: true
        },
       
    })

    // console.log("ph number value",form.watch("phNumber"));
    return (
        <div>
            <form className="form" onSubmit={form.handleSubmit((data: FormValue) => console.log(data))}>
                <h1>Example Form</h1>
                <div className="formcontainer">
                    <div className="form-set">
                        <div className="form-group">
                            <label htmlFor="fname">First Name</label>
                            <input type="text" id="fname" placeholder="Your first name.." {...form.register("firstname")} />
                        </div>
                        {form.formState.errors.firstname && <p className="error">{form.formState.errors.firstname.message}</p>}
                    </div>
                    <div className="form-set">
                        <div className="form-group">
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" id="lname" placeholder="Your last name.." {...form.register("lastname")} />
                        </div>
                        {form.formState.errors.lastname && <p className="error">{form.formState.errors.lastname.message}</p>}
                    </div>
                    <div className="form-set">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Your email address.." {...form.register("email")} />
                        </div>
                        {form.formState.errors.email && <p className="error">{form.formState.errors.email.message}</p>}
                    </div>
                    <div className="form-set">
                        <div className="form-group">
                            {/* <label htmlFor="phno">Phone Number</label> */}
                            <div>
                                {fields.map((field, index) => {
                                    return (
                                        <>
                                        <div key={field.id} className="form-group">
                                              <label htmlFor="phno">Phone Number {index+1}</label>
                                            <input type="text" id={`phno${index}`} placeholder="Your Number..." {...form.register(`phNumber.${index}.number` as const)} />
                                             {index>0 && 
                                             <button type="button" onClick={()=>remove(index)}>remove</button>
                                             }
                                        </div>
                                        {form.formState.errors.phNumber?.[index]?.number && <p className="error" key={index}>{form.formState.errors.phNumber[index]?.number?.message}</p>}
                                        </>
                                    )
                                })}
                                {/* <button type="button" onClick={() => append({ number: "" })}>add</button> */}
                                {/* <input type="text" id="phno"  placeholder="Your Number..." {...form.register("phNumber")}/>  */}
                            </div>
                        </div>
                        <button type="button" onClick={() => append({ number: 0 })}>add</button>
                        {/* {form.formState.errors.phNumber && <p className="error">{form.formState.errors.phNumber.message}</p>} */}
                    </div>
                    <input type="submit" value={"Submit"} className="btn" />
                </div>
            </form>


        </div>
    )
};
