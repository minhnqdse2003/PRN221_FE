import { addMemberSchema } from "@/schemas/memberAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseDate } from "@internationalized/date";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Switch,
  DateInput,
  SelectItem,
  Select,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillMortarboardFill } from "react-icons/bs";
import { FaChalkboardTeacher, FaPhone } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { LiaUserTagSolid } from "react-icons/lia";
import { MdOutlineMail, MdSubtitles } from "react-icons/md";
import { PiExamFill, PiStudentFill } from "react-icons/pi";
import { GrUserManager } from "react-icons/gr";

const AddMemberModal = ({ isOpen, onOpenChange }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: error },
  } = useForm({
    resolver: zodResolver(addMemberSchema),
  });

  const [initialFormValue, setInitialFormValue] = useState({
    name: "",
    email: "",
    gpa: 0.0,
    address: "",
    phone: "",
    major: "",
    "desired-position": "",
    "link-cv": "",
    gender: true,
    dob: parseDate("2024-12-24"),
    status: true,
    role: "Manager",
  });

  const onValueChange = (e) => {
    setInitialFormValue({
      ...initialFormValue,
      [e.target.name]: e.target.value,
    });
  };

  const formParams = [
    {
      label: "Name",
      placeholder: "Enter member name...",
      startContent: <LiaUserTagSolid />,
      name: "name",
      value: initialFormValue.name,
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Email",
      placeholder: "Enter member email...",
      startContent: <MdOutlineMail />,
      name: "email",
      value: initialFormValue.gpa,
      onChange: onValueChange,
      type: "email",
    },
    {
      label: "GPA",
      placeholder: "Enter member GPA...",
      startContent: <PiExamFill />,
      name: "gpa",
      value: initialFormValue.gpa,
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Address",
      placeholder: "Enter member address...",
      startContent: <FaLocationCrosshairs />,
      name: "address",
      value: initialFormValue.address,
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Phone",
      placeholder: "Enter member phone...",
      startContent: <FaPhone />,
      name: "phone",
      value: initialFormValue.phone,
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Major",
      placeholder: "Enter member major...",
      startContent: <BsFillMortarboardFill />,
      name: "major",
      value: initialFormValue.major,
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Position",
      placeholder: "Enter member position...",
      startContent: <BsFillMortarboardFill />,
      name: "desired-position",
      value: initialFormValue["desired-position"],
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Link-CV",
      placeholder: "Enter member cv...",
      startContent: <MdSubtitles />,
      name: "link-cv",
      value: initialFormValue["link-cv"],
      onChange: onValueChange,
      type: "text",
    },
  ];

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="md"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Member
            </ModalHeader>
            <ModalBody>
              {formParams.map((param) => (
                <>
                  <Input
                    key={param.label}
                    label={param.label}
                    placeholder={param.placeholder}
                    startContent={param.startContent}
                    name={param.name}
                    onChange={param.onChange}
                    {...register(param.name)}
                    type={param.type}
                  />
                  {error[param.name]?.message && (
                    <p className="text-sm text-red-400">
                      {error[param.name].message}
                    </p>
                  )}
                </>
              ))}
              <DateInput
                key="dob"
                name="dob"
                placeholder="Enter member dob..."
                label="Date Of Birth"
                value={initialFormValue.dob}
                onChange={(value) =>
                  setInitialFormValue({
                    ...initialFormValue,
                    dob: value,
                  })
                }
              />
              <div className="flex flex-row justify-between">
                <Switch
                  isSelected={initialFormValue.gender}
                  onValueChange={(value) =>
                    setInitialFormValue({ ...initialFormValue, gender: value })
                  }
                >
                  {initialFormValue.gender ? "Male" : "Female"}
                </Switch>
                <Switch
                  isSelected={initialFormValue.status}
                  onValueChange={(value) =>
                    setInitialFormValue({ ...initialFormValue, status: value })
                  }
                >
                  {initialFormValue.status ? "Active" : "InActive"}
                </Switch>
              </div>
              <Select
                className="w-full"
                label="Select Role"
                selectedKeys={initialFormValue.role}
                onSelectionChange={(value) =>
                  setInitialFormValue({
                    ...initialFormValue,
                    role: value,
                  })
                }
                placeholder="Select Role..."
                
              >
                <SelectItem key="Manager" startContent={<GrUserManager />}>
                  Manager
                </SelectItem>
                <SelectItem key="Intern" startContent={<PiStudentFill />}>
                  Intern
                </SelectItem>
                <SelectItem key="Mentor" startContent={<FaChalkboardTeacher />}>
                  Mentor
                </SelectItem>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="foreground" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button className="bg-btn text-white" onPress={onClose}>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddMemberModal;
