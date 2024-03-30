import React, { useState } from 'react';
import { format } from "date-fns";
import axios from 'axios';
import { Button } from './components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import Toggle from "./toggle";
import { Activity } from "lucide-react";
function Homepage() {

  // Destructure toast function from useToast hook
  const { toast } = useToast();

  // State variables for managing form data and selected date
  const [date, setDate] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    message: "",
    status: "waiting",
    date: ""
  });


  // Function to validate form data
  const validateFormData = () => {
    let errors = {};

    // Check if first name is present
    if (!formData.firstname) {
      errors.firstname = "First name is required";
    }

    // Check if last name is present
    if (!formData.lastname) {
      errors.lastname = "Last name is required";
    }

    // Check if phone number is present and follows Indian format with 10 digits
    const indianPhoneNumberRegex = /^[6-9]\d{9}$/; // Indian phone number regex
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!indianPhoneNumberRegex.test(formData.phone)) {
      errors.phone = "Invalid Indian phone number format";
    }

    // Check if date is selected
    if (!date) {
      errors.date = "Date is required";
    }
    if (!message) {
      errors.message = "Message is required";
    }

    return errors;
  };

  // Function to handle form submission
  const handleContinue = async () => {
    try {
      // Validate form data
      const errors = validateFormData();

      // If errors exist, display toast message and return
      if (Object.keys(errors).length > 0) {
        const errorMessage = Object.values(errors).join(", ");
        toast({
          variant: "destructive",
          title: errorMessage,
          description: "Appointment not booked.",
        });
        return;
      }

      // Prepare data to send
      const dataToSend = { ...formData, date };

      // Log data to send
      console.log(dataToSend);

      // Make POST request to API endpoint
      const response = await axios.post('http://localhost:5000/api/appointment', dataToSend);

      // Log success message and response data
      console.log('Appointment successfully submitted');
      console.log('Response:', response.data);

      // Extract appointment date from response data
      const appointmentDate = response.data.date;

      // Display toast message with appointment details
      toast({
        title: "Scheduled: Catch up",
        description: appointmentDate ? `Date : ${appointmentDate}` : 'Date not available',
      });

      setTimeout(function() {
        location.reload();
    }, 5000);
    } catch (error) {
      // If an error occurs during submission, display error toast message
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        // description: "Appointment not booked.",
        description: `${error}`,

        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      console.error('Error occurred while submitting appointment:', error);
    }
  };


  // Function to handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    // Update form data with new value
    setFormData({
      ...formData,
      [id]: value
    });
  };





  return (

    <div>


      <div className="flex justify-between items-center py-4 px-6 lg:px-10">
        <Activity className="h-6 w-6 text-red-600" />

        <div className="flex space-x-4 items-center">
          <a href="#appointmentid">        <Button variant="link" className="font-normal">Appointment</Button>
          </a>

          <a href="#contact">        <Button variant="link" className="font-normal">Contact</Button>
          </a>
          <a href="/login">          <Button variant="link" className="font-normal">Login</Button>
</a>
          <Toggle />
        </div>
      </div>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid max-w-5xl mx-auto items-center gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Welcome to Swasthya Hospital
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Health, Our Priority</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  We are committed to providing exceptional care and support for all our patients. Your well-being is at
                  the heart of everything we do.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Image"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="310"
                  src="https://picsum.photos/200"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid max-w-5xl mx-auto items-center gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="flex items-center justify-center">
                <img
                  alt="Image"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="310"
                  src="https://picsum.photos/200
                  "
                  width="550"
                />
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Specialties
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Expert Care. Exceptional Results.</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our team of skilled healthcare professionals is dedicated to delivering high-quality care across a
                  range of medical specialties. We combine expertise with compassion to ensure the best possible
                  outcomes for our patients.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid max-w-5xl mx-auto items-center gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Compassionate Care, Satisfied Patients
                </h2>
                <div className="grid gap-2">
                  <div className="border rounded-lg p-4 flex items-start gap-4 bg-gray-50 dark:bg-gray-950">
                    <img
                      alt="User"
                      className="rounded-full overflow-hidden object-cover object-center"
                      height="80"
                      src="https://picsum.photos/200
                      "
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width="80"
                    />
                    <p className="text-gray-500 border-l pl-4 min-h-[80px] flex-1 dark:text-gray-400">
                      "I received excellent care at Swasthya Hospital. The doctors and staff were attentive, and the
                      facilities were top-notch. I highly recommend this hospital to anyone in need of medical
                      treatment."
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 flex items-start gap-4 bg-gray-50 dark:bg-gray-950">
                    <img
                      alt="User"
                      className="rounded-full overflow-hidden object-cover object-center"
                      height="80"
                      src="https://picsum.photos/200
                      "
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width="80"
                    />
                    <p className="text-gray-500 border-l pl-4 min-h-[80px] flex-1 dark:text-gray-400">
                      "The care I received at Swasthya Hospital was exceptional. The doctors were knowledgeable, and the
                      staff was friendly. I felt well taken care of throughout my treatment. This hospital truly puts
                      patients first."
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Image"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="310"
                  src="https://picsum.photos/200
                  "
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid max-w-5xl mx-auto items-center gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="flex items-center justify-center">
                <img
                  alt="Image"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="310"
                  src="https://picsum.photos/200
                  "
                  width="550"
                />
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Our Team</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet Our Medical Experts</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our hospital is proud to have a team of dedicated and experienced healthcare professionals who are
                  committed to providing the best possible care for our patients. Each member of our team brings
                  expertise, compassion, and innovation to their role, ensuring that you receive high-quality treatment
                  and personalized attention.
                </p>
              </div>
            </div>
          </div>
        </section>


        <section id='appointmentid' className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid max-w-3xl mx-auto items-center gap-6">
              {/* Section Title and Description */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Book an Appointment</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Fill out the form below to book an appointment with our medical experts.
                </p>
              </div>

              {/* Form for Booking Appointment */}
              <div className="grid gap-4">
                {/* First Name and Last Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstname">First name</Label>
                    <Input id="firstname" placeholder="Enter your first name" onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Last name</Label>
                    <Input id="lastname" placeholder="Enter your last name" onChange={handleChange} />
                  </div>
                </div>

                {/* Phone Number Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter your phone number" onChange={handleChange} />
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label className='mr-2' htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className={"w-[280px] justify-start text-left font-normal"}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea className="min-h-[100px]" id="message" placeholder="Enter your message" onChange={handleChange} />
                </div>

                {/* Booking Appointment Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button >Book Appointment</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Book Appointment</AlertDialogTitle>
                      <AlertDialogDescription>Your appointment will be booked in Swasthya Hospital</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </section>




        <footer id='contact' className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          {/* Copyright notice */}
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Swasthya Hospital. All rights reserved.</p>

          {/* Navigation links */}
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            {/* Contact Us link */}
            <a href="mailto:op.pranay.bhange@gmail.com" target="_blank" rel="noopener noreferrer">
              <Button variant="link" className="text-xs hover:underline underline-offset-4">
                Contact Us
              </Button>
            </a>

            {/* Developer link */}
            <a href="https://www.linkedin.com/in/pranaybhange/" target="_blank" rel="noopener noreferrer">
              <Button variant="link" className="text-xs hover:underline underline-offset-4">
                Developer
              </Button>
            </a>

            {/* Create Account link */}
            <a href="mailto:op.pranay.bhange@gmail.com" target="_blank" rel="noopener noreferrer">
              <Button variant="link" className="text-xs hover:underline underline-offset-4">
                Create Account
              </Button>
            </a>
          </nav>
        </footer>



      </main>












    </div>







  )


}


export default Homepage;
