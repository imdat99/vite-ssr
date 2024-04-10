import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <section className="flex items-center h-screen p-16 app-nes">
            <div className="container flex flex-col items-center ">
                <div className="flex flex-col gap-6 p-3">
                    <div className="nes-container is-dark max-w-xl with-title">
                        <div className="title">
                            <span>App.Error</span>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <h2 className="font-extrabold text-9xl text-red-600">
                                <span className="sr-only">Error</span>404
                            </h2>
                            <p className="text-2xl md:text-2xl dark:text-gray-300">
                                Sorry, I couldn't find this page.
                            </p>
                            <Link to="/" className="nes-btn" replace={true}>
                                Back to home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Error
