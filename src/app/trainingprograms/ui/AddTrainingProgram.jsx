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
import { useAddMember } from "@/data/useMembers";
import Toast from "@/components/Toast";
import { addTrainingProgramSchema } from "@/schemas/trainingProgramAuth";
import { duration } from "@mui/material";
import { useCreateTrainingProgram } from "@/data/useTrainingPrograms";

const AddTrainingProgram = ({ isOpen, onOpenChange }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: error },
  } = useForm({
    resolver: zodResolver(addTrainingProgramSchema),
  });

  const [initialFormValue, setInitialFormValue] = useState({
    title: "",
    description: "",
    duration: 0,
    level: "string",
  });

  const processForm = async (data) => {
    const temp = {
      ...data,
      level: initialFormValue.level.currentKey,
      duration: Number(data.duration),
    };

    mutate(temp);
  };

  const formParams = [
    {
      label: "Title",
      placeholder: "Enter training program title...",
      startContent: <LiaUserTagSolid />,
      name: "title",
      value: initialFormValue.name,
      type: "text",
    },
    {
      label: "Description",
      placeholder: "Enter training program description...",
      startContent: <MdOutlineMail />,
      name: "description",
      value: initialFormValue.email,
      type: "text",
    },
    {
      label: "Duration(min)",
      placeholder: "Enter training program duration...",
      startContent: <PiExamFill />,
      name: "duration",
      value: initialFormValue.gpa,
      type: "number",
    },
  ];

  const handleOnClose = () => {
    isOpen = !isOpen;
  };

  const { mutate, error: serverError } =
    useCreateTrainingProgram(handleOnClose);

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
              <Select
                className="w-full"
                label="Select Role"
                selectedKeys={initialFormValue.level}
                onSelectionChange={(value) =>
                  setInitialFormValue({
                    ...initialFormValue,
                    level: value,
                  })
                }
                placeholder="Select level..."
                {...register("level")}
              >
                <SelectItem key="Easy" startContent={<GrUserManager />}>
                  Easy
                </SelectItem>
                <SelectItem key="Medium" startContent={<PiStudentFill />}>
                  Medium
                </SelectItem>
                <SelectItem key="Hard" startContent={<FaChalkboardTeacher />}>
                  Hard
                </SelectItem>
              </Select>
              {error["role"]?.message && (
                <p className="text-sm text-red-400">{error["level"].message}</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="foreground"
                variant="light"
                type="button"
                onPress={() => {
                  onClose();
                  reset();
                }}
                auto
              >
                Close
              </Button>
              <Button className="bg-btn text-white" type="submit" auto>
                Add
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>

      <Toast
        open={serverError}
        message={serverError?.message}
        severity={"error"}
      />
    </Modal>
  );
};

export default AddTrainingProgram;
