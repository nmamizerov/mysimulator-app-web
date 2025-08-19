import { ColoredButton } from "@/shared/lib/simulator-complete";

export const WelcomePage = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center gap-5 bg-blue-900 px-5 text-white">
      <div className="absolute top-5 left-5 text-xl text-white/80">
        MySimulator
      </div>
      <h1 className="text-center text-2xl font-bold md:max-w-[50%] md:text-4xl">
        Создайте свой собственный интерактивный симулятор
      </h1>
      <ColoredButton
        customization={{
          buttonBackgroundColor: "#10B1FC",
          buttonTextColor: "#fff",
        }}
        isLoading={false}
        onClick={() => (window.location.href = "https://mysimulator.ru")}
        content={"Создать симулятор"}
      />
    </div>
  );
};
