import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Search, Calendar, LogOut } from "lucide-react"
import React, { useContext } from 'react';

import { AuthContext } from './authprovider';

export default function Dashboard() {

    const { logout } = useContext(AuthContext);


    function handleLogout() {
        logout()
    }
    return (
        <div className="flex flex-col w-full min-h-screen">


            <div className="flex justify-between items-center flex-wrap mt-6">



                <a className="fixed top-4 left-4" href="#">
                    <Button variant="link">
                        <Calendar className="w-6 h-6 mr-2" />
                        Appointment
                    </Button>
                </a>



                <Button onClick={handleLogout} className="rounded-full fixed top-4 right-4" size="icon" variant="ghost">
                    <LogOut />
                </Button>




                <div className="flex justify-between items-center  mt-10 mx-6">
                        <Select className="fixed top-4 right-10 ">
                            <SelectTrigger>
                                <SelectValue placeholder="Sort" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Sort</SelectLabel>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="age">Age</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>                   

                <div className="relative ml-6">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                        className="pl-8 w-full md:w-[300px] lg:w-[300px]"

                        placeholder="Search patients..."
                        type="search"
                    />
                </div>

                </div>








            </div>







            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="flex items-center">
                    <h1 className="font-semibold text-lg md:text-2xl">Patients</h1>
                    <Button className="ml-auto" size="sm">
                        Add patient
                    </Button>
                </div>
                <div className="grid gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="grid gap-1 text-sm">
                                <a className="font-semibold" href="#">
                                    Alice Johnson
                                </a>
                                <p className="text-sm text-gray-500 dark:text-gray-400">25 years old</p>
                                <p className="">Condition: Fever</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="grid gap-1 text-sm">
                                <a className="font-semibold" href="#">
                                    Bob Smith
                                </a>
                                <p className="text-sm text-gray-500 dark:text-gray-400">32 years old</p>
                                <p className="">Condition: Sore throat</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="grid gap-1 text-sm">
                                <a className="font-semibold" href="#">
                                    Carol Taylor
                                </a>
                                <p className="text-sm text-gray-500 dark:text-gray-400">45 years old</p>
                                <p className="">Condition: High blood pressure</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="grid gap-1 text-sm">
                                <a className="font-semibold" href="#">
                                    David Lee
                                </a>
                                <p className="text-sm text-gray-500 dark:text-gray-400">60 years old</p>
                                <p className="">Condition: Diabetes</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}