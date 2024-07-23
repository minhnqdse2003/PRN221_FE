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
import { useAddMember } from "@/data/useMembers";
import Toast from "@/components/Toast";
import { addLessonSchema } from "@/schemas/lessonAuth";
import { useAddLesson } from "@/data/useLesson";
import { usePutLesson } from "@/data/useTrainingPrograms";

const AddLessonModal = ({
  isOpen,
  onOpenChange,
  trainingProgramId,
  selectedLesson,
  resetField,
  currTP,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: error },
  } = useForm({
    resolver: zodResolver(addLessonSchema),
  });

  const [initialFormValue, setInitialFormValue] = useState({
    title: "",
    description: "",
    url: "",
    resource: "",
    "training-program-id": "",
  });

  useEffect(() => {
    if (selectedLesson) setInitialFormValue(selectedLesson);
  }, [selectedLesson]);

  const processForm = async (data) => {
    data = { ...data, "training-program-id": trainingProgramId };

    if (selectedLesson) putMutate(initialFormValue);
    else mutate(data);
  };

  const formParams = [
    {
      label: "Title",
      placeholder: "Enter title lesson...",
      startContent: <LiaUserTagSolid />,
      name: "title",
      value: initialFormValue.title,
      type: "text",
    },
    {
      label: "Description",
      placeholder: "Enter lesson description...",
      startContent: <LiaUserTagSolid />,
      name: "description",
      value: initialFormValue.description,
      type: "text",
    },
    {
      label: "Url",
      placeholder: "Enter url...",
      startContent: <LiaUserTagSolid />,
      name: "url",
      value: initialFormValue.url,
      type: "text",
    },
    {
      label: "Resource",
      placeholder: "Enter resource...",
      startContent: <LiaUserTagSolid />,
      name: "resource",
      value: initialFormValue.resource,
      type: "text",
    },
  ];

  const resetAllField = () => {
    reset();
    resetField();
    setInitialFormValue({
      title: "",
      description: "",
      url: "",
      resource: "",
      "training-program-id": "",
    });
  };

  const { mutate, error: serverError } = useAddLesson(onOpenChange);
  const { mutate: putMutate, isSuccess } = usePutLesson(currTP);

  const onchange = (e, name) => {
    setInitialFormValue({ ...initialFormValue, [name]: e });
  };

  if (isSuccess) {
    isOpen = !isOpen;
  }

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
                    value={initialFormValue[param.name]}
                    onValueChange={(e) => onchange(e, param.name)}
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
            </ModalBody>
            <ModalFooter>
              <Button
                color="foreground"
                variant="light"
                type="button"
                onPress={() => {
                  onOpenChange();
                  resetAllField();
                }}
                auto
              >
                Close
              </Button>
              {selectedLesson ? (
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
      {serverError && (
        <Toast open={true} message={serverError?.message} severity={"error"} />
      )}
    </Modal>
  );
};

export default AddLessonModal;
