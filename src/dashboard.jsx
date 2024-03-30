import { useEffect, useState } from "react";
import axios from "axios";

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
import Toggle from "./toggle";
import { Search, Calendar, LogOut } from "lucide-react"
import React, { useContext } from 'react';

import { AuthContext } from './authprovider';

export default function Dashboard() {

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("all");

    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.get("/api/patients/", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => console.log(error));
        }
        console.log(sortOption)
    }, [sortOption]);

    function handleLogout() {
        logout();
    }

    // Filter patients based on search query
    const filteredData = data.filter((patient) =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort patients based on sort option
    let sortedData = [...filteredData];
    if (sortOption === "male" || sortOption === "female") {
        sortedData = sortedData.filter((patient) => patient.gender.toLowerCase() === sortOption);
    } else if (sortOption === "age") {
        sortedData.sort((a, b) => b.age - a.age);
    }

    const handleSortChange = (value) => {
        setSortOption(value);
    };


    return (
        <div className="flex flex-col w-full min-h-screen">












            <div className="flex justify-between items-center mt-4">
                <a href="#" className="ml-4">
                    <Button variant="link">
                        <Calendar className="w-6 h-6 mr-2" />
                        Appointment
                    </Button>
                </a>

                <div className="mr-4">
                    <Button onClick={handleLogout} className="mr-2" size="icon" variant="ghost">
                        <LogOut style={{width:'18px',height:'18px'}}/>
                    </Button>

                    <Button className="mr-2" size="icon" variant="ghost">
                        <Toggle />
                    </Button>
                </div>
            </div>












            <div className="flex justify-between items-center flex-wrap" >


                <div className="flex justify-between items-center  mt-10 mx-6">
                    <Select className="fixed top-4 right-10" onValueChange={handleSortChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sort</SelectLabel>
                                <SelectItem value="all"  >All</SelectItem>
                                <SelectItem value="male" >Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="age">Age</SelectItem>
                            </SelectGroup>

                        </SelectContent>
                    </Select>
                    <div className="relative ml-6">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            className="pl-8 w-full md:w-[300px] lg:w-[300px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                    {sortedData.length > 0 ? (
                        <div>
                            {sortedData.map((patient) => (
                                <Card key={patient._id} className="my-2">
                                    <CardContent className="p-4">
                                        <div className="grid gap-1 text-sm">
                                            <a className="font-semibold" href="#">
                                                {patient.name}
                                            </a>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{patient.age} years</p>
                                            <p className="">Gender: {patient.gender}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <h3 className="text-center mt-4">No Patients found</h3>
                    )}
                </div>
            </main>
        </div>
    )
}
