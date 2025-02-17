import { HOST } from "../../config/config";
import { useInputStore } from "../../config/stores";
import { RequiredTextInput, CustomDateSelector } from "../../components/misc/inputs";
import axios from "axios";

export default function RegisterPage() {
    const { inputs } = useInputStore();
    const submit = async () => {
        const formData = {
            email: inputs.email,
            password: inputs.password,
            dob: inputs.dob,
            fName: inputs.fullName,
        };
        try {
            const response = await axios({
                method: "POST",
                url: `${HOST}auth/signup`,
                data: formData,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                window.location.href = "/login";
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="h-screen w-screen overflow-hidden flex justify-center items-center bg-blue-primary">
            <div className="py-10 w-[90%] max-w-[480px] h-fit rounded-lg bg-dark-primary text-grey-primary">
                <div className="w-full text-center">
                    <h1 className="text-xl">Wellcome!</h1>
                    <h3 className="text-xs">We're excited to see you!</h3>
                </div>
                <form className="flex px-10 flex-col gap-3 text-xs items-start">
                    <RequiredTextInput label="FULL NAME" name="fullName" />
                    <RequiredTextInput label="EMAIL" name="email" type={"email"} />
                    <RequiredTextInput label="PASSWORD" name="password" type={"password"} />
                    <RequiredTextInput label="CONFIRM PASSWORD" name="confirmPassword" type={"password"} />
                    <CustomDateSelector label="DATE OF BIRTH" name="dob" />
                    <div className="align-middle">
                        <input required type="checkbox" name="agree" id="agree" />
                        <label htmlFor="agree"> I agree to the terms and conditions</label>
                    </div>
                    <button
                        onClick={submit}
                        className="w-full rounded-sm text-white bg-blue-secondary px-4 py-3 bg-blue-primary hover:bg-blue-600">
                        REGISTER
                    </button>
                    <p>
                        already have an account ?
                        <a href="/login" className="text-blue-primary hover:text-blue-600">
                            {" "}
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
