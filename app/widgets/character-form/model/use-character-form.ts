import { useState } from "react";
import {
  type CreateCharacterRequest,
  useCreateCharacterMutation,
} from "@/entities/session";

export const useCharacterForm = () => {
  const [data, setData] = useState<CreateCharacterRequest>({
    first_name: "",
    last_name: "",
    sex: "male",
    avatar: "",
  });
  const [createCharacter, { isLoading }] = useCreateCharacterMutation();

  const updateField = <K extends keyof CreateCharacterRequest>(
    field: K,
    value: CreateCharacterRequest[K]
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (onSuccess?: () => void) => {
    await createCharacter(data);
    if (onSuccess) {
      onSuccess();
    }
  };

  const isValid =
    data.first_name.trim() !== "" &&
    data.last_name.trim() !== "" &&
    data.avatar !== "";

  return { data, updateField, handleSubmit, isLoading, isValid };
};
