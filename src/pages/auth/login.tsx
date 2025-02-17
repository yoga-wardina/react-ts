import React from "react";
import { HOST } from "../../config/config";
import { RequiredTextInput } from "../../components/misc/inputs";
import axios from "axios";
import { useInputStore, useAuthStore } from "../../config/stores";

export default function LoginPage() {
    const { inputs } = useInputStore();
    const { login } = useAuthStore();
    const [error, setError] = React.useState<string>();
    const submit = async () => {
        const formData = {
            email: inputs.email,
            password: inputs.password,
        };
        try {
            const response = await axios({
                method: "POST",
                url: `${HOST}auth/login`,
                data: formData,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = response.data;
            localStorage.setItem("token", result.data.token);
            login(result.data.token);
            if (response.status === 200) {
                window.location.href = "/channel/123";
            }
        } catch (error) {
            setError("cock");
            console.error(error);
        }
    };
    return (
        <div className="h-screen w-screen overflow-hidden flex justify-center items-center bg-blue-primary">
            <div className="py-10 w-[90%] max-w-[480px] h-fit rounded-lg bg-dark-primary text-grey-primary">
                <div className="w-full text-center">
                    <h1 className="text-xl">Wellcome back!</h1>
                    <h3 className="text-xs">We're excited to see you again!</h3>
                </div>
                <div className="flex px-10 flex-col gap-3 text-xs">
                    {error && <div className="text-red-600">{error}</div>}
                    <RequiredTextInput label="EMAIL" name="email" />
                    <RequiredTextInput label="PASSWORD" name="password" type={"password"} />
                    <a href="" className="text-blue-primary hover:text-blue-600">
                        Forgot your password?
                    </a>
                    <button
                        onClick={submit}
                        className="w-full rounded-sm text-white bg-blue-secondary px-4 py-3 bg-blue-primary hover:bg-blue-600">
                        LOGIN
                    </button>
                    <p>
                        need and account ?
                        <a href="/register" className="text-blue-primary hover:text-blue-600">
                            {" "}
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
