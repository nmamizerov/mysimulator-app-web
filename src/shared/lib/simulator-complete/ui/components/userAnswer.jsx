export const UserAnswer = ({ text, customization }) => {
  return (
    <div
      style={{
        backgroundColor: customization.backgroundColor,
        color: customization.textColor,
      }}
      className="message-shadow ml-auto rounded-lg rounded-br-sm bg-blue-100 p-3 break-words lg:max-w-[60%]"
    >
      <div className="text-lg" dangerouslySetInnerHTML={{ __html: text }}></div>
    </div>
  );
};
