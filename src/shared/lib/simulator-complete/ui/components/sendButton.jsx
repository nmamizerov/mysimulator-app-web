import { Spinner } from "@/shared/ui/spinner";
import { IoMdSend } from "react-icons/io";

export const SendButton = ({ onClick, customization, loading }) => {
  return loading ? (
    <div className="mt-1 mr-1">
      <Spinner color={customization.color} />
    </div>
  ) : (
    <IoMdSend
      className="cursor-pointer"
      onClick={onClick}
      style={{ color: customization.color }}
      fontSize={32}
    />
  );
};
