import { useState } from "react";

import Link from "next/link";
import {useAuth} from "@/providers/AuthProvider";
import {Card, CardContent} from "ui/Card";
import {Label} from "ui/label";
import {Input} from "ui/Input";
import {Button} from "ui/Button";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const { login, isLoading, error, clearError } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({ username: "", password: "" });

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors = { username: "", password: "" };

        if (!username.trim()) {
            newErrors.username = "Username is required";
            isValid = false;
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setFormErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        if (validateForm()) {
            await login({ username, password });
        }
    };

    return (
        <div className={className} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">Welcome back</h1>
                            <p className="text-sm text-muted-foreground">
                                Login to your account
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading} isLoading={isLoading}>
                            Login
                        </Button>

                        <p className="text-sm text-center">
                            Don’t have an account?{" "}
                            <Link href="/signup" className="text-blue-600 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </form>

                    {/* You can add a fancy image or branding section on the right if desired */}
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="https://w7.pngwing.com/pngs/1024/983/png-transparent-albert-einstein-thumbnail.png"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
