import React from "react";
import { useForm } from "react-hook-form";


export const ExampleForm2 = () => {
    type FormData = {
        firstname: string;
        lastname: string;
        email: string;
        phNo :number;
        // phNumber: { number: string }[];
    }
    const form = useForm<FormData>({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            phNo :0,
            // phNumber: [{ number: "" }],
        },
        mode: "onBlur",
    });
    return (
        <div>
            <form className="form" onSubmit={form.handleSubmit((data: FormData) => console.log(data))}>
                <h1>Example Form using Only Typescript</h1>
                <div className="formcontainer">
                    <div className="form-set">
                        <div className="form-group">
                            <label htmlFor="fname">First Name</label>
                            <input type="text" id="fname" placeholder="Your first name.." {...form.register("firstname",{
                                   required :{
                                    value:true,
                                    message:"First name is required"    
                                },
                                maxLength:{
                                    value:30,
                                    message:"First name must be less than 30 characters"
                                },
                                minLength:{
                                    value:1,
                                    message:"first name must be greater or equal to 1 characters"
                                }
                            })} />
                        </div>
                        {form.formState.errors.firstname && <p className="error">{form.formState.errors.firstname.message}</p>}
                    </div>
                    
                    <div className="form-set">
                        <div className="form-group">
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" id="lname" placeholder="Your last name.." {...form.register("lastname",{
                                required :{
                                    value:true,
                                    message:"Last name is required"    
                                },
                                maxLength:{
                                    value:30,
                                    message:"Last name must be less than 30 characters"
                                },
                                minLength:{
                                    value:1,
                                    message:"Last name must be greater or equal to 1 characters"
                                }
                            })} />
                        </div>
                        {form.formState.errors.lastname && <p className="error">{form.formState.errors.lastname.message}</p>}
                    </div>

                    
                    <div className="form-set">
                        <div className="form-group">
                            <label htmlFor="phno">Ph No</label>
                            <input type="text" id="phno" placeholder="Your phone number.." {...form.register("phNo",
                            {valueAsNumber:true,
                            required:{
                                value:true,
                                message:"Phone number is required"   
                            },
                            validate:{
                                validNo : (value:number)=>{
                                   return value.toString().length === 10 || "Invalid phone number must have 10 digit"
                                },
                                mustHave :(value:number)=>{
                                    return value.toString().startsWith("9") || "phone number must start with 9"
                                }
                           }
                            })} />
                        </div>
                        {form.formState.errors.phNo && <p className="error">{form.formState.errors.phNo.message}</p>}
                    </div>
                    <button type="submit" className="btn">Submit</button>
                </div>
            </form>
        </div>
    )
}