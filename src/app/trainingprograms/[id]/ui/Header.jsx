"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Link,
  CircularProgress,
  Divider,
  Chip,
  Avatar,
  useDisclosure,
} from "@nextui-org/react";
import { FaRegAddressCard, FaUser } from "react-icons/fa";
import { MdOutlineDescription, MdOutlineEdit } from "react-icons/md";
import { useSession } from "next-auth/react";
import {
  useDeleteLesson,
  useGetJoinedTrainingProgram,
  usePostJoinedTrainingProgram,
} from "@/data/useTrainingPrograms";
import { IoIosRemoveCircleOutline, IoMdAdd } from "react-icons/io";
import AddLessonModal from "./AddLessonModal";

export default function Header({ trainingProgram, isLoading }) {
  const [isJoined, setIsJoined] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: joinedTrainingProgram } = useGetJoinedTrainingProgram();
  const { mutate } = usePostJoinedTrainingProgram();

  const currentUser = useSession();

  const isManager = currentUser.data.user.role === "Training Manager";
  const isIntern = currentUser.data.user.role === "Intern";

  const data = trainingProgram;

  const { mutate: mutateDelete } = useDeleteLesson(data?.detail?.id);
  useEffect(() => {
    if (joinedTrainingProgram && data) {
      const joinedTrainingProgramIds = joinedTrainingProgram.data.map(
        (item) => item["training-program-id"]
      );
      setIsJoined(!joinedTrainingProgramIds.includes(data.detail.id));
    }
  }, [joinedTrainingProgram]);

  const handleOnClickSetIsJoined = () => {
    mutate({
      "training-program-id": data.detail.id,
    });
  };

  const resetFieldModal = () => {
    setSelectedLesson(null);
  };

  const onEditedSLesson = (item) => {
    setSelectedLesson(item);
  };

  const onDeleteSLesson = (item) => {
    mutateDelete(item.id);
  };

  return (
    <div className="w-full flex flex-row border border-divider px-4">
      {!isLoading ? (
        <>
          <Card className="w-1/2" shadow="none" radius="none">
            <CardHeader className="gap-8 items-center justify-between">
              <div className="flex gap-5">
                <div className="flex flex-row w-full justify-between items-center gap-4">
                  <div>
                    <h4 className="text-xl font-semibold leading-none text-default-600">
                      {`${data.detail.title} (${data.detail.duration})`}
                    </h4>
                    <h5 className="text-small tracking-tight text-default-400">
                      {data.detail.description}
                    </h5>
                  </div>
                </div>
              </div>
              {isManager && (
                <Button
                  onPress={onOpen}
                  color="primary"
                  endContent={<IoMdAdd />}
                >
                  Add Lesson
                </Button>
              )}
              {isIntern && (
                <Button
                  className={
                    isJoined
                      ? "bg-transparent text-foreground border-default-200"
                      : ""
                  }
                  color="primary"
                  radius="full"
                  size="sm"
                  variant={isJoined ? "bordered" : "solid"}
                  onPress={() => handleOnClickSetIsJoined()}
                  isDisabled={!isJoined}
                >
                  {isJoined ? "Not Yet" : "Joined"}
                </Button>
              )}
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              {data.lessions.map((item) => (
                <div className="mb-4" key={item.id}>
                  <div className="flex flex-row gap-4 items-center">
                    <p className="font-semibold text-black text-sm">
                      {item.sequence}
                    </p>
                    <p className="font-semibold text-black text-sm">
                      {item.title}
                    </p>
                    <Link
                      href={item.resource}
                      underline="active"
                      showAnchorIcon
                      isExternal
                      color="primary"
                      className="text-sm"
                    >
                      {item.description}
                    </Link>
                    <Link
                      href={item.url}
                      underline="active"
                      showAnchorIcon
                      isExternal
                      className="text-green-400 text-sm"
                    >
                      Reference
                    </Link>
                    {isManager && (
                      <div>
                        <Button
                          isIconOnly
                          className="bg-transparent"
                          onClick={() => onEditedSLesson(item)}
                        >
                          <MdOutlineEdit />
                        </Button>

                        <Button
                          isIconOnly
                          className="bg-transparent"
                          onClick={() => onDeleteSLesson(item)}
                        >
                          <IoIosRemoveCircleOutline />
                        </Button>
                      </div>
                    )}
                  </div>
                  <Divider />
                </div>
              ))}
            </CardBody>
            <CardFooter className="gap-3"></CardFooter>
          </Card>
          <div className="border border-divider" />
          <Card className="p-4" shadow="none" radius="none">
            <CardBody>
              <div className="flex flex-col gap-3" key={data.detail.title}>
                <div className="flex flex-row gap-8">
                  <p className="text-sm flex flex-row items-center gap-2 font-semibold">
                    <FaRegAddressCard /> Name:
                  </p>
                  <p>{data.detail.title}</p>
                </div>

                <div className="flex flex-row gap-8">
                  <p className="text-sm flex flex-row items-center gap-2 font-semibold">
                    <MdOutlineDescription /> Description:
                  </p>
                  <p>{data.detail.description}</p>
                </div>

                <div className="flex flex-row gap-8 items-start">
                  <p className="text-sm font-semibold flex flex-row items-center gap-2">
                    <FaUser /> Member:
                  </p>
                  <div className="w-full flex flex-row flex-wrap gap-2">
                    {data.detail.users.map((item) => (
                      <Chip
                        variant="flat"
                        avatar={
                          <Avatar
                            name={item.name}
                            size="sm"
                            getInitials={(name) => name.charAt(0)}
                          />
                        }
                        key={item.name}
                      >
                        {item.name}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <AddLessonModal
            isOpen={isOpen || selectedLesson}
            selectedLesson={selectedLesson}
            onOpenChange={onOpenChange}
            trainingProgramId={data.detail.id}
            resetField={resetFieldModal}
            currTP={data.detail.id}
          />
        </>
      ) : (
        <>Loading....</>
      )}
    </div>
  );
}
