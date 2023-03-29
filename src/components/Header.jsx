import { useState } from 'react';

function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <div className="flex justify-between sm:px-3 py-1.5 sticky z-20 w-full shadow-lg bg-[#0a192f]">
            <div className="self-center font-bold text-gray-800 text-2xl sm:text-3xl py-3 flex">
                <img src="/dish.png" alt="logo" className="w-10" />
                <p className="self-center text-white pl-2">Cook book</p>
            </div>

            <div className="flex items-center justify-between pr-3 lg:pr-0">
                <nav>
                    <section className="MOBILE-MENU flex lg:hidden bg-[#0a192f]">
                        <div
                            className="HAMBURGER-ICON space-y-2"
                            onClick={() => setIsNavOpen((prev) => !prev)}
                        >
                            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
                            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
                            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
                        </div>

                        <div
                            className={
                                isNavOpen ? 'showMenuNav' : 'hideMenuNav'
                            }
                        >
                            {' '}
                            <div
                                className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                                onClick={() => setIsNavOpen(false)}
                            >
                                <svg
                                    className="h-8 w-8 text-gray-600"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </div>
                            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px] font-medium text-white">
                                <li className="border-b border-gray-400 my-8">
                                    <a
                                        onClick={() => setIsNavOpen(false)}
                                        href="/"
                                        duration={500}
                                    >
                                        Home
                                    </a>
                                </li>
                                <li className="border-b border-gray-400 my-8">
                                    <a
                                        onClick={() => setIsNavOpen(false)}
                                        href="/about"
                                        duration={500}
                                    >
                                        About
                                    </a>
                                </li>

                                <li className="border-b border-gray-400 my-8">
                                    <a
                                        onClick={() => setIsNavOpen(false)}
                                        href="/contact"
                                        duration={500}
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <ul className="DESKTOP-MENU hidden space-x-8 lg:flex items-center font-medium text-white">
                        <li>
                            <p to="home" duration={500}>
                                <a
                                    className="group transition duration-300"
                                    href="/"
                                >
                                    Home
                                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-cyan-500"></span>
                                </a>
                            </p>
                        </li>
                        <li>
                            <p to="about" duration={500}>
                                <a
                                    className="group transition duration-300"
                                    href="/about"
                                >
                                    About
                                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-cyan-500"></span>
                                </a>
                            </p>
                        </li>

                        <li>
                            <p to="contact" duration={500}>
                                <a
                                    className="group transition duration-300"
                                    href="/contact"
                                >
                                    Contact
                                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-cyan-500"></span>
                                </a>
                            </p>
                        </li>
                    </ul>
                </nav>
                <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: #0a192f;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
            </div>
        </div>
    );
}

export default Header;
