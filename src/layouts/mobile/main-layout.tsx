import React, { ReactElement, TouchEventHandler } from "react";
import { useStore } from "../../config/stores";

type MenuType = {
    children: ReactElement;
    trigger: string;
};

export const Menu = ({ children, trigger }: MenuType) => {
    return (
        <aside className={`w-full h-screen overflow-x-hidden bg-dark-3 ${trigger === "channel" ? "block" : "hidden"}`}>
            <div className="relative h-screen w-full">
                <menu className="py-3 flex items-center absolute top-0 left-0 flex-col gap-2 bg-dark-3 w-20 h-[calc(100vh-72px)]">
                    <li className="w-full h-fit flex justify-center">
                        <button className="w-[60px] aspect-square rounded-2xl bg-blue-primary flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="42"
                                height="42"
                                viewBox="0 0 24 24"
                                fill="white"
                                stroke="none"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="lucide lucide-message-circle">
                                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                            </svg>
                        </button>
                    </li>
                    <hr className="border-t-dark-primary border-t-2 w-3/5" />
                    <li className="w-full h-fit flex justify-center">
                        <button className="w-[60px] aspect-square rounded-full bg-dark-primary"></button>
                    </li>
                </menu>
                <section className="w-[calc(100%-80px)] absolute left-20 top-[10px] h-[calc(100vh-82px)] bg-dark-2 rounded-tl-[2rem]">
                    {children}
                </section>
                <nav className="flex absolute bottom-0 left-0 w-full h-[72px] bg-dark-primary"></nav>
            </div>
        </aside>
    );
};

export const ChatSelector = () => {
    return (
        <div className="w-full py-2 pt-3 px-5 h-[calc(100vh-82px)]">
            <search>
                <h1 className="text-white font-bold">Messages</h1>
            </search>
        </div>
    );
};
type MainLayout = {
    children: ReactElement;
    channelType?: string | null;
    route?: string | null;
};
export default function MainLayout({ children, channelType, route }: MainLayout) {
    const { selectedView, setSelectedView } = useStore();

    React.useEffect(() => {
        console.log(selectedView);
    }, [selectedView]);
    React.useEffect(() => {
        setSelectedView("channel");
    }, [setSelectedView]);

    const transitions: Record<string, Record<string, string>> = {
        chat: { left: "detail", right: "channel" },
        channel: { left: "chat" },
        detail: { right: "chat" },
    };

    const select = (direction: string) => {
        if (transitions[selectedView] && transitions[selectedView][direction]) {
            setSelectedView(transitions[selectedView][direction]);
        }
    };

    const [startX, setStartX] = React.useState<number>(0);
    const [isSwiped, setIsSwiped] = React.useState<boolean>(false);

    const threshold = 200;

    const handleStart = (clientX: number) => {
        setStartX(clientX);
        setIsSwiped(false);
    };

    const handleMove = (clientX: number) => {
        if (isSwiped) return;

        const difference = clientX - startX;

        if (Math.abs(difference) > threshold) {
            select(difference > 0 ? "right" : "left");
            setIsSwiped(true);
        }
    };

    const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => handleStart(event.touches[0].clientX);
    const handleTouchMove: TouchEventHandler<HTMLDivElement> = (event) => handleMove(event.touches[0].clientX);
    const handleTouchEnd = () => setIsSwiped(false);

    return (
        <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="w-screen h-screen">
            <nav className=""></nav> <Menu trigger={selectedView}>{channelType === "private" ? <ChatSelector /> : <>cock {route}</>}</Menu>
            <section
                className={`bg-dark-primary w-full h-svh overflow-y-auto overflow-x-hidden p-6 ${
                    selectedView === "chat" ? "block" : "hidden"
                }`}>
                {children}
            </section>
        </div>
    );
}
