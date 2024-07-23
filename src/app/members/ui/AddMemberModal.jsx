"use client";
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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillMortarboardFill } from "react-icons/bs";
import { FaChalkboardTeacher, FaPhone } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { LiaUserTagSolid } from "react-icons/lia";
import { MdOutlineMail, MdSubtitles } from "react-icons/md";
import { PiExamFill, PiStudentFill } from "react-icons/pi";
import { GrUserManager } from "react-icons/gr";
import { useAddMember, usePutMembers } from "@/data/useMembers";
import Toast from "@/components/Toast";

const AddMemberModal = ({
  isOpen,
  onOpenChange,
  selectedRow,
  resetField,
  setSelectedRow,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: error },
  } = useForm({
    resolver: zodResolver(addMemberSchema),
  });

  let intialValue = {
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
  };

  const [initialFormValue, setInitialFormValue] = useState(intialValue);

  const processForm = async (data) => {
    const date = new Date(initialFormValue.dob.toString());
    const formData = {
      email: data.email,
      name: data.name,
      role: data.role,
      "date-of-birth": date.toISOString(),
      "is-male": initialFormValue.gender,
      phone: data.phone,
      address: data.address,
      gpa: Number(data.gpa),
      "link-cv": data["link-cv"],
      major: data.major,
      status: initialFormValue.status,
      "desired-position": data["desired-position"],
    };

    if (selectedRow) mutatePut(selectedRow);
    else mutate(formData);
  };

  const resetAllField = () => {
    reset();
    resetField();
    setInitialFormValue({
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
  };

  const formParams = [
    {
      label: "Name",
      placeholder: "Enter member name...",
      startContent: <LiaUserTagSolid />,
      name: "name",
      value: initialFormValue.name,
      type: "text",
    },
    {
      label: "Email",
      placeholder: "Enter member email...",
      startContent: <MdOutlineMail />,
      name: "email",
      value: initialFormValue.email,
      type: "email",
    },
    {
      label: "GPA",
      placeholder: "Enter member GPA...",
      startContent: <PiExamFill />,
      name: "gpa",
      value: initialFormValue.gpa,
      type: "text",
    },
    {
      label: "Address",
      placeholder: "Enter member address...",
      startContent: <FaLocationCrosshairs />,
      name: "address",
      value: initialFormValue.address,
      type: "text",
    },
    {
      label: "Phone",
      placeholder: "Enter member phone...",
      startContent: <FaPhone />,
      name: "phone",
      value: initialFormValue.phone,
      type: "text",
    },
    {
      label: "Major",
      placeholder: "Enter member major...",
      startContent: <BsFillMortarboardFill />,
      name: "major",
      value: initialFormValue.major,
      type: "text",
    },
    {
      label: "Position",
      placeholder: "Enter member position...",
      startContent: <BsFillMortarboardFill />,
      name: "desired-position",
      value: initialFormValue["desired-position"],
      type: "text",
    },
    {
      label: "Link-CV",
      placeholder: "Enter member cv...",
      startContent: <MdSubtitles />,
      name: "link-cv",
      value: initialFormValue["link-cv"],
      type: "text",
    },
  ];

  const handleOnClose = () => {
    isOpen = !isOpen;
  };

  const handleOnValueChange = (e, name) => {
    if (selectedRow) {
      setSelectedRow({ ...selectedRow, [name]: e });
    } else setInitialFormValue({ ...initialFormValue, [name]: e });
  };

  const { mutate, error: serverError } = useAddMember(handleOnClose);

  const { mutate: mutatePut, error: putError } = usePutMembers(handleOnClose);

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange();
        resetAllField();
      }}
      radius="md"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(processForm)}>
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
                    value={
                      selectedRow
                        ? selectedRow[param.name]
                        : initialFormValue[param.name]
                    }
                    onValueChange={(e) => handleOnValueChange(e, param.name)}
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
                  {...register("gender")}
                >
                  {initialFormValue.gender ? "Male" : "Female"}
                </Switch>
                {error["gender"]?.message && (
                  <p className="text-sm text-red-400">
                    {error["gender"].message}
                  </p>
                )}
                <Switch
                  isSelected={initialFormValue.status}
                  onValueChange={(value) =>
                    setInitialFormValue({ ...initialFormValue, status: value })
                  }
                  {...register("status")}
                >
                  {initialFormValue.status ? "Active" : "InActive"}
                </Switch>
                {error["status"]?.message && (
                  <p className="text-sm text-red-400">
                    {error["status"].message}
                  </p>
                )}
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
                {...register("role")}
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
              {error["role"]?.message && (
                <p className="text-sm text-red-400">{error["role"].message}</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="foreground"
                variant="light"
                type="button"
                onPress={() => {
                  onClose();
                  resetAllField();
                }}
                auto
              >
                Close
              </Button>
              {selectedRow ? (
                <Button className="bg-btn text-white" type="submit" auto>
                  Update
                </Button>
              ) : (
                <Button className="bg-btn text-white" type="submit" auto>
                  Add
                </Button>
              )}
            </ModalFooter>
          </form>
        )}
      </ModalContent>

      <Toast
        open={!!serverError}
        message={serverError?.message}
        severity={"error"}
      />
    </Modal>
  );
};

export default AddMemberModal;
